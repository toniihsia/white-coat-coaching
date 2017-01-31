export default class MarkerUtil {
  constructor(map, handleClick) {
    this.map = map;
    this.markers = [];
    this.handleClick = handleClick;

    this._listingsToAdd = this._listingsToAdd.bind(this);
    this._createMarkerFromListing = this._createMarkerFromListing.bind(this);
    this._markersToRemove = this._markersToRemove.bind(this);
    this._removeMarker = this._removeMarker.bind(this);
  }

  updateMarkers(listings) {
    this.listings = Object.keys(listings).map(key => listings[key]);
    this._listingsToAdd().forEach(this._createMarkerFromListing);
    this._markersToRemove().forEach(this._removeMarker);
  }

  _listingsToAdd() {
    if (this.listings === undefined) { return []; }
    const currentListings = this.markers.map(marker => marker.listingId);
    return this.listings.filter(listing => !currentListings.includes(listing.id));
  }

  _createMarkerFromListing(listing) {
    const pos = new google.maps.LatLng(listing.lat, listing.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      listingId: listing.id
    });
    marker.addListener('click', () => this.handleClick(listing));
    this.markers.push(marker);
    marker.setMap(this.map);
  }

  _markersToRemove(){
    const listingIds = this.listings.map(listing => listing.id);
    return this.markers.filter(marker => !listingIds.includes(marker.listingId));
  }

  _removeMarker(marker) {
    const index = this.markers.indexOf(marker);
    this.markers[index].setMap(null);
    this.markers.splice(index, 1);
  }
}
