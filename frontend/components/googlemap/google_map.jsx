import React from 'react';
import { Link, hashHistory } from 'react-router';
import MarkerManager from '../../util/marker_util';

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


      return `
      <div id="info-window-large">
        <div class="res-header">
          <img class='res-info-photo' src="${residency.image_url}" alt="${residency.name}${residency.id}"}></img>

          <div class="right-content">
            <div class="info-res-title">${residency.name}</div>

            <div class="res-section-header">
              <h3 class="res-header-1">Website</h3>
              <a class="info-res-url" href="${residency.website_url}">${residency.website_url}</a>
            </div>

            <div class="res-section-header">
              <h3 class="res-header-1">Address</h3>
              <div class="res-inner-content">${residency.address.street}</div>
              <div class="res-inner-content">${residency.address.city}, ${residency.address.state} ${residency.address.zip_code}</div>
            </div>
          </div>
        </div>

        <div class="res-details">
          <h3 id="detail-title">Description</h3>
          <div class="res-details">
            <div class="desc">${residency.description}</div>
          </div>
        </div>

        <div class="contact">
          <div class="res-details">
            <h3 id="detail-title">Contact</h3>

            <div class="res-details">
              <div class="left">
                <div class="res-section">
                  <div class="left-label">PD:</div>
                  <div class="right-content">${residency.PD}</div>
                </div>
                <div class="res-section">
                  <h3 class="res-header-1">Coordinator Info</h3>
                  <div class="flex-container">
                    <div class="left-label">Name:</div>
                    <div class="right-content">${residency.coordinator.name}</div>
                  </div>
                  <div class="flex-container">
                    <div class="left-label">Email:</div>
                    <div class="right-content"> ${residency.coordinator.email}</div>
                  </div>
                  <div class="flex-container">
                    <div class="left-label">Phone #: </div>
                    <div class="right-content"> ${residency.coordinator.phone_number}</div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="res-section">
                  <h3 class="res-header-1">Med Student Coordinator Info</h3>
                  <div class="flex-container">
                    <div class="left-label">Name:</div>
                    <div class="right-content"> ${residency.med_student_coordinator.name}</div>
                  </div>
                  <div class="flex-container">
                    <div class="left-label">Email:</div>
                    <div class="right-content"> ${residency.med_student_coordinator.email}</div>
                  </div>
                  <div class="flex-container">
                    <div class="left-label">Phone #: </div>
                    <div class="right-content"> ${residency.med_student_coordinator.phone_number}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="details">
          <div class="res-details">
            <h3 id="detail-title">Details</h3>
            <div class="res-details">
              <div class="left">
                <div class="res-section">
                  <h3 class="res-header-1">Merger Status</h3>
                  <div class="res-inner-content">${residency.merger_status}</div>
                </div>
                <div class="res-section">
                  <h3 class="res-header-1">Curriculum</h3>
                  <div class="res-inner-content"> ${residency.curriculum}</div>
                </div>
                <div class="res-section">
                  <h3 class="res-header-1">Residency Info</h3>
                  <div class="flex-container">
                    <div class="left-label">Max # of Students: </div>
                    <div class="right-content"> ${residency.max_students}</div>
                  </div>
                  <div class="flex-container">
                    <div class="left-label"># of Students: </div>
                    <div class="right-content"> ${residency.num_students}</div>
                  </div>
                </div>
                <div class="res-section">
                  <h3 class="res-header-1">Crowded Period</h3>
                  <div class="flex-container">
                    <div class="left-label">Start Date: </div>
                    <div class="right-content"> ${residency.crowded_period.start_date}</div>
                  </div>
                  <div class="flex-container">
                    <div class="left-label">End Date: </div>
                    <div class="right-content"> ${residency.crowded_period.end_date}</div>
                  </div>
                </div>
              </div>

              <div class="right">
                <div class="res-section">
                  <h3 class="res-header-1">Rotation</h3>
                  <div class="flex-container">
                    <div class="left-label">Booking Date: </div>
                    <div class="right-content"> ${residency.rotation.booking_date}</div>
                  </div>
                  <div class="left-label">Booking Medium: </div>
                  <div class="booking-medium">${residency.rotation.booking_medium}</div>
                  <div class="flex-container">
                    <div class="left-label">Schedule Restrictions: </div>
                    <div class="right-content"> ${residency.rotation.schedule_restrictions}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      `;
    } else {
      return `<div id="info-window"></div>`;
    }
  }

  updateContentWindow(data){
    this.infoWindow.setContent(this.setContentWindow(data));
    this.infoWindow.setPosition(new google.maps.LatLng(data.latitude, data.longitude));
    google.maps.event.addListener(this.infoWindow, 'closeclick', function() { this.props.handleClick(data); }.bind(this));
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default GoogleMap;
