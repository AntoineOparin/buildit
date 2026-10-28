import { useCallback, useEffect, useRef, useState } from 'react'
import Reel from './Reel.jsx'
import { CATEGORIES, AUDIENCES, CATEGORY_ASPECTS, AUDIENCE_ASPECTS } from './words.js'
import * as sound from './sound.js'

const DURATIONS = [15, 30, 60]

function Aspects({ side, title, word, items, hidden }) {
  return (
    <aside className={`panel aspects ${side} ${hidden ? 'hidden' : ''}`} aria-live="polite">
      <h2 className="panel-head">{title}</h2>
      <div className="panel-body">
        {word ? (
          <div key={word}>
            <h3>{word}</h3>
            <ul>
              {items.map((a, i) => (
                <li key={a} style={{ '--i': i }}>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // Same shape as a filled list so the first spin doesn't shift the layout.
          <div className="empty">
            <h3>Spin to start</h3>
            <ul aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <li key={i} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  )
}

function buildPrompt(cat, aud) {
  const list = (items) => items.map((a) => `- ${a}`).join('\n')
  return `I'm brainstorming an app idea that combines the category "${cat}" with the target audience "${aud}".

Things the category "${cat}" can involve:
${list(CATEGORY_ASPECTS[cat] ?? [])}

Things to keep in mind about "${aud}":
${list(AUDIENCE_ASPECTS[aud] ?? [])}

Help me brainstorm:
1. Give me 5 distinct app ideas for this combination, each with a one-line pitch.
2. For each, name the core problem it solves for ${aud} and why existing tools fall short.
3. Point out which ideas could use hardware or sensors, and which are pure software.
4. Pick the most promising idea and outline a small first version I could build in a weekend.

Ask me questions if anything would help you sharpen the ideas.`
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Clipboard API is unavailable outside secure contexts; fall back to execCommand.
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
}

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function App() {
  const catRef = useRef(null)
  const audRef = useRef(null)
  const [spinning, setSpinning] = useState(false)
  const [locks, setLocks] = useState({ cat: false, aud: false })
  const [history, setHistory] = useState([])
  const [muted, setMuted] = useState(sound.isMuted)
  const [copied, setCopied] = useState(false)

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
    // Space always spins, even when a button has focus (otherwise it would
    // re-press that button, e.g. flipping the sound toggle).
    const isSpace = (e) => e.code === 'Space' && !e.target.closest?.('input, textarea, select')
    const onKeyDown = (e) => {
      if (!isSpace(e)) return
      e.preventDefault()
      if (!e.repeat) spin()
    }
    const onKeyUp = (e) => {
      if (isSpace(e)) e.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
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

  const last = history[0]

  const copyPrompt = async () => {
    await copyText(buildPrompt(last.cat, last.aud))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const timerLabel =
    remaining === null || remaining === 0 ? 'Start timer' : running ? 'Pause' : 'Resume'

  return (
    <main className="page">
      <header className="topbar">
        <h1 className="title">BUILD IT</h1>
        <span className="tag">// idea spinner</span>
        <button
          className="btn sound"
          onClick={toggleMute}
          aria-pressed={!muted}
          title={muted ? 'Turn sound on' : 'Mute'}
        >
          Sound: {muted ? 'off' : 'on'}
        </button>
      </header>

      <div className="stage">
        <Aspects
          side="left"
          title="Category notes"
          word={last?.cat}
          items={CATEGORY_ASPECTS[last?.cat] ?? []}
          hidden={spinning && !locks.cat}
        />
        <section className="panel machine">
          <h2 className="panel-head">Spinner</h2>
          <div className="reels">
            <Reel
              ref={catRef}
              label="App category"
              words={CATEGORIES}
              pitch={1}
              locked={locks.cat}
              onToggleLock={() => setLocks((l) => ({ ...l, cat: !l.cat }))}
            />
            <div className="plus">+</div>
            <Reel
              ref={audRef}
              label="Target audience"
              words={AUDIENCES}
              pitch={0.8}
              locked={locks.aud}
              onToggleLock={() => setLocks((l) => ({ ...l, aud: !l.aud }))}
            />
          </div>
          <div className="controls">
            <button className="btn primary" onClick={spin} disabled={spinning}>
              {spinning ? 'Spinning…' : 'Spin'}
            </button>
            {remaining === null ? (
              <div className="durations" role="group" aria-label="Timer length">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    className={`chip ${minutes === d ? 'active' : ''}`}
                    onClick={() => setMinutes(d)}
                    aria-pressed={minutes === d}
                  >
                    {d}m
                  </button>
                ))}
              </div>
            ) : (
              <div className={`clock ${remaining === 0 ? 'done' : ''}`}>
                {remaining === 0 ? "Time's up" : fmt(remaining)}
                <button className="link" onClick={resetTimer}>
                  reset
                </button>
              </div>
            )}
            <button className="btn" onClick={toggleTimer}>
              {timerLabel}
            </button>
          </div>
        </section>
        <Aspects
          side="right"
          title="Audience notes"
          word={last?.aud}
          items={AUDIENCE_ASPECTS[last?.aud] ?? []}
          hidden={spinning && !locks.aud}
        />
      </div>

      <div className="prompt-row">
        <button className="btn" onClick={copyPrompt} disabled={!last || spinning}>
          {copied ? 'Copied!' : 'Copy AI prompt'}
        </button>
      </div>

      <ul className="history" aria-label="Recent spins">
        {history.length === 0 && <li className="placeholder">No spins yet</li>}
        {history.map((h) => (
          <li key={h.id}>
            {h.cat} <span>+</span> {h.aud}
          </li>
        ))}
      </ul>

      <p className="hint">Space to spin · lock a reel to keep its word</p>
    </main>
  )
}
