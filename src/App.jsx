import { useCallback, useState } from 'react'
import MapView from './MapView.jsx'
import StorySheet from './StorySheet.jsx'
import { CITIES, PLACEHOLDER_STORIES } from './fakeData.js'

function Logo() {
  return (
    <a className="logo" href="/" aria-label="It's Haunted Here, back to map">
      It’s <span className="logo-haunted">Haunted</span> Here
    </a>
  )
}

function Legend() {
  return (
    <section className="legend" aria-label="Map legend">
      <ul>
        <li><span className="key key-folklore" aria-hidden="true" />Local folklore</li>
        <li><span className="key key-encounter" aria-hidden="true" />Personal encounter</li>
        <li><span className="key key-legend" aria-hidden="true" />Invented legend</li>
        <li><span className="key key-hotspot" aria-hidden="true" />Hotspot</li>
      </ul>
    </section>
  )
}

function TabBar() {
  return (
    <nav className="tabbar" aria-label="Main">
      <button className="tab tab-active" aria-current="page">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14" /></svg>
        Map
      </button>
      <button className="tab-plus" aria-label="Post a story">+</button>
      <button className="tab">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
        Profile
      </button>
    </nav>
  )
}

export default function App() {
  const [cityKey, setCityKey] = useState('ann-arbor')
  const [selectedId, setSelectedId] = useState(null)
  // Fake, on-screen-only reactions (nothing is saved yet)
  const [reactions, setReactions] = useState({})
  const story = PLACEHOLDER_STORIES.find((s) => s.id === selectedId)
  const closeSheet = useCallback(() => setSelectedId(null), [])

  return (
    <div className="app">
      <MapView cityKey={cityKey} onSelect={setSelectedId} />

      <header className="top">
        <Logo />
        <div className="toggle" role="group" aria-label="Choose city">
          {Object.entries(CITIES).map(([key, city]) => (
            <button key={key} aria-pressed={cityKey === key} onClick={() => setCityKey(key)}>
              {city.name}
            </button>
          ))}
        </div>
        <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="place-search" className="sr-only">Search for a place</label>
          <input id="place-search" type="search" placeholder={`Search a place in ${CITIES[cityKey].name}`} />
        </form>
      </header>

      <Legend />
      <button className="locate" aria-label="Show my location">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><circle cx="12" cy="12" r="7.5" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3" /></svg>
      </button>
      {story && (
        <StorySheet
          key={story.id}
          story={story}
          state={reactions[story.id] ?? {}}
          onChange={(patch) => setReactions((r) => ({ ...r, [story.id]: { ...r[story.id], ...patch } }))}
          onClose={closeSheet}
        />
      )}
      <TabBar />
    </div>
  )
}
