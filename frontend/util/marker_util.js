import React from 'react';

export default class MarkerUtil {
  constructor(map, callback) {
    this.map = map;
    this.markers = [];
    this.residencies = [];

    this.handleClick = callback;
    this._residenciesToAdd = this._residenciesToAdd.bind(this);
    this._createMarkerFromResidencies = this._createMarkerFromResidencies.bind(this);
    this._markersToRemove = this._markersToRemove.bind(this);
    this._removeMarker = this._removeMarker.bind(this);
  }

  updateMarkers(residencies) {
    this.residencies = residencies;
    let residenciesToAdd = this._residenciesToAdd();
    for (let i = 0; i < residenciesToAdd.length; i++) {
      this._createMarkerFromResidencies(residenciesToAdd[i]);
    }
    this._markersToRemove().forEach(this._removeMarker);
  }

  _residenciesToAdd() {
    if (this.residencies === []) { return []; }
    const currentResidencies = this.markers.map(marker => marker.residencyId);
    return this.residencies.filter(residency => !currentResidencies.includes(residency.id))
  }

  _createMarkerFromResidencies(residency) {
    const pos = new google.maps.LatLng(residency.latitude, residency.longitude);
    let marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      residencyId: residency.id,
      icon: 'http://res.cloudinary.com/dfrrpfeus/image/upload/v1517795111/placeholder_beagnv.png'
    });

    google.maps.event.addListener(marker,'click', () => {
      this.handleClick(residency);
    });
    this.markers.push(marker);
    marker.setMap(this.map);
  }

  _markersToRemove(){
    const residencyIds = this.residencies.map(residency => residency.id);
    return this.markers.filter(marker => !residencyIds.includes(marker.residencyId));
  }

  _removeMarker(marker) {
    const index = this.markers.indexOf(marker);
    this.markers[index].setMap(null);
    this.markers.splice(index, 1);
  }
}
