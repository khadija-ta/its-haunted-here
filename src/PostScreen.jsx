import { useEffect, useState } from 'react'
import PostMap from './PostMap.jsx'
import { reverseGeocode } from './nominatim.js'
import { CITIES, STORY_TYPES, TAGS, TAG_GROUPS, PLACE_TYPES, TIMES_OF_DAY } from './fakeData.js'
import L from 'leaflet'

const EMPTY = { type: null, title: '', text: '', placeType: '', timeOfDay: '', tags: [] }

function FieldError({ id, children }) {
  if (!children) return null
  return <p id={id} className="field-error" role="alert">{children}</p>
}

export default function PostScreen({ cityKey, onCityChange, onSubmit, onGoMap }) {
  const [form, setForm] = useState(EMPTY)
  const [location, setLocation] = useState(null) // [lat, lon]
  const [place, setPlace] = useState({ status: 'idle', name: null }) // idle | loading | done | failed
  const [mapMsg, setMapMsg] = useState('')
  const [errors, setErrors] = useState({})
  const [moreOpen, setMoreOpen] = useState(false)
  const [sent, setSent] = useState(false)

  const city = CITIES[cityKey]
  const isLahore = cityKey === 'lahore'
  const set = (patch) => setForm((f) => ({ ...f, ...patch }))
  const clearError = (key) => setErrors((e) => ({ ...e, [key]: undefined }))

  const changeCity = (key) => {
    onCityChange(key)
    setLocation(null) // an old pin would be in the other city
    setMapMsg('')
  }

  const handleTap = (latlng) => {
    if (!L.latLngBounds(city.bounds).contains(latlng)) {
      setMapMsg(`That spot is outside ${city.name}. Tap somewhere inside the city.`)
      return
    }
    setMapMsg('')
    clearError('pin')
    setLocation([latlng.lat, latlng.lng])
  }

  // Look up the place name once the pin has stayed put for a moment
  useEffect(() => {
    if (!location) return
    const ctrl = new AbortController()
    const timer = setTimeout(() => {
      setPlace({ status: 'loading', name: null })
      reverseGeocode(location[0], location[1], ctrl.signal)
        .then((name) => setPlace(name ? { status: 'done', name } : { status: 'failed', name: null }))
        .catch((err) => err.name !== 'AbortError' && setPlace({ status: 'failed', name: null }))
    }, 700)
    return () => {
      clearTimeout(timer)
      ctrl.abort()
    }
  }, [location])

  const toggleTag = (id) =>
    set({ tags: form.tags.includes(id) ? form.tags.filter((t) => t !== id) : [...form.tags, id] })

  const submit = (e) => {
    e.preventDefault()
    const found = {}
    if (!location) found.pin = 'Tap the map to drop a pin for your story.'
    if (!form.type) found.type = 'Choose a story type.'
    if (!form.title.trim()) found.title = 'Add a title.'
    if (!form.text.trim()) found.text = 'Write your story.'
    setErrors(found)
    const first = ['pin', 'type', 'title', 'text'].find((k) => found[k])
    if (first) {
      const target = document.getElementById(`field-${first}`)
      target?.scrollIntoView({ block: 'center' })
      target?.focus({ preventScroll: true })
      return
    }
    onSubmit({
      id: `new-${Date.now()}`,
      status: 'pending',
      city: cityKey,
      position: location,
      placeName: place.name,
      type: form.type,
      title: form.title.trim(),
      text: form.text.trim(),
      placeType: form.placeType || null,
      timeOfDay: form.timeOfDay || null,
      tags: form.tags,
    })
    setSent(true)
  }

  const another = () => {
    setForm(EMPTY)
    setLocation(null)
    setPlace({ status: 'idle', name: null })
    setErrors({})
    setMoreOpen(false)
    setSent(false)
  }

  if (sent) {
    return (
      <main className="screen">
        <div className="screen-inner success">
          <h1 className="success-title" role="status">Sent for review!</h1>
          <p>A moderator in {city.name} will read your story before it goes live. You can check on it in your profile later.</p>
          <p>
            <a href="/" onClick={(e) => { e.preventDefault(); onGoMap() }}>Back to the map</a>
          </p>
          <p>
            <button className="btn btn-outline" onClick={another}>Post another story</button>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="screen">
      <form className="screen-inner" onSubmit={submit} noValidate>
        <h1 className="screen-title">Post a story</h1>

        <div className="toggle" role="group" aria-label="Choose city">
          {Object.entries(CITIES).map(([key, c]) => (
            <button type="button" key={key} aria-pressed={cityKey === key} onClick={() => changeCity(key)}>
              {c.name}
            </button>
          ))}
        </div>

        {/* 1. Pin */}
        <section className="field">
          <h2 className="label" id="pin-label">Where did it happen?</h2>
          <p className="hint">Tap the map to drop a pin. Pins only work inside {city.name}.</p>
          <div id="field-pin" tabIndex={-1} aria-labelledby="pin-label" aria-describedby="pin-error">
            <PostMap cityKey={cityKey} location={location} type={form.type} onTap={handleTap} />
          </div>
          {mapMsg && <p className="field-error" role="status">{mapMsg}</p>}
          {location && (
            <p className="place-name" role="status">
              {place.status === 'loading' && 'Finding the place name…'}
              {place.status === 'done' && <>Near <strong>{place.name}</strong></>}
              {place.status === 'failed' && 'Pin dropped. We couldn’t look up a place name, but you can still post.'}
              {place.status === 'idle' && 'Pin dropped.'}
            </p>
          )}
          <FieldError id="pin-error">{errors.pin}</FieldError>
        </section>

        {/* 2. Type */}
        <section className="field">
          <h2 className="label" id="type-label">Story type</h2>
          <div id="field-type" tabIndex={-1} className="type-row" role="group" aria-labelledby="type-label" aria-describedby="type-error">
            {Object.entries(STORY_TYPES).map(([key, t]) => (
              <button
                type="button" key={key} className={`type-btn type-btn-${key}`} aria-pressed={form.type === key}
                onClick={() => { set({ type: key }); clearError('type') }}
              >
                <span className={`key key-${key}`} aria-hidden="true" />
                {t.label}
              </button>
            ))}
          </div>
          <FieldError id="type-error">{errors.type}</FieldError>
        </section>

        {/* 3. Title + story */}
        <section className="field">
          <label className="label" htmlFor="field-title">Title</label>
          <input
            id="field-title" className="input" type="text" maxLength={80} value={form.title}
            aria-invalid={!!errors.title} aria-describedby="title-error"
            onChange={(e) => { set({ title: e.target.value }); clearError('title') }}
          />
          <FieldError id="title-error">{errors.title}</FieldError>
        </section>

        <section className="field">
          <label className="label" htmlFor="field-text">Your story</label>
          <textarea
            id="field-text" className="input" rows={7} maxLength={3000} value={form.text}
            aria-invalid={!!errors.text} aria-describedby="text-error reminder"
            onChange={(e) => { set({ text: e.target.value }); clearError('text') }}
          />
          <FieldError id="text-error">{errors.text}</FieldError>
          <p id="reminder" className="hint">Please don’t name real living people or point to private homes.</p>
        </section>

        {/* 4. Optional details */}
        <section className="field">
          <button
            type="button" className="btn btn-link more-toggle" aria-expanded={moreOpen} aria-controls="more-details"
            onClick={() => setMoreOpen((o) => !o)}
          >
            {moreOpen ? '− Fewer details' : '+ More details (optional)'}
          </button>

          {moreOpen && (
            <div id="more-details" className="more">
              <label className="label" htmlFor="field-placetype">Type of place</label>
              <select id="field-placetype" className="input" value={form.placeType} onChange={(e) => set({ placeType: e.target.value })}>
                <option value="">Choose…</option>
                {PLACE_TYPES.map((p) => <option key={p}>{p}</option>)}
              </select>

              <label className="label" htmlFor="field-time">Time of day</label>
              <select id="field-time" className="input" value={form.timeOfDay} onChange={(e) => set({ timeOfDay: e.target.value })}>
                <option value="">Choose…</option>
                {TIMES_OF_DAY.map((t) => <option key={t}>{t}</option>)}
              </select>

              <h2 className="label">What happened</h2>
              {TAG_GROUPS.map((g) => (
                <div key={g.label} role="group" aria-label={g.label}>
                  <p className="group-label">{g.label}</p>
                  <div className="chips">
                    {g.ids.map((id) => {
                      const t = TAGS[id]
                      return (
                        <button type="button" key={id} className="chip" aria-pressed={form.tags.includes(id)} onClick={() => toggleTag(id)}>
                          {t.label}
                          {isLahore && t.urdu && (
                            <>
                              {' · '}
                              <span lang="ur" dir="rtl" className="urdu">{t.urdu}</span> {t.roman}
                            </>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <button type="submit" className="btn btn-main btn-wide">Send for review</button>
      </form>
    </main>
  )
}
