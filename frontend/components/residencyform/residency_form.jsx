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
    this._hasAddress = this._hasAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.getLocationSucces = this.getLocationSucces.bind(this);
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

    if (this._hasAddress() && nextProps.residencies[nextProps.residencies.length-1].errors.length === 0) {
      if (this.residencyQueue.length === 0) {
        this.props.router.push("/");
      } else {
        this.setState({currentResidency: this.residencyQueue.shift(), status: ""});
      }
    }
  }

  getLocationSucces({results}){
    let residency = this.state.currentResidency;
    residency.latitude = results[0].geometry.location.lat;
    residency.longitude = results[0].geometry.location.lng;
    this.state.formType === "Update" ? this.props.updateResidency({residency}) : this.props.createResidency({residency});
  }

  handleSubmit(e){
    e.preventDefault();
    if (this._hasAddress()) {
      getLocation(this._addressQuery(), this.getLocationSucces);
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

        <form onSubmit={this.handleSubmit} className="residency-form">
          Name (required)
          <input type="text" value={this.state.currentResidency.name} onChange={this.update("name")} className="form-input" />
          Description
          <input type="text" value={this.state.currentResidency.description} onChange={this.update("description")} className="form-input" />
          Street (required)
          <input type="text" value={this.state.currentResidency.street} onChange={this.update("street")} className="form-input" />
          City (required)
          <input type="text" value={this.state.currentResidency.city} onChange={this.update("city")} className="form-input" />
          State (required)
          <input type="text" value={this.state.currentResidency.state} onChange={this.update("state")} className="form-input" />
          Zip code
          <input type="text" value={this.state.currentResidency.zip_code} onChange={this.update("zip_code")} className="form-input" />
          PD
          <input type="text" value={this.state.currentResidency.PD} onChange={this.update("PD")} className="form-input" />
          Website (required)
          <input type="text" value={this.state.currentResidency.website_url} onChange={this.update("website_url")} className="form-input" />
          Positions ranked
          <input type="text" value={this.state.currentResidency.positions_ranked} onChange={this.update("positions_ranked")} className="form-input" />
          Merger status
          <input type="text" value={this.state.currentResidency.merger_status} onChange={this.update("merger_status")} className="form-input" />
          Curriculum
          <input type="text" value={this.state.currentResidency.curriculum} onChange={this.update("curriculum")} className="form-input" />
          Max students
          <input type="text" value={this.state.currentResidency.max_students} onChange={this.update("max_students")} className="form-input" />
          Number of students
          <input type="text" value={this.state.currentResidency.num_students} onChange={this.update("num_students")} className="form-input" />
          Crowded Period
          <input type="text" value={this.state.currentResidency.crowded_period} onChange={this.update("crowded_period")} className="form-input" />
          Comlex cutoff
          <input type="text" value={this.state.currentResidency.comlex_cutoff} onChange={this.update("comlex_cutoff")} className="form-input" />
          2 or 4 week cycle
          <input type="text" value={this.state.currentResidency.week_cycle} onChange={this.update("week_cycle")} className="form-input" />
          Rotation schedule
          <input type="text" value={this.state.currentResidency.schedule_restrictions} onChange={this.update("schedule_restrictions")} className="form-input" />
          How to book rotation
          <input type="text" value={this.state.currentResidency.booking_medium} onChange={this.update("booking_medium")} className="form-input" />
          Rotation booking date
          <input type="text" value={this.state.currentResidency.booking_date} onChange={this.update("booking_date")} className="form-input" />
          Applicants Interviewed
          <input type="text" value={this.state.currentResidency.num_interviewed} onChange={this.update("num_interviewed")} className="form-input" />
          Interview date
          <input type="text" value={this.state.currentResidency.interview_date} onChange={this.update("interview_date")} className="form-input" />
          interview selection
          <input type="text" value={this.state.currentResidency.interview_selection} onChange={this.update("interview_selection")} className="form-input" />
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
          Residents
          <input type="text" value={this.state.currentResidency.residents} onChange={this.update("residents")} className="form-input" />

          <input className="form-button" type="submit" value={this.state.formType}/>
        </form>
      </div>
    );
  }

  _addressQuery(){
    return `${this.state.currentResidency.street}+${this.state.currentResidency.city}+${this.state.currentResidency.state}`.replace(/\s/g, "+");
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
    return{
      name: "",
      description: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      PD: "",
      website_url: "",
      positions_ranked: "",
      merger_status: "",
      curriculum: "",
      max_students: "",
      num_students: "",
      crowded_period: "",
      comlex_cutoff: "",
      week_cycle: "",
      schedule_restrictions: "",
      booking_medium: "",
      booking_date: "",
      num_interviewed: "",
      interview_date: "",
      interview_selection: "",
      coordinator_name: "",
      coordinator_email: "",
      coordinator_number: "",
      med_student_coordinator_name: "",
      med_student_coordinator_email: "",
      med_student_coordinator_number: "",
      residents: ""
    };
  }

  _columnNameToKey(){
    return ({
      "City": "city",
      "Program": "name",
      "Address": "address",
      "State": "state",
      "PD": "PD",
      "Website": "website_url",
      "Positions Ranked": "positions_ranked",
      "ACGME Merger Status": "merger_status",
      "Curriculum": "curriculum",
      "Max Students": "max_students",
      "Number of Students": "num_students",
      "Crowded Rotation Period": "crowded_period",
      "Comlex Cutoff": "comlex_cutoff",
      "Week Cycle": "week_cycle",
      "Rotation Schedule": "schedule_restrictions",
      "How to Book Rotations": "booking_medium",
      "Rotation Booking Date": "booking_date",
      "Applicants Interviewed": "num_interviewed",
      "Interview Date": "interview_date",
      "Interview Selection": "interview_selection",
      "Coordinator Name": "coordinator_name",
      "Coordinator Email": "coordinator_email",
      "Coordinator Number": "coordinator_number",
      "Med Student Coordinator Name": "med_student_coordinator_name",
      "Med Student Coordinator Email": "med_student_coordinator_email",
      "Med Student Coordinator Number": "med_student_coordinator_number",
      "Residents": "residents",
      "Description": "description"
    });
  }

  _hasAddress(){
    return (!!this.state.currentResidency.street && !!this.state.currentResidency.city && !!this.state.currentResidency.state);
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
