import { useCallback, useEffect, useRef, useState } from 'react'
import Reel from './Reel.jsx'
import { BUSINESSES, WORKFLOWS, ANGLES, BUSINESS_FACTS, FACT_LABELS, WORKFLOW_ASPECTS } from './words.js'
import * as sound from './sound.js'

const DURATIONS = [15, 30, 60]

const businessFacts = (biz) =>
  Object.entries(FACT_LABELS).map(([key, label]) => ({ label, text: BUSINESS_FACTS[biz]?.[key] }))

// items are plain strings, or { label, text } pairs for labeled facts.
function Aspects({ side, title, word, items, rows, note, hidden }) {
  return (
    <aside className={`panel aspects ${side} ${hidden ? 'hidden' : ''}`} aria-live="polite">
      <h2 className="panel-head">{title}</h2>
      <div className="panel-body">
        {word ? (
          <div key={word}>
            <h3>{word}</h3>
            <ul>
              {items.map((a, i) =>
                typeof a === 'string' ? (
                  <li key={a} style={{ '--i': i }}>
                    {a}
                  </li>
                ) : (
                  <li key={a.label} className="fact" style={{ '--i': i }}>
                    <span className="fact-label">{a.label}</span>
                    {a.text}
                  </li>
                ),
              )}
            </ul>
            {note && <p className="note">{note}</p>}
          </div>
        ) : (
          // Same shape as a filled list so the first spin doesn't shift the layout.
          <div className="empty">
            <h3>Spin to start</h3>
            <ul aria-hidden="true">
              {Array.from({ length: rows }, (_, i) => (
                <li key={i} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  )
}

function buildPrompt(biz, flow, angle) {
  const list = (items) => items.map((a) => `- ${a}`).join('\n')
  const facts = businessFacts(biz).map((f) => `${f.label}: ${f.text}`)
  return `I'm exploring a B2B SaaS idea: software for ${biz} that handles ${flow}, with this angle: "${angle}".

My rough notes on ${biz} (correct anything that's wrong):
${list(facts)}

Common problems with ${flow}:
${list(WORKFLOW_ASPECTS[flow] ?? [])}

Help me judge whether this could become a profitable SaaS:
1. Describe the exact customer (business size, who signs off on buying) and the painful moment that makes them look for a fix.
2. Estimate how many of these businesses exist in my market, a realistic monthly price, and what revenue looks like at 100 and 1,000 customers.
3. List existing competitors, including spreadsheets and general tools, and where they fall short for this niche.
4. Explain how "${angle}" could make the product clearly better, or say if it doesn't fit.
5. Describe the smallest version a business would pay for in its first month.
6. Suggest how to find and sign the first 10 paying customers.
7. Give me 5 non-leading questions to ask owners in customer interviews.
8. Name the biggest risks and the signals that would mean it's not worth building.

Be blunt. If the idea is weak, say so and suggest a stronger nearby niche or workflow. Ask me which country I'm targeting if it matters.`
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
  const bizRef = useRef(null)
  const flowRef = useRef(null)
  const angleRef = useRef(null)
  const [spinning, setSpinning] = useState(false)
  const [locks, setLocks] = useState({ biz: false, flow: false, angle: false })
  const [history, setHistory] = useState([])
  const [muted, setMuted] = useState(sound.isMuted)
  const [copied, setCopied] = useState(false)

  const [minutes, setMinutes] = useState(30)
  const [remaining, setRemaining] = useState(null) // seconds; null = timer not started
  const [running, setRunning] = useState(false)

  const toggleLock = (key) => setLocks((l) => ({ ...l, [key]: !l[key] }))

  const spin = useCallback(async () => {
    if (spinning) return
    setSpinning(true)
    sound.unlock()
    const [biz, flow, angle] = await Promise.all([
      locks.biz ? bizRef.current.current() : bizRef.current.spin(2400),
      locks.flow ? flowRef.current.current() : flowRef.current.spin(3000),
      locks.angle ? angleRef.current.current() : angleRef.current.spin(3500),
    ])
    setHistory((h) => [{ biz, flow, angle, id: Date.now() }, ...h].slice(0, 6))
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
    await copyText(buildPrompt(last.biz, last.flow, last.angle))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const timerLabel =
    remaining === null || remaining === 0 ? 'Start timer' : running ? 'Pause' : 'Resume'

  return (
    <main className="page">
      <header className="topbar">
        <h1 className="title">BUILD IT</h1>
        <span className="tag">// saas idea spinner</span>
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
          title="Business notes"
          word={last?.biz}
          items={last ? businessFacts(last.biz) : []}
          rows={5}
          note="Rough guide, check before relying on it."
          hidden={spinning && !locks.biz}
        />
        <section className="panel machine">
          <h2 className="panel-head">Spinner</h2>
          <div className="reels">
            <Reel
              ref={bizRef}
              label="Business type"
              words={BUSINESSES}
              pitch={1}
              locked={locks.biz}
              onToggleLock={() => toggleLock('biz')}
            />
            <div className="plus">+</div>
            <Reel
              ref={flowRef}
              label="Painful workflow"
              words={WORKFLOWS}
              pitch={0.8}
              locked={locks.flow}
              onToggleLock={() => toggleLock('flow')}
            />
            <div className="angle">
              <Reel
                ref={angleRef}
                label="Angle"
                words={ANGLES}
                pitch={1.25}
                locked={locks.angle}
                onToggleLock={() => toggleLock('angle')}
              />
            </div>
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
          title="Workflow notes"
          word={last?.flow}
          items={WORKFLOW_ASPECTS[last?.flow] ?? []}
          rows={6}
          hidden={spinning && !locks.flow}
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
            {h.biz} <span>+</span> {h.flow}
          </li>
        ))}
      </ul>

      <p className="hint">Space to spin · lock a reel to keep its word</p>
    </main>
  )
}
