import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { createDarkMap } from './basemap.js'
import { pinIcon } from './pins.js'
import { CITIES } from './fakeData.js'

// Small map where you tap to drop a pin. Reports taps to the parent;
// the parent decides whether the spot is inside the city.
export default function PostMap({ cityKey, location, type, onTap }) {
  const el = useRef(null)
  const map = useRef(null)
  const marker = useRef(null)
  const onTapRef = useRef(onTap)
  useEffect(() => {
    onTapRef.current = onTap
  }, [onTap])

  useEffect(() => {
    const c = CITIES[cityKey]
    // scrollWheelZoom off so scrolling the page with a mouse wheel doesn't zoom the map
    const m = createDarkMap(el.current, { scrollWheelZoom: false })
    m.setView(c.center, 14)
    m.on('click', (e) => onTapRef.current?.(e.latlng))
    map.current = m
    return () => {
      m.remove()
      map.current = null
      marker.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Move to the other city when the toggle changes
  useEffect(() => {
    const c = CITIES[cityKey]
    map.current?.flyTo(c.center, 14, { duration: 1 })
  }, [cityKey])

  // Show the dropped pin, shaped like the chosen story type
  useEffect(() => {
    marker.current?.remove()
    marker.current = null
    if (location && map.current) {
      marker.current = L.marker(location, { icon: pinIcon({ type }), interactive: false, keyboard: false }).addTo(map.current)
    }
  }, [location, type])

  return <div ref={el} className="post-map" role="application" aria-label="Map. Tap to drop a pin for your story." />
}
