import React from 'react';
import { Link, hashHistory } from 'react-router-3';
import MarkerManager from '../../util/marker_util';
import { mapsInfoBox } from './info_box';
import { _defaultMapOptions } from './map_styling';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.recenterMap = this.recenterMap.bind(this);
    this.updateContentWindow = this.updateContentWindow.bind(this);
  }

  componentDidMount(){
    this.map = new google.maps.Map(document.getElementById('map'), _defaultMapOptions());
    this.infoWindow = new google.maps.InfoWindow({
      content: this.setContentWindow(''),
      pixelOffset: new google.maps.Size(0, -50)});
    this.MarkerManager = new MarkerManager(this.map, this.props.handleClick);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.data) {
      this.updateContentWindow(nextProps.data);
      this.recenterMap(nextProps.data.latitude, nextProps.data.longitude, 15);
      this.infoWindow.open(this.map);
    } else {
      this.infoWindow.close();
      this.recenterMap(37.09024, -95.712891, 4);
    }
    this.MarkerManager.updateMarkers(nextProps.residencies);
  }

  recenterMap(lat,lng, zoom){
    this.map.panTo(new google.maps.LatLng(lat, lng));
    this.map.setZoom(zoom);
  }

  setContentWindow(data){
    let residency = data;

    if (residency) {
      if (data.coordinator.email === "") { data.coordinator.email = "N/A"; }
      if (data.coordinator.name === "") { data.coordinator.name = "N/A"; }
      if (data.coordinator.phone_number === "") { data.coordinator.phone_number = "N/A"; }

      if (data.med_student_coordinator.email === "") { data.med_student_coordinator.email = "N/A"; }
      if (data.med_student_coordinator.name === "") { data.med_student_coordinator.name = "N/A"; }
      if (data.med_student_coordinator.phone_number === "") { data.med_student_coordinator.phone_number = "N/A"; }


      return mapsInfoBox(residency);
    } else {
      return `<div></div>`;
    }
  }

  updateContentWindow(data){
    let boundHandleClick = this.props.handleClick;
    this.infoWindow.setContent(this.setContentWindow(data));
    this.infoWindow.setPosition(new google.maps.LatLng(data.latitude, data.longitude));
    google.maps.event.addListener(this.infoWindow, 'closeclick', function() { boundHandleClick(data, 'true'); });
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default GoogleMap;
