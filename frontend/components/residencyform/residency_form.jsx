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
    this.handleAllSubmit = this.handleAllSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.parseThroughCSV = this.parseThroughCSV.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    this.props.requestAllResidencies();
    if(!this.props.currentUser){
      this.props.router.push("/login");
    }
    window.residencyQueue = this.residencyQueue;
  }

  handleAllSubmit(){
    let missingAddress = [];
    let $dfds = [];

    this.residencyQueue.forEach( (residency,i) => {
      if ( this._hasAddress(residency) ) {
        let success = ({results}) => {
          residency.latitude = results[0].geometry.location.lat;
          residency.longitude = results[0].geometry.location.lng;
        };
        let error = () => {missingAddress.push(residency.name)};

        $dfds.push(getLocation(this._addressQuery(residency), success, error));
      } else {
        missingAddress.push(residency.name);
      }
    });

    $.when(...$dfds).done(() => {this.props.createResidency({residency: this.residencyQueue}, this.props.currentUser.session_token)})
      .fail(this.setState({status: `${missingAddress.join(", ")} are missing or have invalid addresses`}));
  }

  handleUpload(){
    if (window.FileReader) {
      let reader = new FileReader();
      reader.readAsText(this.file.files[0]);
      reader.onload = (e) => {this.parseThroughCSV(e.target.result)};
      reader.onerror = (e) => {alert("Can't read file.")};
    }else{
      alert("FileReader is not supported on this browser. Please put in data manually. soz =(");
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
        residencyArr.push(residency);
      }
      this.residencyQueue = residencyArr;
      this.handleAllSubmit();
    });
  }

  update(field){
    return e => {
      let value = e.currentTarget.value;
      this.setState((prevState) => merge({}, prevState, {currentResidency: {[field]: value}}));
    };
  }

  render() {
    return (
      <div className="residency-form-container">
        {this._renderErrors()}
        {this.state.status}

        <input type="file" id="file" ref={(file)=>{ this.file = file }} accept=".csv" onChange={this.handleUpload}></input>
      </div>
    );
  }

  _addressQuery(residency = this.state.currentResidency){
    return `${residency.street}+${residency.city}+${residency.state}`.replace(/\s/g, "+");
  }

  _addressToObject(address){
    let vals = address.split(", ");
    if (vals.length < 3 || vals.length > 4){
      console.log("Invalid address");
    } else{
      let zip = vals[2].split(" ");
      let zipObject = zip.length > 1 ? {zip_code: zip[1]} : {};
      let addressObject = {street: vals[0],
        city: vals[1],
        state: zip[0]};
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

  _hasAddress(residency = this.state.currentResidency){
    return (!!residency.street && !!residency.city && !!residency.state);
  }

  _renderErrors(){
    if (this.props.residencies.length === 0) {
      return (<ul></ul>);
    } else{
      return (
        <ul>
          {this.props.residencies[this.props.residencies.length-1].errors.map((error,i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      );
    }
}

export default ResidencyForm;
