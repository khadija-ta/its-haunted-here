import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { createDarkMap } from './basemap.js'
import { pinIcon } from './pins.js'
import { CITIES, PLACEHOLDER_STORIES, STORY_TYPES } from './fakeData.js'

export default function MapView({ cityKey, onSelect }) {
  const mapEl = useRef(null)
  const map = useRef(null)
  const onSelectRef = useRef(onSelect)
  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  // Create the map once
  useEffect(() => {
    const m = createDarkMap(mapEl.current)

    PLACEHOLDER_STORIES.forEach((pin) => {
      const name = `${STORY_TYPES[pin.type].label}: ${pin.titleLead}${pin.place}`
      L.marker(pin.position, { icon: pinIcon(pin), title: name, alt: name })
        .on('click', () => onSelectRef.current?.(pin.id))
        .addTo(m)
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
