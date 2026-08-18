import { useEffect, useRef, useState } from 'react'

const PRESETS = [
  { label: '30s', seconds: 30 },
  { label: '1p', seconds: 60 },
  { label: '2p', seconds: 120 },
  { label: '5p', seconds: 300 },
]

const FLASH_DURATION_MS = 6000

/**
 * Mở khoá AudioContext trong một user gesture (tap nút) — bắt buộc trên
 * mobile Safari/Chrome, nếu không âm thanh phát lúc hết giờ sẽ bị chặn
 * im lặng vì không nằm trong user gesture.
 */
function unlockAudioContext(ctxRef) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    if (!ctxRef.current) ctxRef.current = new AudioCtx()
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
  } catch {
    // Bỏ qua nếu trình duyệt không hỗ trợ.
  }
}

const ALARM_BEEP_COUNT = 10
const ALARM_BEEP_INTERVAL_S = 0.5
const ALARM_BEEP_DURATION_S = 0.4

/** Phát chuỗi tiếng cảnh báo dài (~5s) bằng Web Audio API (không cần file âm thanh). */
function playBeep(ctxRef) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    if (!ctxRef.current) ctxRef.current = new AudioCtx()
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') ctx.resume()
    for (let i = 0; i < ALARM_BEEP_COUNT; i++) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      // Xen kẽ 2 tần số để nghe rõ là báo động, không lẫn với tiếng khác.
      osc.frequency.value = i % 2 === 0 ? 880 : 660
      const start = ctx.currentTime + i * ALARM_BEEP_INTERVAL_S
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(0.4, start + 0.02)
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        start + ALARM_BEEP_DURATION_S,
      )
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + ALARM_BEEP_DURATION_S)
    }
  } catch {
    // Trình duyệt chặn âm thanh — bỏ qua, vẫn còn nhấp nháy đỏ.
  }
}

/** Giữ màn hình sáng trong lúc đếm ngược — chỉ có tác dụng nếu người
 * dùng không tự tay khóa máy; không giúp phát âm thanh khi màn hình tắt. */
async function acquireWakeLock(wakeLockRef) {
  try {
    if (!('wakeLock' in navigator)) return
    wakeLockRef.current = await navigator.wakeLock.request('screen')
  } catch {
    // Bị từ chối (VD: tab không active) — bỏ qua.
  }
}

function releaseWakeLock(wakeLockRef) {
  wakeLockRef.current?.release().catch(() => {})
  wakeLockRef.current = null
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
  const audioCtxRef = useRef(null)
  const wakeLockRef = useRef(null)

  useEffect(() => {
    if (!running) return undefined

    acquireWakeLock(wakeLockRef)

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        acquireWakeLock(wakeLockRef)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const tick = () => {
      const left = endAtRef.current - Date.now()
      if (left <= 0) {
        setRemainingMs(0)
        setRunning(false)
        setFinished(true)
        releaseWakeLock(wakeLockRef)
        playBeep(audioCtxRef)
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
    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      releaseWakeLock(wakeLockRef)
    }
  }, [running])

  useEffect(
    () => () => {
      clearTimeout(flashTimeoutRef.current)
      audioCtxRef.current?.close()
    },
    [],
  )

  const startWith = (seconds) => {
    unlockAudioContext(audioCtxRef)
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
    unlockAudioContext(audioCtxRef)
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
