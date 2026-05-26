export const spinBoxConfig = {
  /** Yellow “MOBILE ADVERTISING / SCAN ME” graphic used by older screens */
  qrFaceImage: '/qr-face.png',
  whatsappNumber: '0782785682',
  brandLine: 'LED BOX ADS',
  offers: [
    {
      id: 'terrific-tuesday',
      brand: 'Pizza Inn',
      brandImage: '/brand-offers/pizza-inn.png',
      headline: 'TERRIFIC TUESDAY',
      detail: 'buy one pizza, get one free',
      code: 'TUESDAY2',
      href: 'https://wa.me/263782785682?text=I%20want%20to%20claim%20Terrific%20Tuesday',
      color: '#ffe566',
      accent: '#681818',
    },
    {
      id: 'chicken-combo',
      brand: 'Chicken Inn',
      brandImage: '/brand-offers/chicken-inn.png',
      headline: 'COMBO DEAL',
      detail: 'chips and drink upgrade',
      code: 'LUVDEAL',
      href: 'https://wa.me/263782785682?text=I%20want%20to%20claim%20the%20Chicken%20Inn%20combo%20deal',
      color: '#ff5c5c',
      accent: '#140707',
    },
    {
      id: 'creamy-treat',
      brand: 'Creamy Inn',
      brandImage: '/brand-offers/creamy-inn.jpg',
      headline: 'SWEET TREAT',
      detail: 'daily ice cream discount',
      code: 'CREAMY',
      href: 'https://wa.me/263782785682?text=I%20want%20to%20claim%20a%20Creamy%20Inn%20deal',
      color: '#16f4ff',
      accent: '#071315',
    },
    {
      id: 'fresh-bake',
      brand: "Baker's Inn",
      brandImage: '/brand-offers/bakers-inn.jpg',
      headline: 'FRESH BAKE',
      detail: 'breakfast and bakery offer',
      code: 'BAKEDAY',
      href: 'https://wa.me/263782785682?text=I%20want%20to%20claim%20a%20Baker%27s%20Inn%20deal',
      color: '#8bff76',
      accent: '#071507',
    },
  ],
}

export type SpinBoxConfig = typeof spinBoxConfig
export type SpinBoxOffer = (typeof spinBoxConfig.offers)[number]
