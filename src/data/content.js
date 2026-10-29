// =====================================================================
// The Good Bite — single source of truth.
// Every name, description, number and price below is copied exactly from
// the client's flyer and menu cards. Values marked "DERIVED" are not in the
// source; they were chosen for the website (colours, illustration kinds).
// =====================================================================

export const brand = {
  name: 'The Good Bite',
  tagline: 'HOMEMADE HAPPINESS!',
  kicker: 'PREMIUM EGGLESS CLOUD KITCHEN',
  sub: 'EGGLESS CLOUD KITCHEN — MADE FRESH ON PRE-ORDER',
  note: 'made with love, just for you',
  phone: '9893657007',
  phoneIntl: '919893657007',
  instagram: 'thegood_bite',
  instagramUrl: 'https://instagram.com/thegood_bite',
  location: 'LOCATED NEAR PALDA',
  locationNote: '(Near Scheme No. 140)',
  pickup: 'Pick up available from Gumasta Nagar also',
  preOrderTitle: 'PRE-ORDER ONLY',
  preOrderLines: ['We work on pre-order basis.', 'We make everything fresh on order.'],
  advance: 'Please place your orders 1–2 DAYS IN ADVANCE.',
  contactLine: 'WHATSAPP OR CALL US ON 9893657007',
  placeOrder: 'To Place your order,',
  delivery: 'DELIVERY AVAILABLE VIA RAPIDO / PORTER',
  deliveryNote: '(Extra delivery charges apply)',
  selfPickup: 'SELF PICK-UP ALSO AVAILABLE',
  timingsTitle: 'TIMINGS',
  timings: '11:00 AM – 6:00 PM',
  orderingTitle: 'ORDERING TIMING',
  ordering: 'A DAY PRIOR',
  customisation: 'Options available for Customisation & Gifting',
  trust: ['EGGLESS', 'NO PRESERVATIVES', 'MADE FRESH ON ORDER'],
  thanks: 'Thank you for supporting a small business ♡',
};

// The four badges printed on every menu card. `icon` picks the line icon.
export const badges = [
  { id: 'eggless', icon: 'leaf', lines: ['100%', 'EGGLESS'] },
  { id: 'butter', icon: 'butter', lines: ['MADE WITH', 'PURE BUTTER'] },
  { id: 'premix', icon: 'bowl', lines: ['NO', 'PREMIXES'] },
  { id: 'fresh', icon: 'sprout', lines: ['MADE FRESH', 'ON ORDER'] },
];

