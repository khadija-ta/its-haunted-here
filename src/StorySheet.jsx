import { useEffect, useRef, useState } from 'react'
import { STORY_TYPES, TAGS } from './fakeData.js'

export default function StorySheet({ story, state, onChange, onClose }) {
  const closeBtn = useRef(null)
  const [dragY, setDragY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startY = useRef(0)

  // Move keyboard focus into the sheet, and let Esc close it
  useEffect(() => {
    closeBtn.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [story.id, onClose])

  // Drag the handle down to close
  const onDown = (e) => {
    startY.current = e.clientY
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e) => dragging && setDragY(Math.max(0, e.clientY - startY.current))
  const onUp = () => {
    setDragging(false)
    if (dragY > 100) onClose()
    setDragY(0)
  }

  const isLahore = story.city === 'lahore'
  const isEncounter = story.type === 'encounter'
  const votes = story.votes + (state.upvoted ? 1 : 0)
  const meToo = story.meToo + (state.meToo ? 1 : 0)

  return (
    <section
      className="sheet"
      role="dialog"
      aria-label="Story"
      style={{ transform: `translateY(${dragY}px)`, transition: dragging ? 'none' : undefined }}
    >
      <div
        className="sheet-handle-area"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className="sheet-handle" aria-hidden="true" />
      </div>
      <button ref={closeBtn} className="sheet-close" aria-label="Close story" onClick={onClose}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>

      <div className="sheet-body">
        <span className={`badge badge-${story.type}`}>{STORY_TYPES[story.type].label}</span>

        <h1 className="story-title">
          {story.titleLead}
          <span className="story-place">{story.place}</span>
        </h1>

        <p className="meta">
          {story.place} · {story.placeType} · {story.timeOfDay}
        </p>

        <ul className="tags" aria-label="What happened">
          {story.tags.map((id) => {
            const t = TAGS[id]
            return (
              <li key={id} className="tag">
                {t.label}
                {isLahore && t.urdu && (
                  <>
                    {' · '}
                    <span lang="ur" dir="rtl" className="urdu">{t.urdu}</span> {t.roman}
                  </>
                )}
              </li>
            )
          })}
        </ul>

        <p className="story-text">{story.text}</p>
        <p className="meta">{story.author} · {story.date}</p>

        <div className="actions">
          <button className="btn btn-main" aria-pressed={state.upvoted} onClick={() => onChange({ upvoted: !state.upvoted })}>
            ▲ {state.upvoted ? 'Upvoted' : 'Upvote'} · {votes}
          </button>
          {isEncounter && (
            <button className="btn btn-outline" aria-pressed={state.meToo} onClick={() => onChange({ meToo: !state.meToo })}>
              This happened to me too · {meToo}
            </button>
          )}
          <button className="btn btn-link" aria-pressed={state.saved} onClick={() => onChange({ saved: !state.saved })}>
            {state.saved ? 'Saved' : 'Save'}
          </button>
          <button className="btn btn-report" disabled={state.reported} onClick={() => onChange({ reported: true })}>
            Report
          </button>
        </div>
        {state.reported && (
          <p className="inline-note" role="status">Sent for review!</p>
        )}
      </div>
    </section>
  )
}
