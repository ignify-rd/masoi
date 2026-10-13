import { balanceTone } from '../data/balance.js'
import { formatValue } from '../ui/format.js'
import './BalanceMeter.css'

const MAX = 20 // giới hạn hiển thị của thanh cân bằng

const VERDICT_TEXT = {
  village: 'Lợi cho Dân làng',
  werewolf: 'Lợi cho Sói / Ma cà rồng',
  balanced: 'Cân bằng tốt',
}

export default function BalanceMeter({ total }) {
  const clamped = Math.max(-MAX, Math.min(MAX, total))
  const percent = ((clamped + MAX) / (2 * MAX)) * 100

  const tone = balanceTone(total)

  return (
    <div className="balance">
      <div className="balance-head">
        <span className="muted">Điểm cân bằng</span>
        <span className={`balance-total ${tone}`}>
          {formatValue(total)}
        </span>
      </div>

      <div className="balance-track">
        <div className="balance-center" />
        <div
          className="balance-marker"
          style={{ left: `${percent}%` }}
          title={`Tổng: ${total}`}
        />
      </div>

      <div className="balance-legend">
        <span>Sói</span>
        <span className={`verdict ${tone}`}>{VERDICT_TEXT[tone]}</span>
        <span>Dân làng</span>
      </div>

      <p className="balance-hint">
        Mục tiêu: tổng gần 0. Nhóm mới/lạ người nên để +1 đến +3; nhóm đã quen
        chơi nên để -1 đến -3 cho Sói có lợi thế.
      </p>
    </div>
  )
}
