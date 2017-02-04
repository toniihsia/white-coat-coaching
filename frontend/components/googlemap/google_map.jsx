import React from 'react';
import { Link, hashHistory } from 'react-router';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.data || {lat: null, long: null, description: null};

    this.map = null;
    this.recenterMap = this.recenterMap.bind(this);
    this._defaultMapOptions = this._defaultMapOptions.bind(this);
  }

  componentDidMount(){
    this.map = new google.maps.Map(document.getElementById('map'), this._defaultMapOptions());
  }

  componentDidUpate(){

  }

  componentWillReceiveProps(nextProps){

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

  recenterMap(coords){
    this.map.panTo(new google.maps.LatLng(coords.lat, coords.long));
    this.map.setZoom(15);
  }

  setInfoWindow(){

  }

  // new google.maps.Marker({
  //         position: unitedStates,
  //         map: map,
  //         icon: 'http://res.cloudinary.com/dfrrpfeus/image/upload/v1485416001/map-marker_1_lzmi33.png'
  //       });

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default GoogleMap;
