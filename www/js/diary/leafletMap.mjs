import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import '../../manual_lib/leaflet/leaflet-src.js';

const sheet = css`
  @import url('manual_lib/leaflet/leaflet.css');
  .leaflet-map {
    height: 100%;
    z-index: -1;
  }
`;

const template = () => html`
    <div class="leaflet-map"></div>
`

class LeafletMap extends LitElement {

  static get properties() {
    return {
      geojson: { type: Object },
    };
  };

  constructor() {
    super();
  }

  firstUpdated() {
    const mapEl = this.shadowRoot.querySelector('.leaflet-map');
    if (this.geojson) {
      const map = L.map(mapEl, {
        scrollWheelZoom: false,
        doubleClickZoom: false,
        dragging: false, 
        touchZoom: false,
      });
      const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      const gj = L.geoJSON(this.geojson).addTo(map);
      const gjBounds = gj.getBounds().pad(.05);
      map.fitBounds(gjBounds);
    }
  }

  render() {
    return template()
  }
  static styles = sheet;
}
customElements.define('leaflet-map', LeafletMap);