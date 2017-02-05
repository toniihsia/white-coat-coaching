import React from 'react';

export default class MarkerUtil {
  constructor(map) {
    this.map = map;
    this.markers = [];

    this._residenciesToAdd = this._residenciesToAdd.bind(this);
    this._createMarkerFromResidencies = this._createMarkerFromResidencies.bind(this);
    this._markersToRemove = this._markersToRemove.bind(this);
    this._removeMarker = this._removeMarker.bind(this);
  }

  updateMarkers(residencies, handleClick) {
    console.log(residencies);

    this.residencies = residencies;
    let residenciesToAdd = this._residenciesToAdd();
    for (let i = 0; i < residenciesToAdd.length; i++) {
      let residency = residenciesToAdd[i];
      this._createMarkerFromResidencies(residency, handleClick);
    }
    // this._residenciesToAdd().forEach(this._createMarkerFromResidencies);
    this._markersToRemove().forEach(this._removeMarker);
    // console.log(this.residencies);
  }

  _residenciesToAdd() {
    if (this.residencies === []) { return []; }
    // console.log('hey');;
    const currentResidencies = this.markers.map(marker => marker.listingId);
    return this.residencies.filter(residency => !currentResidencies.includes(residency.id))

  }

  _createMarkerFromResidencies(residency, handleClick) {
    const pos = new google.maps.LatLng(residency.latitude, residency.longitude);
    const map = this.map;
    // console.log(this.props);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      residencyId: residency.id,
      icon: 'http://res.cloudinary.com/dfrrpfeus/image/upload/v1485416001/map-marker_1_lzmi33.png'
    });

    let data = {
      lat: residency.latitude,
      long: residency.longitude,
      decription: residency.description
    };
    // marker.addListener('click', this._handleClick);
    marker.addListener('click', () => {
          map.setZoom(8);
          map.setCenter(marker.getPosition());
          console.log(residency);
          handleClick(data);
        });
    this.markers.push(marker);
    marker.setMap(this.map);
  }

  // _handleClick(e) {
  //   let data = {
  //     lat: this.residencyLat,
  //     long: this.residencyLong,
  //     description: this.residencyDes
  //   };
  //   console.log('it made it here');
  //   console.log(this.handleClick);
  //   this.handleClick(data);
  // }

  _markersToRemove(){
    // console.log(this.residencies);
    const residencyIds = this.residencies.map(residency => residency.id);
    return this.markers.filter(marker => !residencyIds.includes(marker.residencyId));
  }

  _removeMarker(marker) {
    const index = this.markers.indexOf(marker);
    this.markers[index].setMap(null);
    this.markers.splice(index, 1);
  }
}
