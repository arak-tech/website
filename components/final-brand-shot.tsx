import { spinBoxConfig } from '../lib/config'

export function FinalBrandShot() {
  return (
    <div className="brand-shot">
      <h2>{spinBoxConfig.brandLine}</h2>
      <p>Be seen. Get scans.</p>
      <a
        className="whatsapp-cta"
        href={`https://wa.me/${spinBoxConfig.whatsappNumber.replace(/^0/, '263')}`}
      >
        Get your LED box
      </a>
    </div>
  )
}