// priceStyle: how the source menu writes prices for that section.
//   'rs'    -> "Rs 300"   (Brownies, Healthy Desserts, Tresleches, Cookies, Tea Cakes)
//   'rupee' -> "₹600"     (Viral Desserts)
// art: DERIVED illustration kind used for placeholder SVGs / image filenames.
// tint: DERIVED colours for illustrations ({ dough, chunk, chunk2?, filling? }).
export const menu = [
  {
    id: 'brownies',
    title: 'BROWNIES',
    priceStyle: 'rs',
    taglines: ['Made with 100% couverture chocolate (Pack of 4)'],
    groups: [
      {
        id: 'brownies',
        title: null,
        tagline: null,
        art: 'brownie', // DERIVED
        items: [
          { id: 'classic-walnut', name: 'Classic Walnut', price: 300 },
          { id: 'chocolate-loaded', name: 'Chocolate Loaded', price: 350 },
          { id: 'lotus-biscoff-brownie', name: 'Lotus Biscoff', price: 370 },
          { id: 'nutella-hazelnut', name: 'Nutella Hazelnut', price: 350 },
          { id: 'cookie-dough', name: 'Cookie Dough', price: 350 },
          { id: 'assorted-bite-size-box', name: 'Assorted / Bite size Box', price: 380 },
          { id: 'brownie-slab-cake', name: 'Brownie Slab Cake 6"', price: 450 },
          { id: 'assorted-brownie-bites', name: 'Assorted Brownie Bites', price: 380 },
        ],
      },
    ],
  },
  {
    id: 'healthy',
    title: 'HEALTHY DESSERTS',
    priceStyle: 'rs',
    taglines: ['Wholesome treats made with better ingredients'],
    groups: [
      {
        id: 'healthy',
        title: null,
        tagline: null,
        items: [
          {
            id: 'millet-brownies',
            name: 'Millet Brownies',
            note: '(Gluten free & refined sugar free)',
            price: 400,
            art: 'brownie', // DERIVED
          },
          {
            id: 'whole-wheat-jaggery-cake',
            name: 'Whole Wheat & Jaggery Cake',
            price: 380,
            art: 'teacake', // DERIVED
          },
        ],
      },
      {
        id: 'millet-cookies',
        title: 'Millet Cookies:',
        tagline: null,
        art: 'cookie', // DERIVED
        items: [
          { id: 'millet-chocolate-chunk', name: 'Chocolate Chunk', price: 250 },
          { id: 'millet-almond', name: 'Almond', price: 250 },
        ],
      },
    ],
  },
  {
    id: 'tresleches',
    title: 'TRESLECHES',
    priceStyle: 'rs',
    taglines: ['Soft sponge soaked in rich blend of 3 milks & topped with whipped cream'],
    groups: [
      {
        id: 'tresleches',
        title: null,
        tagline: null,
        art: 'tresleches', // DERIVED
        items: [
          { id: 'classic-vanilla', name: 'Classic Vanilla', price: 225 },
          { id: 'alphanso-mango', name: 'Alphanso Mango', price: 250 },
          { id: 'lotus-biscoff-tresleches', name: 'Lotus Biscoff', price: 250 },
          { id: 'rose-falooda', name: 'Rose Falooda', price: 250 },
          { id: 'mango-lotus-biscoff', name: 'Mango with lotus Biscoff', price: 270 },
          { id: 'rasmalai', name: 'Rasmalai', price: 250 },
        ],
      },
    ],
  },
  {
    id: 'cookies',
    title: 'COOKIES',
    priceStyle: 'rs',
    taglines: [],
    groups: [
      {
        id: 'crunchy',
        title: 'CRUNCHY COOKIES',
        tagline: 'Pack of 8 cookies (250 Gms)',
        art: 'cookie', // DERIVED
        items: [
          {
            id: 'classic-chocolate-chunk',
            name: 'Classic Chocolate Chunk',
            price: 200,
            tint: { dough: '#D9A25A', chunk: '#4B2E1F' }, // DERIVED
          },
          {
            id: 'oats-and-cranberry',
            name: 'Oats and Cranberry',
            price: 200,
            tint: { dough: '#D7AA6C', chunk: '#A8323E', chunk2: '#EADBB8' }, // DERIVED
          },
          {
            id: 'coconut-honey-oats',
            name: 'Coconut , Honey & Oats',
            price: 200,
            tint: { dough: '#DDB070', chunk: '#F6EEDC', chunk2: '#C98A2E' }, // DERIVED
          },
          {
            id: 'double-chocolate',
            name: 'Double Chocolate',
            price: 200,
            tint: { dough: '#6B4430', chunk: '#2A170D' }, // DERIVED
          },
        ],
      },
      {
        id: 'soft-baked',
        title: 'SOFT BAKED COOKIES',
        tagline: 'Giant New York style cookie (Pack of 4 pcs)',
        art: 'cookie-soft', // DERIVED
        items: [
          {
            id: 'belgian-chocolate',
            name: 'Belgian Chocolate',
            price: 240,
            tint: { dough: '#C98A45', chunk: '#3A2216' }, // DERIVED
          },
          {
            id: 'nutella-center-filled',
            name: 'Nutella Center Filled',
            price: 320,
            centerFilled: true,
            tint: { dough: '#C98A45', chunk: '#4B2E1F', filling: '#5A3420' }, // DERIVED
          },
          {
            id: 'lotus-biscoff-center-filled',
            name: 'Lotus Biscoff Center Filled',
            price: 320,
            centerFilled: true,
            tint: { dough: '#CF9550', chunk: '#9E5F25', filling: '#C4843E' }, // DERIVED
          },
          {
            id: 'pistachio-dark-chocolate',
            name: 'Pistachio Dark Chocolate',
            price: 280,
            tint: { dough: '#C98A45', chunk: '#2F1B10', chunk2: '#86A456' }, // DERIVED
          },
          {
            id: 'brown-butter-belgian-chocolate',
            name: 'Brown Butter Belgian Chocolate',
            price: 280,
            tint: { dough: '#B0743A', chunk: '#3A2216' }, // DERIVED
          },
        ],
      },
      {
        id: 'biscottis',
        title: 'BISCOTTIS',
        tagline: 'Twice baked Italian cookies (200 Gms)',
        art: 'biscotti', // DERIVED
        items: [
          {
            id: 'biscotti-almond',
            name: 'Almond',
            price: 250,
            tint: { dough: '#DDB27A', chunk: '#B98A58', chunk2: '#F2E2C4' }, // DERIVED
          },
          {
            id: 'pistachio-cranberry',
            name: 'Pistachio Cranberry',
            price: 250,
            tint: { dough: '#E0B87F', chunk: '#86A456', chunk2: '#A8323E' }, // DERIVED
          },
          {
            id: 'chocolate-walnut',
            name: 'Chocolate Walnut',
            price: 250,
            tint: { dough: '#8A5A3B', chunk: '#C49A6C', chunk2: '#2F1B10' }, // DERIVED
          },
        ],
      },
    ],
  },
  {
    id: 'teacakes',
    title: 'TEA CAKES',
    priceStyle: 'rs',
    taglines: ['Gourmet Tea Cakes', 'Net wt - 500-600gms'],
    groups: [
      {
        id: 'teacakes',
        title: null,
        tagline: null,
        art: 'teacake', // DERIVED
        items: [
          { id: 'butter-chocolate-chip-cake-tea', name: 'Butter Chocolate chip cake', price: 400 },
          { id: 'belgian-chocolate-butter-cake', name: 'Belgian Chocolate Butter Cake', price: 450 },
          { id: 'butter-cake-biscoff-nutella', name: 'Butter Cake with Biscoff & Nutella', price: 450 },
          { id: 'mawa-muse-cake', name: 'Mawa Muse Cake', price: 420 },
          { id: 'orange-chocolate-cake', name: 'Orange Chocolate Cake', price: 500 },
          { id: 'carrot-cake-cream-cheese', name: 'Carrot cake with cream cheese', price: 500 },
          { id: 'coffee-walnut-cake', name: 'Coffee Walnut Cake', price: 420 },
          { id: 'almond-cake', name: 'Almond Cake', price: 450 },
          {
            id: 'whole-wheat-jaggery-almond-crumble',
            name: 'Whole wheat jaggery cake with Almond Crumble',
            price: 380,
          },
        ],
      },
    ],
  },
  {
    id: 'viral',
    title: 'VIRAL DESSERTS',
    priceStyle: 'rupee',
    taglines: [],
    groups: [
      {
        id: 'cookie-tin',
        title: 'COOKIE TIN',
        titleNote: '(450 gms)',
        tagline: null,
        art: 'tin', // DERIVED
        items: [
          { id: 'tin-belgian-chocolate', name: 'Belgian Chocolate', price: 600 },
          { id: 'tin-nutella-sea-salt', name: 'Nutella Sea Salt', price: 600 },
          { id: 'tin-double-chocolate', name: 'Double Chocolate', price: 600 },
          { id: 'tin-brownie-cookie', name: 'Brownie Cookie', price: 700 },
        ],
      },
      {
        id: 'london',
        title: "LONDON'S VIRAL DESSERTS",
        tagline: null,
        art: 'tub', // DERIVED
        items: [
          {
            id: 'london-chocolate-caramel-cake-tub',
            name: 'London Chocolate Caramel Cake Tub',
            note: '(250 gms)',
            price: 360,
          },
          { id: 'espresso-crumble-dessert-tub', name: 'Espresso Crumble Dessert Tub', price: 300 },
        ],
      },
      {
        id: 'butter-chocolate-chip-cake',
        title: 'BUTTER CHOCOLATE CHIP CAKE',
        tagline: null,
        art: 'loaf', // DERIVED
        items: [
          // The source prints only the group title, weight and price for this line.
          {
            id: 'viral-butter-chocolate-chip-cake',
            name: 'BUTTER CHOCOLATE CHIP CAKE',
            note: '(500 gms)',
            price: 400,
          },
        ],
      },
      {
        id: 'bomboloni',
        title: 'BOMBOLONI',
        tagline: 'Soft Italian doughnuts filled with rich creams',
        fillingsLabel: 'Fillings:',
        fillings: ['Vanilla Custard', 'Nutella Chocolate Ganache', 'Coffee Crème'],
        requiresFilling: true,
        art: 'bomboloni', // DERIVED
        items: [
          { id: 'bomboloni-pack-2', name: 'Pack of 2', price: 300 },
          { id: 'bomboloni-pack-4', name: 'Pack of 4', price: 500 },
        ],
      },
    ],
  },
];

