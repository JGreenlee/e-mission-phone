import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import '../../manual_lib/leaflet/leaflet-src.js';

class LeafletMap extends LitElement {

  static get properties() {
    return {
      trip: { type: Object },
      opts: { type: Object}
    };
  };

  static pointIcon = L.divIcon({className: 'leaflet-div-icon', iconSize: [0, 0]});
  static startIcon = L.divIcon({className: 'leaflet-div-icon-start', iconSize: [18, 18], html: '<div class="leaflet-div-ionicon leaflet-div-ionicon-start">★</div>'});
  static stopIcon = L.divIcon({className: 'leaflet-div-icon-stop', iconSize: [18, 18], html: '<div class="leaflet-div-ionicon leaflet-div-ionicon-stop">⚑</div>'});

  pointToLayer(feature, latlng) {
    switch(feature.properties.feature_type) {
      case "start_place": return L.marker(latlng, {icon: LeafletMap.startIcon});
      case "end_place": return L.marker(latlng, {icon: LeafletMap.stopIcon});
      case "stop": return L.circleMarker(latlng);
      case "incident": return PostTripManualMarker.incidentMarker(feature, latlng);
      case "location": return L.marker(latlng, {icon: LeafletMap.pointIcon});
      default: alert("Found unknown type in feature"  + feature); return L.marker(latlng)
    }
  };

  _updateMap() {
    const mapEl = this.shadowRoot.querySelector('.leaflet-map');
    if (this.trip) {
      const map = L.map(mapEl, this.opts || {});
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      const gj = L.geoJSON(this.trip.data, {pointToLayer: this.pointToLayer}).addTo(map);
      const gjBounds = gj.getBounds().pad(0.2);
      map.fitBounds(gjBounds);
    }
  }

  firstUpdated() {
    setTimeout(() => this._updateMap(), 500);
  }

  render() {
    return html`
      <div class="leaflet-map"></div>
    `;
  }

  static styles = css`
    @import url('css/main.diary.css');
    @import url('manual_lib/leaflet/leaflet.css');

    .leaflet-map {
      border-radius: var(--map-border-radius, 0px);
      height: 100%;
      overflow: hidden;
      isolation: isolate;
    }
  `;
}
customElements.define('leaflet-map', LeafletMap);