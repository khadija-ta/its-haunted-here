import L from 'leaflet'

const CARTO_KEY = import.meta.env.VITE_CARTO_KEY
const KEY_PARAM = CARTO_KEY ? `?key=${encodeURIComponent(CARTO_KEY)}` : ''
// "@2x" = CARTO's high-resolution (retina) tiles, so text stays sharp
const BASE = `https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png${KEY_PARAM}`
const LABELS = `https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png${KEY_PARAM}`

// Creates a Leaflet map with our two-layer dark basemap and the required attribution.
export function createDarkMap(element, options = {}) {
  const m = L.map(element, { zoomControl: false, attributionControl: false, ...options })
  // Layer 1: dark map with no text (roads and land), slightly brightened
  L.tileLayer(BASE, { subdomains: 'abcd', maxZoom: 20, className: 'tiles-base' }).addTo(m)
  // Layer 2: street names only, in its own pane above the map but below the pins
  m.createPane('labels').style.zIndex = 250
  m.getPane('labels').style.pointerEvents = 'none'
  L.tileLayer(LABELS, { subdomains: 'abcd', maxZoom: 20, pane: 'labels', className: 'tiles-labels' }).addTo(m)
  L.control
    .attribution({ position: 'bottomleft', prefix: false })
    .addAttribution('© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attributions">CARTO</a>')
    .addTo(m)
  return m
}
