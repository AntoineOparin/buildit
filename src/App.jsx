import { useCallback, useEffect, useRef, useState } from 'react'
import Reel from './Reel.jsx'
import { CATEGORIES, AUDIENCES } from './words.js'
import * as sound from './sound.js'

const DURATIONS = [15, 30, 60]

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function App() {
  const catRef = useRef(null)
  const audRef = useRef(null)
  const [spinning, setSpinning] = useState(false)
  const [locks, setLocks] = useState({ cat: false, aud: false })
  const [history, setHistory] = useState([])
  const [muted, setMuted] = useState(sound.isMuted)

  const [minutes, setMinutes] = useState(30)
  const [remaining, setRemaining] = useState(null) // seconds; null = timer not started
  const [running, setRunning] = useState(false)

  const spin = useCallback(async () => {
    if (spinning) return
    setSpinning(true)
    sound.unlock()
    const [cat, aud] = await Promise.all([
      locks.cat ? catRef.current.current() : catRef.current.spin(2400),
      locks.aud ? audRef.current.current() : audRef.current.spin(3100),
    ])
    setHistory((h) => [{ cat, aud, id: Date.now() }, ...h].slice(0, 6))
    sound.win()
    setSpinning(false)
  }, [spinning, locks])

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault()
        spin()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [spin])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (remaining === 0) sound.alarm()
  }, [remaining])

  const toggleMute = () => {
    sound.setMuted(!muted)
    setMuted(!muted)
  }

  const toggleTimer = () => {
    sound.unlock()
    if (remaining === null || remaining === 0) {
      setRemaining(minutes * 60)
      setRunning(true)
    } else {
      setRunning((r) => !r)
    }
  }
  const resetTimer = () => {
    setRunning(false)
    setRemaining(null)
  }

  const timerLabel =
    remaining === null || remaining === 0 ? 'Start timer' : running ? 'Pause' : 'Resume'

  return (
    <main className="page">
      <h1 className="title">BUILD IT</h1>

      <section className="machine">
        <Reel
          ref={catRef}
          label="App Category"
          words={CATEGORIES}
          pitch={1}
          locked={locks.cat}
          onToggleLock={() => setLocks((l) => ({ ...l, cat: !l.cat }))}
        />
        <div className="plus">+</div>
        <Reel
          ref={audRef}
          label="Target Audience"
          words={AUDIENCES}
          pitch={0.8}
          locked={locks.aud}
          onToggleLock={() => setLocks((l) => ({ ...l, aud: !l.aud }))}
        />
      </section>

      <div className="controls">
        <button className="btn primary" onClick={spin} disabled={spinning}>
          {spinning ? 'Spinning…' : 'Spin'}
        </button>
        <button className="btn" onClick={toggleTimer}>
          {timerLabel}
        </button>
        <button
          className="btn icon"
          onClick={toggleMute}
          title={muted ? 'Turn sound on' : 'Mute'}
          aria-label={muted ? 'Turn sound on' : 'Mute'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      <div className="timer-row">
        {remaining === null ? (
          <div className="durations">
            {DURATIONS.map((d) => (
              <button
                key={d}
                className={`chip ${minutes === d ? 'active' : ''}`}
                onClick={() => setMinutes(d)}
              >
                {d} min
              </button>
            ))}
          </div>
        ) : (
          <div className={`clock ${remaining === 0 ? 'done' : ''}`}>
            {remaining === 0 ? "Time's up!" : fmt(remaining)}
            <button className="link" onClick={resetTimer}>
              reset
            </button>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <ul className="history">
          {history.map((h) => (
            <li key={h.id}>
              {h.cat} <span>+</span> {h.aud}
            </li>
          ))}
        </ul>
      )}

      <p className="hint">Press space to spin · lock a reel to keep its word</p>
    </main>
  )
}
