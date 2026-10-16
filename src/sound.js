// Tiny synthesized sound effects via the Web Audio API (no audio files needed).

let ctx = null
let muted = false
try {
  muted = localStorage.getItem('buildit:muted') === '1'
} catch {}

const audio = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export const isMuted = () => muted
export const setMuted = (m) => {
  muted = m
  try {
    localStorage.setItem('buildit:muted', m ? '1' : '0')
  } catch {}
}

// Call from a user gesture (click / keypress) so browsers allow audio.
export const unlock = () => {
  if (!muted) audio()
}

const blip = ({ freq, endFreq = freq, type = 'square', dur = 0.04, vol = 0.08, delay = 0 }) => {
  if (muted) return
  const a = audio()
  const t = a.currentTime + delay
  const osc = a.createOscillator()
  const gain = a.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur)
  gain.gain.setValueAtTime(vol, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(gain).connect(a.destination)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

// Short click as a word passes the center line. `pitch` lets each reel sound slightly different.
export const tick = (pitch = 1) =>
  blip({ freq: 1800 * pitch, endFreq: 900 * pitch, type: 'triangle', dur: 0.03, vol: 0.06 })

// Reel lands.
export const stop = (pitch = 1) =>
  blip({ freq: 220 * pitch, endFreq: 90 * pitch, type: 'sine', dur: 0.18, vol: 0.25 })

// Both reels done: a quick rising arpeggio.
export const win = () => {
  ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
    blip({ freq: f, type: 'triangle', dur: 0.22, vol: 0.09, delay: i * 0.07 })
  )
}

// Timer finished.
export const alarm = () => {
  for (let i = 0; i < 3; i++) {
    blip({ freq: 880, type: 'sine', dur: 0.25, vol: 0.2, delay: i * 0.4 })
    blip({ freq: 1320, type: 'sine', dur: 0.25, vol: 0.12, delay: i * 0.4 + 0.12 })
  }
}
