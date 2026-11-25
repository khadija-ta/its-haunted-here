// Turns a map position into a place name using Nominatim (OpenStreetMap).
// Follows Nominatim's usage policy: one request at a time, at most one per
// second, no repeats for the same spot, and only after the user taps (never
// "as you type").
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const aborted = () => new DOMException('Aborted', 'AbortError')

let chain = Promise.resolve() // makes requests go one after another
let lastStart = 0
const cache = new Map()

function nameFrom(data) {
  const a = data.address ?? {}
  const first = data.name || a.road || a.pedestrian || a.footway || a.neighbourhood || a.suburb
  const city = a.city || a.town || a.village || a.city_district || a.county
  const parts = [first, city].filter(Boolean)
  if (parts.length === 2 && parts[0] === parts[1]) parts.pop()
  if (parts.length) return parts.join(', ')
  // No house numbers: stories shouldn't point at private homes
  return (data.display_name ?? '').split(',').slice(0, 2).join(',').trim() || null
}

export function reverseGeocode(lat, lon, signal) {
  const key = `${lat.toFixed(5)},${lon.toFixed(5)}`
  if (cache.has(key)) return Promise.resolve(cache.get(key))

  const run = chain.then(async () => {
    if (signal?.aborted) throw aborted()
    const wait = lastStart + 1100 - Date.now()
    if (wait > 0) await sleep(wait)
    if (signal?.aborted) throw aborted()
    lastStart = Date.now()
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&accept-language=en&lat=${lat}&lon=${lon}`
    const res = await fetch(url, { signal, headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`Nominatim ${res.status}`)
    const name = nameFrom(await res.json())
    cache.set(key, name)
    return name
  })
  chain = run.catch(() => {}) // a failed request must not block the next one
  return run
}
