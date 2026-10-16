import { balanceTone } from '../data/balance.js'
import { useI18n } from '../i18n/useI18n.js'
import { formatValue } from '../ui/format.js'
import './BalanceMeter.css'

const MAX = 20 // giới hạn hiển thị của thanh cân bằng

export default function BalanceMeter({ total }) {
  const { t } = useI18n()
  const clamped = Math.max(-MAX, Math.min(MAX, total))
  const percent = ((clamped + MAX) / (2 * MAX)) * 100

  const tone = balanceTone(total)

  return (
    <div className="balance">
      <div className="balance-head">
        <span className="muted">{t('common.balancePoints')}</span>
        <span className={`balance-total ${tone}`}>
          {formatValue(total)}
        </span>
      </div>

      <div className="balance-track">
        <div className="balance-center" />
        <div
          className="balance-marker"
          style={{ left: `${percent}%` }}
          title={t('balance.total', { total })}
        />
      </div>

      <div className="balance-legend">
        <span>{t('balance.wolves')}</span>
        <span className={`verdict ${tone}`}>{t(`balance.verdict.${tone}`)}</span>
        <span>{t('balance.village')}</span>
      </div>

      <p className="balance-hint">{t('balance.hint')}</p>
    </div>
  )
}
