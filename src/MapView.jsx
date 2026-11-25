import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { CITIES, PLACEHOLDER_PINS } from './fakeData.js'

const CARTO_KEY = import.meta.env.VITE_CARTO_KEY
const TILES =
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' +
  (CARTO_KEY ? `?key=${encodeURIComponent(CARTO_KEY)}` : '')

// Pin look: shape + color, never color alone (styles live in index.css)
function pinIcon(pin) {
  if (pin.type === 'legend') {
    // Gold dashed circle that grows with votes + retellings
    const size = Math.min(26 + (pin.votes + pin.retellings * 3) * 0.7, 72)
    return L.divIcon({
      className: '',
      html: `<div class="pin pin-legend" style="width:${size}px;height:${size}px"></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    })
  }
  return L.divIcon({
    className: '',
    html: `<div class="pin pin-${pin.type}"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

export default function MapView({ cityKey }) {
  const mapEl = useRef(null)
  const map = useRef(null)

  // Create the map once
  useEffect(() => {
    const m = L.map(mapEl.current, { zoomControl: false, attributionControl: false })
    L.tileLayer(TILES, {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(m)
    L.control
      .attribution({ position: 'bottomleft', prefix: false })
      .addAttribution('© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attributions">CARTO</a>')
      .addTo(m)

    PLACEHOLDER_PINS.forEach((pin) => {
      L.marker(pin.position, { icon: pinIcon(pin), title: pin.title, alt: pin.title }).addTo(m)
    })
    const first = CITIES[cityKey]
    m.setView(first.center, first.zoom)
    map.current = m
    return () => {
      m.remove()
      map.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fly to the city when the toggle changes
  useEffect(() => {
    const city = CITIES[cityKey]
    map.current?.flyTo(city.center, city.zoom, { duration: 1.2 })
  }, [cityKey])

  return <div ref={mapEl} className="map" />
}
