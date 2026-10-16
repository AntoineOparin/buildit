import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import * as sound from './sound.js'

const ITEM_H = 72
const mod = (a, n) => ((a % n) + n) % n

// Ease-out with a tiny overshoot so the reel "settles" like a slot machine.
const easeOutBack = (t) => {
  const c1 = 0.9
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

const Reel = forwardRef(function Reel({ label, words, locked, onToggleLock, pitch = 1 }, ref) {
  // pos is a continuous index into an infinitely repeating word list.
  const [pos, setPos] = useState(() => Math.floor(Math.random() * words.length))
  const [speed, setSpeed] = useState(0)
  const posRef = useRef(pos)
  const rafRef = useRef(0)

  useImperativeHandle(ref, () => ({
    spin(duration = 2600) {
      return new Promise((resolve) => {
        cancelAnimationFrame(rafRef.current)
        const start = Math.round(posRef.current)
        const target = start + words.length * 3 + Math.floor(Math.random() * words.length)
        const t0 = performance.now()
        let lastP = start
        let lastT = t0
        let lastSlot = start
        let lastTickAt = 0

        const tick = (now) => {
          const t = Math.min(1, (now - t0) / duration)
          const p = start + (target - start) * easeOutBack(t)
          const dt = Math.max(1, now - lastT)
          setSpeed(Math.abs(p - lastP) / dt) // items per ms
          lastP = p
          lastT = now
          // Click each time a word crosses the center (capped so fast spins don't buzz).
          const slot = Math.round(p)
          if (slot !== lastSlot) {
            lastSlot = slot
            if (now - lastTickAt > 45) {
              sound.tick(pitch)
              lastTickAt = now
            }
          }
          posRef.current = p
          setPos(p)
          if (t < 1) {
            rafRef.current = requestAnimationFrame(tick)
          } else {
            posRef.current = target
            setPos(target)
            setSpeed(0)
            sound.stop(pitch)
            resolve(words[mod(target, words.length)])
          }
        }
        rafRef.current = requestAnimationFrame(tick)
      })
    },
    current: () => words[mod(Math.round(posRef.current), words.length)],
  }))

  // Motion blur + vertical ghosting scale with speed.
  const blur = Math.min(speed * 60, 5)
  const ghost = Math.min(speed * 260, 26)
  const glow = 'rgba(160, 200, 255, 0.85)'
  const textShadow =
    ghost > 0.5
      ? `0 ${-ghost}px 2px rgba(160,200,255,.35), 0 ${-ghost / 2}px 1px rgba(160,200,255,.55), 0 ${ghost / 2}px 1px rgba(160,200,255,.55), 0 ${ghost}px 2px rgba(160,200,255,.35), 0 0 18px ${glow}`
      : `0 0 18px ${glow}`

  const base = Math.floor(pos)
  const items = []
  for (let i = base - 2; i <= base + 3; i++) {
    const offset = i - pos
    const dist = Math.abs(offset)
    items.push(
      <div
        key={i}
        className="reel-item"
        style={{
          transform: `translateY(${offset * ITEM_H}px) scale(${1 - Math.min(dist, 2) * 0.12})`,
          opacity: Math.max(0, 1 - dist * 0.55),
          filter: `blur(${blur + dist * 1.2}px)`,
          textShadow,
        }}
      >
        {words[mod(i, words.length)]}
      </div>
    )
  }

  return (
    <div className={`reel ${locked ? 'locked' : ''}`}>
      <div className="reel-header">
        <span className="reel-label">{label}</span>
        <button
          className="lock"
          onClick={onToggleLock}
          title={locked ? 'Unlock' : 'Lock this reel'}
          aria-pressed={locked}
        >
          {locked ? '🔒' : '🔓'}
        </button>
      </div>
      <div className="reel-window" style={{ height: ITEM_H * 3 }}>
        {items}
      </div>
    </div>
  )
})

export default Reel
