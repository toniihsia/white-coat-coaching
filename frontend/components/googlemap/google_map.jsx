import React from 'react';
import { Link, hashHistory } from 'react-router';
import MarkerManager from '../../util/marker_util';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.recenterMap = this.recenterMap.bind(this);
    this._defaultMapOptions = this._defaultMapOptions.bind(this);
  }

  componentDidMount(){
    this.map = new google.maps.Map(document.getElementById('map'), this._defaultMapOptions());
    this.MarkerManager = new MarkerManager(this.map, this.props.handleClick);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.data) {
      this.recenterMap(nextProps.data.lat, nextProps.data.lng, 15);
    } else{
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

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default GoogleMap;
