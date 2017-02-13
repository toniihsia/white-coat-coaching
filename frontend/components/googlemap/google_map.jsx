import React from 'react';
import { Link, hashHistory } from 'react-router';
import MarkerManager from '../../util/marker_util';
import { mapsInfoBox } from './info_box';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.recenterMap = this.recenterMap.bind(this);
    this._defaultMapOptions = this._defaultMapOptions.bind(this);
    this.updateContentWindow = this.updateContentWindow.bind(this);
  }

  componentDidMount(){
    this.map = new google.maps.Map(document.getElementById('map'), this._defaultMapOptions());
    this.infoWindow = new google.maps.InfoWindow({
      content: this.setContentWindow(''),
      pixelOffset: new google.maps.Size(0, -50)});
    this.MarkerManager = new MarkerManager(this.map, this.props.handleClick);
  }

  componentWillReceiveProps(nextProps){
    console.log('why why why');
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

  _defaultMapOptions(){
    return {
      zoom: 4,
      center: {lat: 37.09024, lng: -95.712891},
      styles: [
        {
          "featureType":"all",
          "elementType":"geometry.fill",
          "stylers":[{"weight":"2.00"}]
        },
        {
          "featureType":"all",
          "elementType":"geometry.stroke",
          "stylers":[{"color":"#9c9c9c"}]
        },
        {
          "featureType":"all",
          "elementType":"labels.text",
          "stylers":[{"visibility":"on"}]
        },
        {
          "featureType":"landscape",
          "elementType":"all",
          "stylers":[{"color":"#f2f2f2"}]
        },
        {
          "featureType":"landscape",
          "elementType":"geometry.fill",
          "stylers":[{"color":"#ffffff"}]
        },
        {
          "featureType":"landscape.man_made",
          "elementType":"geometry.fill",
          "stylers":[{"color":"#ffffff"}]
        },
        {
          "featureType":"poi",
          "elementType":"all",
          "stylers":[{"visibility":"off"}]
        },
        {
          "featureType":"road",
          "elementType":"all",
          "stylers":[{"saturation":-100}, {"lightness":45}]
        },
        {
          "featureType":"road",
          "elementType":"geometry.fill",
          "stylers":[{"color":"#eeeeee"}]
        },
        {
          "featureType":"road",
          "elementType":"labels.text.fill",
          "stylers":[{"color":"#7b7b7b"}]
        },
        {
          "featureType":"road",
          "elementType":"labels.text.stroke",
          "stylers":[{"color":"#ffffff"}]
        },
        {
          "featureType":"road.highway",
          "elementType":"all",
          "stylers":[{"visibility":"simplified"}]
        },
        {
          "featureType":"road.arterial",
          "elementType":"labels.icon",
          "stylers":[{"visibility":"off"}]
        },
        {
          "featureType":"transit",
          "elementType":"all",
          "stylers":[{"visibility":"off"}]
        },
        {
          "featureType":"water",
          "elementType":"all",
          "stylers":[{"color":"#46bcec"},{"visibility":"on"}]
        },
        {
          "featureType":"water",
          "elementType":"geometry.fill",
          "stylers":[{"color":"#c8d7d4"}]
        },
        {
          "featureType":"water",
          "elementType":"labels.text.fill",
          "stylers":[{"color":"#070707"}]
        },
        {
          "featureType":"water",
          "elementType":"labels.text.stroke",
          "stylers":[{"color":"#ffffff"}]
        }
      ]
    };
  }

  recenterMap(lat,lng, zoom){
    this.map.panTo(new google.maps.LatLng(lat, lng));
    this.map.setZoom(zoom);
  }

  setContentWindow(data){
    // return `<div id="info-window">${string}</div>`;

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
    var boundHandleClick = this.props.handleClick;
    this.infoWindow.setContent(this.setContentWindow(data));
    this.infoWindow.setPosition(new google.maps.LatLng(data.latitude, data.longitude));
    google.maps.event.addListener(this.infoWindow, 'closeclick', function() { boundHandleClick(data); });
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default GoogleMap;
