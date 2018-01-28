import React from 'react';
import { Link, hashHistory } from 'react-router';
import { getLocation } from '../../util/map_api_util';
import { isEqual, merge } from 'lodash';
let parse = require('csv-parse');

class ResidencyForm extends React.Component {
  constructor(props) {
    super(props);

    this._defaultResidency = this._defaultResidency.bind(this);
    this.state = {
      currentResidency: this._defaultResidency(),
      status: "",
      formType: "Create"
    };
    this.existingAddresses = {};
    this.residencyQueue = [];

    this._addressQuery = this._addressQuery.bind(this);
    this._columnNameToKey = this._columnNameToKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.getLocationSuccess = this.getLocationSuccess.bind(this);
    this.parseThroughCSV = this.parseThroughCSV.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    this.props.requestAllResidencies();
  }

  componentWillReceiveProps(nextProps){
    if (isEqual({}, this.existingAddresses) && nextProps.residencies) {
      for (var i = 0; i < nextProps.residencies.length; i++) {
        this.existingAddresses[nextProps.residencies[i].address.street] = true;
      }
    }

    if (this.state.currentResidency.address && nextProps.residencies[nextProps.residencies.length-1].errors.length === 0) {
      if (this.residencyQueue.length === 0) {
        this.props.router.push("/");
      } else {
        this.setState({currentResidency: this.residencyQueue.shift(), status: ""});
      }
    }
  }