// Order of the filter buttons in Scene 5 (labels are the source section titles).
export const filterOrder = ['cookies', 'brownies', 'tresleches', 'teacakes', 'healthy', 'viral'];

// DERIVED: background tints for the five Viral Desserts panels in Scene 6.
export const viralPanelTints = ['#EFE3CF', '#E9D9C4', '#E4DACB', '#F3E6CC', '#F5E9D6'];

// DERIVED: illustration colours per art kind for menu-card placeholders.
export const artTints = {
  brownie: { dough: '#5A3726', chunk: '#2F1B10' },
  cookie: { dough: '#D9A25A', chunk: '#4B2E1F' },
  'cookie-soft': { dough: '#C98A45', chunk: '#3A2216' },
  biscotti: { dough: '#DDB27A', chunk: '#86A456' },
  tresleches: { dough: '#F1DDB0', chunk: '#FFFDF8' },
  teacake: { dough: '#C98A45', chunk: '#4B2E1F' },
  tin: { dough: '#1F4A2C', chunk: '#D4943F' },
  tub: { dough: '#7A4A2A', chunk: '#D4943F' },
  loaf: { dough: '#D9A25A', chunk: '#3A2216' },
  bomboloni: { dough: '#D9A25A', chunk: '#F6EEDC' },
};

