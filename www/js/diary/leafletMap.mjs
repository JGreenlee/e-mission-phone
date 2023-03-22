import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import '../../manual_lib/leaflet/leaflet-src.js';

class LeafletMap extends LitElement {

  static get properties() {
    return {
      gj: { type: Object },
      opts: { type: Object}
    };
  };

  _updateMap() {
    const mapEl = this.shadowRoot.querySelector('.leaflet-map');
    if (this.gj) {
      const map = L.map(mapEl, this.opts || {});
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      const gj = L.geoJSON(this.gj).addTo(map);
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