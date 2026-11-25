import L from 'leaflet'

// Pin look: shape + color, never color alone (styles live in index.css)
export function pinIcon(pin) {
  if (pin.type === 'legend') {
    // Gold dashed circle that grows with votes + retellings
    const size = Math.min(26 + ((pin.votes ?? 0) + (pin.retellings ?? 0) * 3) * 0.7, 72)
    return L.divIcon({
      className: '',
      html: `<div class="pin pin-legend" style="width:${size}px;height:${size}px"></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    })
  }
  return L.divIcon({
    className: '',
    html: `<div class="pin pin-${pin.type ?? 'draft'}"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}
