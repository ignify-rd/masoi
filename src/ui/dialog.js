// Popup thay cho window.alert / confirm / prompt.
// Safari đôi khi chặn hoặc lỗi các hộp thoại gốc, nên tự dựng popup DOM.

import { getActiveLocale } from '../i18n/index.js'
import './dialog.css'

let activeCleanup = null

function buildOverlay() {
  const overlay = document.createElement('div')
  overlay.className = 'app-dialog-overlay'

  const box = document.createElement('div')
  box.className = 'app-dialog'
  box.setAttribute('role', 'dialog')
  box.setAttribute('aria-modal', 'true')

  overlay.appendChild(box)
  return { overlay, box }
}

function openDialog({ message, showCancel, prompt, defaultValue, okLabel }) {
  return new Promise((resolve) => {
    // Đóng popup đang mở (nếu có) trước khi mở popup mới.
    if (activeCleanup) activeCleanup()

    const { overlay, box } = buildOverlay()
    const { t } = getActiveLocale()

    const text = document.createElement('p')
    text.className = 'app-dialog-message'
    text.textContent = message == null ? '' : String(message)
    box.appendChild(text)

    let input = null
    if (prompt) {
      input = document.createElement('input')
      input.type = 'text'
      input.className = 'app-dialog-input'
      input.value = defaultValue == null ? '' : String(defaultValue)
      box.appendChild(input)
    }

    const actions = document.createElement('div')
    actions.className = 'app-dialog-actions'

    const okBtn = document.createElement('button')
    okBtn.type = 'button'
    okBtn.className = 'app-dialog-btn primary'
    okBtn.textContent = okLabel || t('common.ok')

    let cancelBtn = null
    if (showCancel) {
      cancelBtn = document.createElement('button')
      cancelBtn.type = 'button'
      cancelBtn.className = 'app-dialog-btn'
      cancelBtn.textContent = t('common.cancel')
      actions.appendChild(cancelBtn)
    }
    actions.appendChild(okBtn)
    box.appendChild(actions)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.appendChild(overlay)

    let done = false
    const finish = (value) => {
      if (done) return
      done = true
      cleanup()
      resolve(value)
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        finish(prompt ? null : showCancel ? false : true)
      } else if (e.key === 'Enter' && (prompt || !showCancel || document.activeElement === okBtn)) {
        e.preventDefault()
        confirmOk()
      }
    }

    function confirmOk() {
      if (prompt) finish(input.value)
      else finish(true)
    }

    function cleanup() {
      document.removeEventListener('keydown', onKeyDown, true)
      overlay.remove()
      document.body.style.overflow = prevOverflow
      if (activeCleanup === cleanup) activeCleanup = null
    }
    activeCleanup = cleanup

    okBtn.addEventListener('click', confirmOk)
    if (cancelBtn) cancelBtn.addEventListener('click', () => finish(false))
    overlay.addEventListener('mousedown', (e) => {
      if (e.target === overlay) finish(prompt ? null : showCancel ? false : true)
    })
    document.addEventListener('keydown', onKeyDown, true)

    ;(input || okBtn).focus()
    if (input) input.select()
  })
}

export function showAlert(message) {
  return openDialog({ message, showCancel: false })
}

export function showConfirm(message) {
  return openDialog({ message, showCancel: true })
}

export function showPrompt(message, defaultValue = '') {
  return openDialog({ message, showCancel: true, prompt: true, defaultValue })
}
