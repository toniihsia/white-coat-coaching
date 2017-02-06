import React from 'react';
import { Link, hashHistory } from 'react-router';
import { getLocation } from '../../util/map_api_util';
import merge from 'lodash/merge';

class ResidencyForm extends React.Component {
  constructor(props) {
    super(props);

    this._defaultResidency = this._defaultResidency.bind(this);
    this.state = {
      residencies: [],
      status: "",
      currentResidency: this._defaultResidency(),
      formType: "Create"
    };
    this.existingAddresses = {};

    this._addressQuery = this._addressQuery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLocationSucces = this.getLocationSucces.bind(this);
    this.getLocationError = this.getLocationError.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    this.props.requestAllResidencies();
  }

  componentDidUpdate(){

  }

  componentWillReceiveProps(nextProps){
    if (nextProps.residency){
      this.setState(currentResidency: nextProps.residency, formType: "Update");
    } else {
      for (var i = 0; i < nextProps.residencies.length; i++) {
        this.existingAddresses[nextProps.residencies[i].address.street] = true;
      }
    }
  }

  create(){
    if (this.state.residencies.length === 0){
      this.setState({status: "No residencies found"});
    } else {
      this.setState({status: `There are ${this.state.residencies.length} entries in queue`})
    }
  }

  getLocationError(error){
    this.setState({status: error});
  }

  getLocationSucces({results}){
    let residency = this.state.currentResidency;
    residency.latitude = results[0].geometry.location.lat;
    residency.longitude = results[0].geometry.location.lng;
    this.state.formType === "update" ? this.props.updateResidency({residency}) : this.props.createResidency({residency});
    if (this.state.residencies.length > 0){
      this.state.residencies.shift();
      this.setState({currentResidency: {}});
    } else{
      this.props.router.push("/");
    }
  }

  handleSubmit(e){
    e.preventDefault();
    getLocation(this._addressQuery(), this.getLocationSucces, this.getLocationError);
  }

  parseThroughCSV(doc){
    let residencyArr = [];

    this.setState({residencies: residencyArr})
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
        {this.state.status}

        <form onSubmit={this.handleSubmit} className="residency-form">
          Name (required)
          <input type="text" value={this.state.currentResidency.name} onChange={this.update("name")} className="form-input" />
          Description (required)
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
      let addressObject = {street: vals[0],
        city: vals[1],
        state: vals[2]};
        let zipObject = vals.length > 3 ? {zip_code: vals[3]} : {};
      }

      return merge({}, addressObject, zipObject);
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
      }
    }
}

export default ResidencyForm;
