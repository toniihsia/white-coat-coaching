import React from 'react';
import { Link, hashHistory } from 'react-router-3';
import { getLocation } from '../../util/map_api_util';
import { isEqual, merge } from 'lodash';
import parse from '../../util/csv-parse';

class ResidencyForm extends React.Component {
    constructor(props) {
        super(props);

        this._defaultResidency = this._defaultResidency.bind(this);
        this.state = {
            currentResidency: this._defaultResidency(),
            status: "",
            formType: "Create"
        };
        this.existingResidencies = {};
        this.residencyQueue = [];

        this._addressQuery = this._addressQuery.bind(this);
        this._columnNameToKey = this._columnNameToKey.bind(this);
        this.handleSingleSubmit = this.handleSingleSubmit.bind(this);
        this.handleAllSubmit = this.handleAllSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.getLocationSuccess = this.getLocationSuccess.bind(this);
        this.parseThroughCSV = this.parseThroughCSV.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        this.props.requestAllResidencies();
    }

    componentWillReceiveProps(nextProps){
        // Map ids of existingResidencies so that if we mass create, we can delete old records on success
        if (isEqual({}, this.existingResidencies)) {
            this.existingResidencies = nextProps.residencies.map((residency)=>(residency.id));
        }

        // When uploading and no errors, delete old records if mass created, then redirect to root
        // if the queue is empty. Otherwise, load up the next residency
        if (this.state.currentResidency.program_director && nextProps.residencies[nextProps.residencies.length-1].errors.length === 0) {
            if (this.residencyQueue.length === 0) {
                if (this.state.status === "Submitting All Residencies") {
                    this.props.deleteResidencies({ids: this.existingResidencies});
                }
                this.props.router.push("/");
            } else {
                status = this.state.status === "Submitting All Residencies" ? this.state.status : "";
                this.setState({currentResidency: this.residencyQueue.shift(), status: status});
            }
        }
    }

    componentDidUpdate(){
        if (this.state.status === "Submitting All Residencies"){
            if (this._hasAddress()) {
                getLocation(this._addressQuery(), this.getLocationSuccess);
            } else {
                this.setState({status: "Missing address component"});
            }
        }
    }

    getLocationSuccess({results}){
        let residency = this.state.currentResidency;
        residency.latitude = results[0].geometry.location.lat;
        residency.longitude = results[0].geometry.location.lng;
        this.state.formType === "Update" ? this.props.updateResidency({residency}) : this.props.createResidency({residency});
    }

    handleSingleSubmit(e){
        e.preventDefault();
        if (this._hasAddress()) {
            getLocation(this._addressQuery(), this.getLocationSuccess);
        } else {
            this.setState({status: "Missing address component"});
        }
    }

    handleAllSubmit(e){
        e.preventDefault();
        this.setState({status: "Submitting All Residencies"});
    }

    handleUpload(){
        if (window.FileReader) {
            let reader = new FileReader();
            reader.readAsText(this.file.files[0]);
            reader.onload = (e) => {this.parseThroughCSV(e.target.result)};
            reader.onerror = (e) => {alert("Can't read file.")};
        } else {
            alert("FileReader is not supported on this browser. Please put in data manually. soz =(");
        }
    }

    parseThroughCSV(data){
        parse(data, {delimiter: ","}, (error, result) => {
            let residencyArr = [];

            let keyMap = this._columnNameToKey(),
                columnArray = result[0].map((value) => keyMap[value]);

            for (let i = 1; i < result.length; i++) {
                let residency = {};
                for (let j = 0; j < columnArray.length; j++) {
                    switch (columnArray[j]) {
                        case "address":
                            residency = merge(residency, this._addressToObject(result[i][j]));
                        break;
                        case undefined:
                            continue;
                        default:
                            residency[columnArray[j]] = result[i][j] || "";
                        break;
                    }
                }
                residencyArr.push(residency);
            }
            this.residencyQueue = residencyArr;
            if (this.residencyQueue.length == 0) {
                this.setState({currentResidency: this._defaultResidency(), status: "Records already exist!"});
            } else {
                this.setState({currentResidency: this.residencyQueue.shift(), status: ""});
            }
        });
    }

    update(field){
        return e => {
            let value = e.currentTarget.value
            this.setState((prevState) => merge({}, prevState, {currentResidency: {[field]: value}}));
        };
    }

