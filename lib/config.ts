export const spinBoxConfig = {
  /** Yellow “MOBILE ADVERTISING / SCAN ME” graphic used by older screens */
  qrFaceImage: '/qr-face.png',
  whatsappNumber: '0782785682',
  brandLine: 'LED BOX ADS',
  offers: [
    {
      id: 'meal-deal',
      headline: 'FREE CHIPS',
      detail: 'with any burger',
      code: 'BOXCHIPS',
      href: 'https://wa.me/263782785682?text=I%20want%20to%20claim%20FREE%20CHIPS',
      color: '#ffe566',
      accent: '#111111',
    },
    {
      id: 'family-combo',
      headline: '20% OFF',
      detail: 'family combo',
      code: 'FAMILY20',
      href: 'https://wa.me/263782785682?text=I%20want%20to%20claim%2020%25%20OFF',
      color: '#16f4ff',
      accent: '#071315',
    },
    {
      id: 'drink-upgrade',
      headline: 'FREE DRINK',
      detail: 'meal upgrade',
      code: 'DRINKUP',
      href: 'https://wa.me/263782785682?text=I%20want%20to%20claim%20a%20FREE%20DRINK',
      color: '#ff5c8a',
      accent: '#19070d',
    },
    {
      id: 'dessert-bonus',
      headline: 'BUY 1 GET 1',
      detail: 'dessert today',
      code: 'SWEET2',
      href: 'https://wa.me/263782785682?text=I%20want%20to%20claim%20BUY%201%20GET%201',
      color: '#8bff76',
      accent: '#071507',
    },
  ],
}

export type SpinBoxConfig = typeof spinBoxConfig
export type SpinBoxOffer = (typeof spinBoxConfig.offers)[number]