// ---------------------------------------------------------------------
// Derived helpers (computed at runtime so they stay correct if data changes)
// ---------------------------------------------------------------------

// Flat list of every priced line. Each flavour/variant with its own price
// counts once; Bomboloni packs and Millet Cookie flavours count separately;
// look-alike items across sections are NOT merged.
export const allItems = menu.flatMap((section) =>
  section.groups.flatMap((group) =>
    group.items.map((item, index) => ({
      ...item,
      art: item.art ?? group.art,
      sectionId: section.id,
      sectionTitle: section.title,
      priceStyle: section.priceStyle,
      groupId: group.id,
      groupTitle: group.title,
      requiresFilling: !!group.requiresFilling,
      fillings: group.fillings ?? null,
      sourceIndex: index,
    })),
  ),
).map((item, order) => ({ ...item, order }));

export const itemById = Object.fromEntries(allItems.map((i) => [i.id, i]));
export const sectionById = Object.fromEntries(menu.map((s) => [s.id, s]));
export const priceLineCount = allItems.length;

export function formatPrice(priceStyle, value) {
  return priceStyle === 'rupee' ? `₹${value}` : `Rs ${value}`;
}

export function formatTotal(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

export const whatsappNumber = brand.phoneIntl;
export const telHref = `tel:+${brand.phoneIntl}`;