    render() {
        let residency = this.state.currentResidency;

        return (
            <div className="residency-form-container">

                {this._renderErrors()}
                {this.state.status}
                <input className="residency-form-file-selector" type="file" id="file" ref={(file)=>{ this.file = file }} accept=".csv" onChange={this.handleUpload}></input>

                <form className="residency-form" onSubmit={this.handleSingleSubmit}>

                    <div className="residency-input-container">
                        <label><strong>Name:</strong> <span>(required)</span></label>
                        <input className="residency-input" type="text" value={residency.name} onChange={this.update('name')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Description:</strong></label>
                        <input className="residency-input" type="text" value={residency.description} onChange={this.update('description')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Street:</strong> <span>(required)</span></label>
                        <input className="residency-input" type="text" value={residency.street} onChange={this.update('street')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>City:</strong> <span>(required)</span></label>
                        <input className="residency-input" type="text" value={residency.city} onChange={this.update('city')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>State:</strong> <span>(required)</span></label>
                        <input className="residency-input" type="text" value={residency.state} onChange={this.update('state')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Zip code:</strong> <span>(required)</span></label>
                        <input className="residency-input" type="text" value={residency.zip_code} onChange={this.update('zip_code')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Website:</strong> <span>(required)</span></label>
                        <input className="residency-input" type="text" value={residency.website_url} onChange={this.update('website_url')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong># of residents:</strong></label>
                        <input className="residency-input" type="text" value={residency.num_residents} onChange={this.update('num_residents')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong># of rotating residents:</strong></label>
                        <input className="residency-input" type="text" value={residency.num_rotating_students} onChange={this.update('num_rotating_students')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Merger status:</strong></label>
                        <input className="residency-input" type="text" value={residency.merger_status} onChange={this.update('merger_status')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Application instructions:</strong></label>
                        <input className="residency-input" type="text" value={residency.application_instructions} onChange={this.update('application_instructions')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>COMLEX requirements:</strong></label>
                        <input className="residency-input" type="text" value={residency.comlext_requirement} onChange={this.update('comlext_requirement')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>USMLE requirement:</strong></label>
                        <input className="residency-input" type="text" value={residency.usmle_requirement} onChange={this.update('usmle_requirement')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Required rotation:</strong> <span>(required)</span></label>
                        <input className="residency-input" type="text" value={residency.rotation_required} onChange={this.update('rotation_required')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Interview date:</strong></label>
                        <input className="residency-input" type="text" value={residency.interview_date} onChange={this.update('interview_date')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Interview count:</strong></label>
                        <input className="residency-input" type="text" value={residency.interview_count} onChange={this.update('interview_count')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Program director:</strong></label>
                        <input className="residency-input" type="text" value={residency.program_director} onChange={this.update('program_director')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Coordinator name:</strong></label>
                        <input className="residency-input" type="text" value={residency.coordinator_name} onChange={this.update('coordinator_name')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Coordinator email:</strong></label>
                        <input className="residency-input" type="text" value={residency.coordinator_email} onChange={this.update('coordinator_email')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Coordinator phone:</strong></label>
                        <input className="residency-input" type="text" value={residency.coordinator_number} onChange={this.update('coordinator_number')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Med student coordinator name:</strong></label>
                        <input className="residency-input" type="text" value={residency.med_student_coordinator_name} onChange={this.update('med_student_coordinator_name')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Med student coordinator email:</strong></label>
                        <input className="residency-input" type="text" value={residency.med_student_coordinator_email} onChange={this.update('med_student_coordinator_email')}></input>
                    </div>

                    <div className="residency-input-container">
                        <label><strong>Med student coordinator phone:</strong></label>
                        <input className="residency-input" type="text" value={residency.med_student_coordinator_number} onChange={this.update('med_student_coordinator_number')}></input>
                    </div>

                    <input className="residency-form-submit" type="submit" value={this.state.formType} />

                </form>

                <button onClick={this.handleAllSubmit}>
                    <label>Create all from CSV</label>
                </button>

            </div>
        );
    }

    _addressQuery(){
        return `${this.state.currentResidency.street}+${this.state.currentResidency.city}+${this.state.currentResidency.state}`.replace(/\s/g, "+");
    }

    _addressToObject(address){
        let vals = address.split(", ");
        if (vals.length < 3 || vals.length > 4){
            console.warn("Invalid address");
        } else {
            let zip = vals[2].split(" "),
                zipObject = zip.length > 1 ? {zip_code: zip[1]} : {},
                addressObject = {street: vals[0],
                    city: vals[1],
                    state: zip[0]
                };

            return merge({}, addressObject, zipObject);
        }
    }

    _defaultResidency(){
        return {
            discipline: "",
            name: "",
            description: "",
            street: "",
            city: "",
            state: "",
            zip_code: "",
            latitude: "",
            longitude: "",
            website_url: "",
            merger_status: "",
            num_residents: "",
            num_rotating_students: "",
            rotation_required: "",
            comlex_requirement: "",
            usmle_requirement: "",
            application_instructions: "",
            interview_date: "",
            interview_count: "",
            program_director: "",
            coordinator_name: "",
            coordinator_email: "",
            coordinator_number: "",
            med_student_coordinator_name: "",
            med_student_coordinator_email: "",
            med_student_coordinator_number: ""
        };
    }

    _columnNameToKey(){
        return {
            "Discipline": "discipline",
            "Program Name": "name",
            "About": "description",
            "Street": "street",
            "City": "city",
            "State": "state",
            "Zip Code": "zip_code",
            "Website": "website_url",
            "ACGME Merger Status": "merger_status",
            "Residents/yr": "num_residents",
            "Rotating Students": "num_rotating_students",
            "Rotation Required": "rotation_required",
            "COMLEX Requirement": "comlex_requirement",
            "USMLE Requirement": "usmle_requirement",
            "To Apply": "application_instructions",
            "Previous Interview Date": "interview_date",
            "Number of Students Interviewed": "interview_count",
            "Program Director": "program_director",
            "Program Coordinator Name": "coordinator_name",
            "Program Coordinator Email": "coordinator_email",
            "Program Coordinator Number": "coordinator_number",
            "Student Coordinator Name": "med_student_coordinator_name",
            "Student Coordinator Email": "med_student_coordinator_email",
            "Student Coordinator Number": "med_student_coordinator_number"
        };
    }

    _hasAddress(){
        return (!!this.state.currentResidency.street && !!this.state.currentResidency.city && !!this.state.currentResidency.state);
    }

    _renderErrors(){
        if (this.props.residencies.length === 0) {
            return (<ul></ul>);
        } else {
            return (
                <ul>
                    {this.props.residencies[this.props.residencies.length-1].errors.map((error,i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            );
        }
    }
}

export default ResidencyForm;
