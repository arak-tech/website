import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { SpinBoxOffer } from '../../lib/config'

type QrImageFaceProps = {
  offer: SpinBoxOffer
  isWinner?: boolean
}

export function QrImageFace({ offer, isWinner = false }: QrImageFaceProps) {
  return (
    <div
      className={`qr-image-face${isWinner ? ' qr-image-face-winner' : ''}`}
      style={{ '--offer-color': offer.color, '--offer-accent': offer.accent } as CSSProperties}
    >
      <div className="qr-screen-inner">
        <span className="qr-video-overlay" aria-hidden />
        <span className="offer-brand-lockup">
          <Image
            src={offer.brandImage}
            alt={`${offer.brand} logo`}
            width={96}
            height={54}
            className="offer-face-logo"
          />
          <span>{offer.brand}</span>
        </span>
        <span className="offer-kicker">DAILY OFFER</span>
        <strong>{offer.headline}</strong>
        <span>{offer.detail}</span>
        <small>{offer.code}</small>
      </div>
    </div>
  )
}
