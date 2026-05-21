import { QRCodeSVG } from 'qrcode.react'
import type { CSSProperties } from 'react'
import type { SpinBoxOffer } from '../../lib/config'

type QrImageFaceProps = {
  offer: SpinBoxOffer
  showQr?: boolean
  isWinner?: boolean
}

export function QrImageFace({ offer, showQr = false, isWinner = false }: QrImageFaceProps) {
  return (
    <div
      className={`qr-image-face${isWinner ? ' qr-image-face-winner' : ''}`}
      style={{ '--offer-color': offer.color, '--offer-accent': offer.accent } as CSSProperties}
    >
      <div className="qr-screen-inner">
        <span className="qr-video-overlay" aria-hidden />
        <span className="offer-kicker">DELIVERY DEAL</span>
        <strong>{offer.headline}</strong>
        <span>{offer.detail}</span>
        {showQr && (
          <div className="offer-qr-wrap">
            <QRCodeSVG value={offer.href} size={80} level="M" />
          </div>
        )}
        <small>{offer.code}</small>
      </div>
    </div>
  )
}
