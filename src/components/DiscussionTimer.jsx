import { useEffect, useRef, useState } from 'react'

const PRESETS = [
  { label: '30s', seconds: 30 },
  { label: '1p', seconds: 60 },
  { label: '2p', seconds: 120 },
  { label: '5p', seconds: 300 },
]

const FLASH_DURATION_MS = 6000

/** Phát 3 tiếng bíp bằng Web Audio API (không cần file âm thanh). */
function playBeep() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 880
      const start = ctx.currentTime + i * 0.45
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(0.4, start + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.4)
    }
    setTimeout(() => ctx.close(), 2000)
  } catch {
    // Trình duyệt chặn âm thanh — bỏ qua, vẫn còn nhấp nháy đỏ.
  }
}

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function DiscussionTimer() {
  const [open, setOpen] = useState(false)
  const [duration, setDuration] = useState(60)
  const [customMinutes, setCustomMinutes] = useState('')
  const [remainingMs, setRemainingMs] = useState(60 * 1000)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)

  const endAtRef = useRef(null)
  const flashTimeoutRef = useRef(null)

  useEffect(() => {
    if (!running) return undefined

    const tick = () => {
      const left = endAtRef.current - Date.now()
      if (left <= 0) {
        setRemainingMs(0)
        setRunning(false)
        setFinished(true)
        playBeep()
        clearTimeout(flashTimeoutRef.current)
        flashTimeoutRef.current = setTimeout(
          () => setFinished(false),
          FLASH_DURATION_MS,
        )
      } else {
        setRemainingMs(left)
      }
    }

    const interval = setInterval(tick, 200)
    tick()
    return () => clearInterval(interval)
  }, [running])

  useEffect(() => () => clearTimeout(flashTimeoutRef.current), [])

  const startWith = (seconds) => {
    clearTimeout(flashTimeoutRef.current)
    setFinished(false)
    setDuration(seconds)
    endAtRef.current = Date.now() + seconds * 1000
    setRemainingMs(seconds * 1000)
    setRunning(true)
  }

  const pause = () => {
    setRemainingMs(Math.max(0, endAtRef.current - Date.now()))
    setRunning(false)
  }

  const resume = () => {
    if (remainingMs <= 0) return
    endAtRef.current = Date.now() + remainingMs
    setRunning(true)
  }

  const reset = () => {
    clearTimeout(flashTimeoutRef.current)
    setFinished(false)
    setRunning(false)
    setRemainingMs(duration * 1000)
  }

  const handleCustomStart = () => {
    const minutes = Number(customMinutes)
    if (!Number.isFinite(minutes) || minutes <= 0 || minutes > 60) {
      window.alert('Nhập số phút từ 1 đến 60.')
      return
    }
    startWith(Math.round(minutes * 60))
  }

  const showCountdown = running || remainingMs < duration * 1000

  return (
    <div
      className={`discussion-timer${open ? ' open' : ''}${
        finished ? ' finished' : ''
      }`}
    >
      {open && (
        <div className="timer-panel" role="dialog" aria-label="Hẹn giờ">
          <div className="timer-display" aria-live="polite">
            {formatTime(remainingMs)}
          </div>

          <div className="timer-presets">
            {PRESETS.map((preset) => (
              <button
                key={preset.seconds}
                type="button"
                className={`ghost-btn small${
                  duration === preset.seconds ? ' active' : ''
                }`}
                onClick={() => startWith(preset.seconds)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="timer-custom">
            <input
              type="number"
              className="timer-custom-input"
              min="1"
              max="60"
              placeholder="Phút"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCustomStart()
              }}
              aria-label="Số phút tùy chọn"
            />
            <button
              type="button"
              className="ghost-btn small"
              onClick={handleCustomStart}
            >
              Bắt đầu
            </button>
          </div>

          <div className="timer-controls">
            {running ? (
              <button type="button" className="ghost-btn small" onClick={pause}>
                Tạm dừng
              </button>
            ) : (
              <button
                type="button"
                className="ghost-btn small"
                onClick={resume}
                disabled={remainingMs <= 0 || !showCountdown}
              >
                Tiếp tục
              </button>
            )}
            <button type="button" className="ghost-btn small" onClick={reset}>
              Đặt lại
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className="timer-toggle-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Hẹn giờ thảo luận"
      >
        <ClockIcon />
        {(running || finished) && (
          <span className="timer-toggle-time">{formatTime(remainingMs)}</span>
        )}
      </button>
    </div>
  )
}