  getLocationSuccess({results}){
    let residency = this.state.currentResidency;
    residency.latitude = results[0].geometry.location.lat;
    residency.longitude = results[0].geometry.location.lng;
    this.state.formType === "Update" ? this.props.updateResidency({residency}) : this.props.createResidency({residency});
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.state.currentResidency.address) {
      getLocation(this._addressQuery(), this.getLocationSuccess);
    } else {
      this.setState({status: "Missing address component"});
    }
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
  }

  parseThroughCSV(data){
    parse(data, {delimiter: ","}, (error, result) => {
      let residencyArr = [];

      let keyMap = this._columnNameToKey();
      let columnArray = result[0].map((value) => keyMap[value]);

      for (var i = 1; i < result.length; i++) {
        let residency = {};
        for (var j = 0; j < columnArray.length; j++) {
          switch (columnArray[j]) {
            case "address":
              residency = merge(residency, this._addressToObject(result[i][j]));
              break;
            case "city":
              break;
            case "state":
              break;
            default:
              residency[columnArray[j]] = result[i][j];
              break;
          }
        }
        if (this.existingAddresses[residency.street]) {
          continue;
        } else{
          residencyArr.push(residency);
        }
      }
      this.residencyQueue = residencyArr;
      console.log(this.residencyQueue);
      console.log(parse);
      this.setState({currentResidency: this.residencyQueue.shift(), status: ""});
    });
  }

  update(field){
    return e => {
      let value = e.currentTarget.value
      this.setState((prevState) => merge({}, prevState, {currentResidency: {[field]: value}}));
    };
  }

  render() {
    return (
      <div className="residency-form-container">
        {this._renderErrors()}
        {this.state.status}

        <input type="file" id="file" ref={(file)=>{ this.file = file }} accept=".csv" onChange={this.handleUpload}></input>

        <form onSubmit={this.handleSubmit} className="residency-form flexbox flex-column">
          Discipline
          <input type="text" value={this.state.currentResidency.discipline} onChange={this.update("discipline")} className="form-input" />
          Name (required)
          <input type="text" value={this.state.currentResidency.name} onChange={this.update("name")} className="form-input" />
          Description
          <input type="text" value={this.state.currentResidency.description} onChange={this.update("description")} className="form-input" />
          Address (required)
          <input type="text" value={this.state.currentResidency.address} onChange={this.update("address")} className="form-input" />
          State (required)
          <input type="text" value={this.state.currentResidency.state} onChange={this.update("state")} className="form-input" />
          Website (required)
          <input type="text" value={this.state.currentResidency.website_url} onChange={this.update("website_url")} className="form-input" />
          Number of Residents
          <input type="text" value={this.state.currentResidency.num_residents} onChange={this.update("num_residents")} className="form-input" />
          Number of Rotating Students
          <input type="text" value={this.state.currentResidency.num_rotating_students} onChange={this.update("num_rotating_students")} className="form-input" />
          Merger status
          <input type="text" value={this.state.currentResidency.merger_status} onChange={this.update("merger_status")} className="form-input" />
          Application Instructions
          <input type="text" value={this.state.currentResidency.application_instructions} onChange={this.update("application_instructions")} className="form-input" />
          COMLEX requirement
          <input type="text" value={this.state.currentResidency.comlex_requirement} onChange={this.update("comlex_requirement")} className="form-input" />
          USMLE requirement
          <input type="text" value={this.state.currentResidency.usmle_requirement} onChange={this.update("usmle_requirement")} className="form-input" />
          Rotation requirement
          <input type="text" value={this.state.currentResidency.rotation_required} onChange={this.update("rotation_required")} className="form-input" />
          Interview date
          <input type="text" value={this.state.currentResidency.interview_date} onChange={this.update("interview_date")} className="form-input" />
          Interview Count
          <input type="text" value={this.state.currentResidency.interview_count} onChange={this.update("interview_count")} className="form-input" />
          Program Director
          <input type="text" value={this.state.currentResidency.program_director} onChange={this.update("program_director")} className="form-input" />
          Coordinator name
          <input type="text" value={this.state.currentResidency.coordinator_name} onChange={this.update("coordinator_name")} className="form-input" />
          Coordinator email
          <input type="text" value={this.state.currentResidency.coordinator_email} onChange={this.update("coordinator_email")} className="form-input" />
          Coordinator number
          <input type="text" value={this.state.currentResidency.coordinator_number} onChange={this.update("coordinator_number")} className="form-input" />
          Med Coordinator name
          <input type="text" value={this.state.currentResidency.med_student_coordinator_name} onChange={this.update("med_student_coordinator_name")} className="form-input" />
          Med Coordinator email
          <input type="text" value={this.state.currentResidency.med_student_coordinator_email} onChange={this.update("med_student_coordinator_email")} className="form-input" />
          Med Coordinator number
          <input type="text" value={this.state.currentResidency.med_student_coordinator_number} onChange={this.update("med_student_coordinator_number")} className="form-input" />

          <input className="form-button" type="submit" value={this.state.formType}/>
        </form>
      </div>
    );
  }

  _addressQuery(){
    return `${this.state.currentResidency.address}`.replace(/\s/g, "+");
  }

  _defaultResidency(){
    return{
      discipline: "",
      name: "",
      description: "",
      address: "",
      state: "",
      website_url: "",
      num_residents: "",
      num_rotating_students: "",
      merger_status: "",
      application_instructions: "",
      comlex_requirement: "",
      usmle_requirement: "",
      rotation_required: "",
      interview_date: "",
      interview_selection: "",
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
    return ({
      "Discipline": "discipline",
      "Program": "name",
      "Description": "description",
      "Address": "address",
      "State": "state",
      "Website": "website_url",
      "ACGME Merger Status": "merger_status",
      "Number of Residents": "num_residents",
      "Number of Rotating Students": "num_rotating_students",
      "Application Instructions": "application_instructions",
      "Rotation Required": "rotation_required",
      "Interview Date": "interview_date",
      "Interview Count": "interview_count",
      "Program Director": "program_director",
      "Coordinator Name": "coordinator_name",
      "Coordinator Email": "coordinator_email",
      "Coordinator Number": "coordinator_number",
      "Med Student Coordinator Name": "med_student_coordinator_name",
      "Med Student Coordinator Email": "med_student_coordinator_email",
      "Med Student Coordinator Number": "med_student_coordinator_number"
    });
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
}

export default ResidencyForm;
