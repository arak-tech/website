import { spinBoxConfig } from '../lib/config'

type QRCodeClaimProps = {
  onScanned: () => void
}

export function QRCodeClaim({ onScanned }: QRCodeClaimProps) {
  return (
    <div className="qr-claim">
      <img src={spinBoxConfig.qrFaceImage} alt="Scan to claim" width={156} height={156} />
      <h2>SCAN TO CLAIM</h2>
      <button type="button" className="claim-button" onClick={onScanned}>
        Done
      </button>
    </div>
  )
}
