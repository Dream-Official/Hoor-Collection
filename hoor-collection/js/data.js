// ============================================================
// HOOR COLLECTION — PRODUCT DATABASE
// ============================================================

const PRODUCTS = [
  {
    id: 'dress-1',
    slug: 'premium-viscose-kaftan-ethnic',
    sku: 'HOOR-PVKE-001',
    title: 'Premium Viscose Kaftan',
    subtitle: 'Ethnic-Inspired Edition',
    shortDescription: 'Inspired by Ethnic — Pure Viscose with Heavy Embroidered work and Premium Appliqué detailing.',
    description: 'A stunning masterpiece inspired by the finest Ethnic silhouettes, this Premium Viscose Kaftan is crafted from luxuriously soft Pure Viscose fabric. The piece features heavy embroidery throughout with Premium Appliqué work that adds dimension and richness to every detail. Ready to deliver — the perfect statement piece for formal gatherings, festive occasions, or elegant evenings.',
    category: 'Formal',
    subcategory: 'Kaftans',
    tags: ['New Arrival', 'Viscose', 'Embroidered', 'Kaftan', 'Formal'],
    badge: 'NEW',
    featured: true,
    newArrival: true,
    bestseller: false,
    available: true,
    price: { pkr: 15990, usd: 58, aed: 212, gbp: 46 },
    fabric: { primary: 'Pure Viscose', texture: 'Soft, Flowing', weight: 'medium', origin: 'Pakistan', care: ['Dry clean recommended', 'Iron on medium heat', 'Store folded in cool dry place'] },
    work: { type: 'Embroidered', technique: 'Machine embroidery with hand-finished appliqué', materials: ['Premium embroidery thread', 'Appliqué fabric panels'] },
    stitching: { available: ['ready-to-wear', 'custom'], sizes: ['S', 'M', 'L', 'XL'], customMeasurements: true, readyToWearPriceAdjustment: 0, customPriceAdjustment: 1500 },
    images: [
      { src: 'images/products/dress-1/img-1.jpg', alt: 'Premium Viscose Kaftan - Front View', isPrimary: true },
      { src: 'images/products/dress-1/img-2.jpg', alt: 'Premium Viscose Kaftan - Side View' },
      { src: 'images/products/dress-1/img-3.jpg', alt: 'Premium Viscose Kaftan - Detail View' },
      { src: 'images/products/dress-1/img-4.jpg', alt: 'Premium Viscose Kaftan - Embroidery Detail' },
      { src: 'images/products/dress-1/img-5.jpg', alt: 'Premium Viscose Kaftan - Full Length' },
      { src: 'images/products/dress-1/img-6.jpg', alt: 'Premium Viscose Kaftan - Appliqué Work' },
    ],
    relatedIds: ['dress-4', 'dress-2'],
    reviews: [
      { name: 'Dr. Maryam H.', location: 'Manchester, UK', rating: 5, date: '2 weeks ago', verified: true, title: 'Unmatched elegance & fluid drape', comment: 'The pure viscose texture is celestial. The appliqué work looks like museum-level couture.' },
      { name: 'Sana R.', location: 'Lahore, Pakistan', rating: 5, date: '1 month ago', verified: true, title: 'Perfect festive silhouette', comment: 'Received countless compliments at a family wedding. The sizing is exact and comfortable.' }
    ],
  },
  {
    id: 'dress-2',
    slug: 'premium-raw-silk-2pc-kaftan-trouser',
    sku: 'HOOR-RSKT-002',
    title: 'Raw Silk 2PC Set',
    subtitle: 'Kaftan & Matching Trouser',
    shortDescription: 'Premium Quality Raw Silk — Elegant Kaftan Style with Matching Trouser Included. Length 52 inches.',
    description: 'An exquisite two-piece ensemble in Premium Raw Silk, this set features an elegant Kaftan-style shirt with a matching Raw Silk trouser for a perfectly coordinated, refined look. The fabric drapes beautifully and has that signature Raw Silk texture that speaks of understated luxury. At 52 inches in length, this is a sophisticated full-length silhouette that commands attention in any setting.',
    category: 'Formal',
    subcategory: '2-Piece Sets',
    tags: ['New Arrival', 'Raw Silk', 'Kaftan', '2PC', 'Formal'],
    badge: 'NEW',
    featured: false,
    newArrival: true,
    bestseller: false,
    available: true,
    price: { pkr: 12990, usd: 47, aed: 172, gbp: 37 },
    fabric: { primary: 'Premium Raw Silk', texture: 'Structured, Matte Sheen', weight: 'medium', origin: 'Pakistan', care: ['Dry clean only', 'Steam iron on low', 'Hang to store'] },
    work: { type: 'Plain Elegance', technique: 'Clean cut & make with premium finishing', materials: ['Premium raw silk fabric', 'Satin lining'] },
    stitching: { available: ['ready-to-wear', 'custom'], sizes: ['S', 'M', 'L', 'XL'], customMeasurements: true, readyToWearPriceAdjustment: 0, customPriceAdjustment: 1500 },
    video: 'images/products/dress-2/video.mp4',
    images: [
      { src: 'images/products/dress-2/img-1.jpg', alt: 'Raw Silk 2PC Set - Front View', isPrimary: true },
      { src: 'images/products/dress-2/img-2.jpg', alt: 'Raw Silk 2PC Set - Detail' },
      { src: 'images/products/dress-2/img-3.jpg', alt: 'Raw Silk 2PC Set - Side View' },
      { src: 'images/products/dress-2/img-4.jpg', alt: 'Raw Silk 2PC Set - Full Length' },
    ],
    relatedIds: ['dress-1', 'dress-3'],
    reviews: [
      { name: 'Ayesha B.', location: 'Dubai, UAE', rating: 5, date: '3 weeks ago', verified: true, title: 'Pure raw silk perfection', comment: 'Minimalist luxury at its finest. The 52-inch length drapes gracefully.' },
      { name: 'Nida M.', location: 'Karachi, Pakistan', rating: 5, date: 'Last month', verified: true, title: 'Incredible tailoring', comment: 'The matching raw silk trouser has flawless fall and stitching.' }
    ],
  },
  {
    id: 'dress-3',
    slug: 'viscose-long-shirt-plazo-2pc',
    sku: 'HOOR-VLSP-003',
    title: 'Viscose Long Shirt & Plazo',
    subtitle: '2PC Embroidered Ensemble',
    shortDescription: 'Pure Viscose long shirt with heavy front, sleeves & trouser embroidery, finished with Premium Appliqué. Includes embroidered Raw Silk Plazo.',
    description: 'This elegant two-piece outfit showcases the finest craftsmanship in every thread. The Pure Viscose long shirt features heavy embroidery across the front panel, sleeves, and trouser hem, all finished with Premium Appliqué work for a rich, multi-dimensional texture. Paired with an Embroidered Raw Silk Plazo, this ensemble offers an ideal blend of traditional artistry and contemporary silhouette — perfect for formal gatherings and festive events.',
    category: 'Semi-Formal',
    subcategory: '2-Piece Sets',
    tags: ['New Arrival', 'Viscose', 'Embroidered', 'Plazo', '2PC', 'Appliqué'],
    badge: 'NEW',
    featured: true,
    newArrival: true,
    bestseller: false,
    available: true,
    price: { pkr: 14990, usd: 54, aed: 199, gbp: 43 },
    fabric: { primary: 'Pure Viscose', secondary: 'Raw Silk Plazo', texture: 'Soft drape with rich embroidery', weight: 'medium', origin: 'Pakistan', care: ['Dry clean recommended', 'Iron on medium heat', 'Store carefully to preserve embroidery'] },
    work: { type: 'Heavy Embroidered + Appliqué', technique: 'Machine embroidery with hand-finished appliqué', materials: ['Premium embroidery thread', 'Appliqué panels', 'Decorative trims'] },
    stitching: { available: ['ready-to-wear', 'custom'], sizes: ['S', 'M', 'L', 'XL'], customMeasurements: true, readyToWearPriceAdjustment: 0, customPriceAdjustment: 1500 },
    video: 'images/products/dress-3/video.mp4',
    images: [
      { src: 'images/products/dress-3/img-1.jpg', alt: 'Viscose Long Shirt & Plazo - Front', isPrimary: true },
      { src: 'images/products/dress-3/img-2.jpg', alt: 'Viscose Long Shirt & Plazo - Side' },
      { src: 'images/products/dress-3/img-3.jpg', alt: 'Viscose Long Shirt & Plazo - Embroidery Detail' },
      { src: 'images/products/dress-3/img-4.jpg', alt: 'Viscose Long Shirt & Plazo - Appliqué' },
      { src: 'images/products/dress-3/img-5.jpg', alt: 'Viscose Long Shirt & Plazo - Full Length' },
    ],
    relatedIds: ['dress-2', 'dress-4'],
    reviews: [
      { name: 'Farah Q.', location: 'London, UK', rating: 5, date: '2 weeks ago', verified: true, title: 'Stunning embroidered plazo', comment: 'The combination of viscose shirt and raw silk embroidered plazo is breathtaking.' },
      { name: 'Hira S.', location: 'Islamabad, Pakistan', rating: 5, date: '3 weeks ago', verified: true, title: 'Appliqué work is exquisite', comment: 'Even more beautiful in person than in the runway video.' }
    ],
  },
  {
    id: 'dress-4',
    slug: 'premium-viscose-kaftan-collection',
    sku: 'HOOR-PVKC-004',
    title: 'Premium Viscose Kaftan',
    subtitle: 'Heavy Embroidered Signature',
    shortDescription: 'Inspired by Ethnic — Pure Viscose Kaftan with Heavy Embroidery and Premium Appliqué Work. Sizes S, M, L, XL.',
    description: 'Our signature Premium Viscose Kaftan draws inspiration from the rich heritage of Ethnic couture. Crafted from the finest Pure Viscose fabric, this Kaftan features an elaborate heavy embroidery pattern complemented by exquisite Premium Appliqué work throughout. The fluid silhouette flatters every form, while the meticulous craftsmanship ensures that every detail speaks of luxury and care. An essential piece for the discerning woman of style.',
    category: 'Formal',
    subcategory: 'Kaftans',
    tags: ['New Arrival', 'Viscose', 'Embroidered', 'Kaftan', 'Appliqué', 'Bestseller'],
    badge: 'BESTSELLER',
    featured: true,
    newArrival: true,
    bestseller: true,
    available: true,
    price: { pkr: 15990, usd: 58, aed: 212, gbp: 46 },
    fabric: { primary: 'Pure Viscose', texture: 'Soft, Flowing, Luxurious', weight: 'medium', origin: 'Pakistan', care: ['Dry clean recommended', 'Iron on medium heat', 'Hang to preserve shape'] },
    work: { type: 'Heavy Embroidered + Appliqué', technique: 'Intricate machine embroidery with hand-finished appliqué work', materials: ['Premium embroidery thread', 'Appliqué panels', 'Decorative sequins'] },
    stitching: { available: ['ready-to-wear', 'custom'], sizes: ['S', 'M', 'L', 'XL'], customMeasurements: true, readyToWearPriceAdjustment: 0, customPriceAdjustment: 1500 },
    video: 'images/products/dress-4/video.mp4',
    images: [
      { src: 'images/products/dress-4/img-1.jpg', alt: 'Premium Viscose Kaftan - Front View', isPrimary: true },
      { src: 'images/products/dress-4/img-2.jpg', alt: 'Premium Viscose Kaftan - Side View' },
      { src: 'images/products/dress-4/img-3.jpg', alt: 'Premium Viscose Kaftan - Back View' },
      { src: 'images/products/dress-4/img-4.jpg', alt: 'Premium Viscose Kaftan - Detail' },
      { src: 'images/products/dress-4/img-5.jpg', alt: 'Premium Viscose Kaftan - Embroidery' },
      { src: 'images/products/dress-4/img-6.jpg', alt: 'Premium Viscose Kaftan - Appliqué' },
      { src: 'images/products/dress-4/img-7.jpg', alt: 'Premium Viscose Kaftan - Close-up' },
      { src: 'images/products/dress-4/img-8.jpg', alt: 'Premium Viscose Kaftan - Model Shot' },
      { src: 'images/products/dress-4/img-9.jpg', alt: 'Premium Viscose Kaftan - Side Drape' },
      { src: 'images/products/dress-4/img-10.jpg', alt: 'Premium Viscose Kaftan - Neckline Detail' },
      { src: 'images/products/dress-4/img-11.jpg', alt: 'Premium Viscose Kaftan - Border Work' },
      { src: 'images/products/dress-4/img-12.jpg', alt: 'Premium Viscose Kaftan - Sleeve Detail' },
      { src: 'images/products/dress-4/img-13.jpg', alt: 'Premium Viscose Kaftan - Full Ensemble' },
    ],
    relatedIds: ['dress-1', 'dress-5'],
    reviews: [
      { name: 'Zoya K.', location: 'Houston, USA', rating: 5, date: '1 week ago', verified: true, title: 'The gold standard of kaftans', comment: 'The signature heavy appliqué border gives it a royal aura. DHL express arrived in Texas in 4 days.' },
      { name: 'Mahnoor T.', location: 'London, UK', rating: 5, date: '2 weeks ago', verified: true, title: 'True bespoke luxury', comment: 'Custom measurements fit flawlessly. Scented luxury box unboxing was a dream.' }
    ],
  },
  {
    id: 'dress-5',
    slug: 'khuda-baksh-silk-chunnari-3pc',
    sku: 'HOOR-KBSC-005',
    title: 'Khuda Baksh Silk Chunnari',
    subtitle: 'Premium Bridal 3PC Set',
    shortDescription: 'Premium Ready-to-Wear 3PC — Pure Silk Chunnari Shirt with Kora Dabka & Gotta work, Net Embroidered Dupatta, Crushed Silk Sharara.',
    description: 'A breathtaking masterpiece from the prestigious Khuda Baksh Collection, this three-piece bridal ensemble is a celebration of Pakistan\'s finest artisanal traditions. The Shirt is crafted from Pure Silk Chunnari fabric and adorned with Kora Dabka and Gotta work — both traditionally revered techniques that demand extraordinary skill. The Net Dupatta is beautifully embroidered with Gotta & Sequins work, adding ethereal grace. The Crushed Silk Sharara completes this ensemble with timeless elegance. Shirt length: 40–42 inches. Worldwide shipping available.',
    category: 'Bridal',
    subcategory: '3-Piece Bridal',
    tags: ['Bridal', 'Silk', 'Chunnari', 'Kora Dabka', 'Gotta Work', 'Sharara', '3PC', 'Worldwide Shipping'],
    badge: 'BRIDAL',
    featured: true,
    newArrival: true,
    bestseller: false,
    available: true,
    price: { pkr: 31590, usd: 114, aed: 418, gbp: 91 },
    fabric: { primary: 'Pure Silk Chunnari', secondary: 'Net Dupatta + Crushed Silk Sharara', texture: 'Regal, Lustrous Silk with Crushed Texture', weight: 'heavy', origin: 'Pakistan', care: ['Professional dry clean only', 'Store in garment bag', 'Avoid direct sunlight', 'Handle embroidery gently'] },
    work: { type: 'Kora Dabka + Gotta Work', technique: 'Traditional hand embroidery with Kora Dabka and Gotta detailing on silk', materials: ['Kora thread', 'Dabka wire', 'Gotta ribbon', 'Sequins', 'Net fabric for dupatta'], hoursToComplete: 80, artisan: 'Khuda Baksh Atelier' },
    stitching: { available: ['ready-to-wear'], sizes: ['S', 'M', 'XL'], customMeasurements: false, readyToWearPriceAdjustment: 0 },

    images: [
      { src: 'images/products/dress-5/img-1.jpg', alt: 'Khuda Baksh Silk Chunnari 3PC - Front View', isPrimary: true },
      { src: 'images/products/dress-5/img-2.jpg', alt: 'Khuda Baksh Silk Chunnari 3PC - Detail' },
      { src: 'images/products/dress-5/img-3.jpg', alt: 'Khuda Baksh Silk Chunnari 3PC - Full Set' },
    ],
    relatedIds: ['dress-3', 'dress-6', 'dress-8'],
    reviews: [
      { name: 'Amina Al-Thani', location: 'Doha, Qatar', rating: 5, date: '2 weeks ago', verified: true, title: 'Heirloom bridal masterpiece', comment: 'The Kora Dabka and hand Gotta on the Silk Chunnari shirt is extraordinary. The crushed silk sharara is pure majesty.' },
      { name: 'Zahra P.', location: 'Toronto, Canada', rating: 5, date: 'Last month', verified: true, title: 'Royal Pakistani bridal couture', comment: 'Arrived safely in Toronto. The atelier team kept me updated via WhatsApp with photos at every embroidery stage.' }
    ],
  },
  {
    id: 'dress-6',
    slug: 'khudabaksh-swiss-lawn-shadow-work-3pc',
    sku: 'HOOR-KBSL-006',
    title: 'KhudaBaksh Shadow Work Collection',
    subtitle: 'Swiss Lawn & Silk Handmade Chunnari Jacket',
    shortDescription: 'Back in Stock! Premium Swiss Lawn shirt with elegant shadow work, silk jacket with handmade chunnari & gotta work, crinkle chiffon dupatta, and tissue cotton sharara.',
    description: 'An iconic limited-edition creation from the renowned KhudaBaksh Collection. The shirt features premium Swiss Lawn adorned with delicate shadow work embroidery. A silk jacket with handmade chunnari & gotta work elevates the silhouette into royal territory, complemented by a crinkle chiffon dupatta and tissue cotton sharara. Shirt Length: 33/35". Weight: 0.950 kg.',
    category: 'Bridal',
    subcategory: 'Festive Luxury',
    tags: ['KhudaBaksh', 'Swiss Lawn', 'Shadow Work', 'Chunnari', 'Gotta Work', 'Sharara', 'Discount Offer'],
    badge: 'SPECIAL OFFER',
    featured: true,
    newArrival: true,
    bestseller: false,
    available: true,
    price: { pkr: 9990, usd: 36, aed: 132, gbp: 29 },
    fabric: {
      primary: 'Premium Swiss Lawn',
      secondary: 'Silk Jacket + Tissue Cotton Sharara + Crinkle Chiffon Dupatta',
      texture: 'Lightweight, Breathable & Handcrafted',
      weight: 'light-medium',
      origin: 'Pakistan',
      care: ['Dry clean recommended', 'Store carefully away from moisture']
    },
    work: {
      type: 'Shadow Work & Handmade Gotta',
      technique: 'Handmade shadow work embroidery with handmade chunnari appliqué and traditional gotta borders',
      materials: ['Silk jacket fabric', 'Gotta lace', 'Cotton lawn thread']
    },
    stitching: {
      available: ['ready-to-wear'],
      sizes: ['M', 'L', 'XL'],
      customMeasurements: false,
      readyToWearPriceAdjustment: 0
    },
    images: [
      { src: 'images/products/dress-6/img-1.jpg', alt: 'KhudaBaksh Shadow Work Collection - Front View', isPrimary: true },
      { src: 'images/products/dress-6/img-2.jpg', alt: 'KhudaBaksh Shadow Work Collection - Detail' },
      { src: 'images/products/dress-6/img-3.jpg', alt: 'KhudaBaksh Shadow Work Collection - Full Silhouette' }
    ],
    relatedIds: ['dress-5', 'dress-8'],
    reviews: [
      { name: 'Khadija M.', location: 'Lahore, Pakistan', rating: 5, date: '1 week ago', verified: true, title: 'Outstanding quality and value', comment: 'The shadow work is so intricate and the handmade chunnari jacket is stunning. Unbeatable quality at this price point!' }
    ]
  },
  {
    id: 'dress-7',
    slug: 'organza-a-line-viscose-trouser-ensemble',
    sku: 'HOOR-OAVT-007',
    title: 'Organza A-Line Luxury Ensemble',
    subtitle: 'Ready to Wear 3PC Set',
    shortDescription: 'New Collection — Organza A-line shirt (46-48") with Viscose Trouser and matching Organza Dupatta. Sizes S, M, L, XL.',
    description: 'Grace in every contour: this magnificent ensemble features an exquisite A-line shirt crafted in pure gossamer Organza with intricate artisanal embroidery. Paired with a fluid Viscose trouser and embroidered Organza dupatta. Shirt length: 46 to 48 Inches. Weight: 1.250 kg. Available for immediate worldwide delivery.',
    category: 'Formal',
    subcategory: 'A-Line Formals',
    tags: ['New Collection', 'Organza', 'A-Line', 'Viscose', 'Ready to Wear', 'Formal'],
    badge: 'NEW',
    featured: true,
    newArrival: true,
    bestseller: false,
    available: true,
    price: { pkr: 17000, usd: 61, aed: 225, gbp: 49 },
    fabric: {
      primary: 'Pure Organza',
      secondary: 'Viscose Trouser & Organza Dupatta',
      texture: 'Structured Organza with Soft Viscose Bottom',
      weight: 'medium',
      origin: 'Pakistan',
      care: ['Dry clean only', 'Gentle steam only', 'Keep in dust bag']
    },
    work: {
      type: 'Artisanal Embroidery',
      technique: 'Intricate corded embroidery with delicate hand finishing along borders and neckline',
      materials: ['Gold zari thread', 'Silk thread accents', 'Organza substrate']
    },
    stitching: {
      available: ['ready-to-wear', 'custom'],
      sizes: ['S', 'M', 'L', 'XL'],
      customMeasurements: true,
      readyToWearPriceAdjustment: 0,
      customPriceAdjustment: 1500
    },
    images: [
      { src: 'images/products/dress-7/img-1.jpg', alt: 'Organza A-Line Luxury Ensemble - Front', isPrimary: true },
      { src: 'images/products/dress-7/img-2.jpg', alt: 'Organza A-Line Luxury Ensemble - Close-up' },
      { src: 'images/products/dress-7/img-3.jpg', alt: 'Organza A-Line Luxury Ensemble - Complete Outfit' }
    ],
    relatedIds: ['dress-1', 'dress-9'],
    reviews: [
      { name: 'Sahar N.', location: 'Dubai, UAE', rating: 5, date: '3 days ago', verified: true, title: 'Flawless A-Line Silhouette', comment: 'The fall of the organza shirt paired with the fluid viscose trouser is pure sophistication.' }
    ]
  },
  {
    id: 'dress-8',
    slug: 'teal-chiffon-flared-gharara-wedding-3pc',
    sku: 'HOOR-TCFG-008',
    title: 'Teal Chiffon Flared Gharara 3PC',
    subtitle: 'Hoor Wedding & Guest Formal Collection',
    shortDescription: 'Exquisite showstopper in teal chiffon with intricate gold zardozi embroidery, flared Gharara bottom, and matching embroidered dupatta.',
    description: 'This exquisite Wedding/Guest Wear Formal Gharara set is a showstopper in rich teal chiffon. The long shirt boasts intricate gold zardozi embroidery, while the flared Gharara bottom features delicate border work. Complete the look with the matching embroidered chiffon dupatta. Ideal for any grand reception or wedding soirée. Brand: Haseens Official for Hoor Collection.',
    category: 'Bridal',
    subcategory: 'Wedding Guest Couture',
    tags: ['Wedding Collection', 'Teal', 'Chiffon', 'Gharara', 'Zardozi', 'Formal', '3PC'],
    badge: 'ROYAL EDIT',
    featured: true,
    newArrival: true,
    bestseller: true,
    available: true,
    price: { pkr: 20990, usd: 76, aed: 278, gbp: 60 },
    fabric: {
      primary: 'Pure Chiffon',
      secondary: 'Chiffon Gharara & Chiffon Dupatta with Satin Lining',
      texture: 'Fluid, Airy, Heavily Embellished',
      weight: 'heavy',
      origin: 'Pakistan',
      care: ['Strictly dry clean only', 'Avoid hanging on narrow hangers', 'Store folded with tissue paper']
    },
    work: {
      type: 'Gold Zardozi & Resham Embroidery',
      technique: 'Fine zardozi wirework, resham highlights, and border scalloping across front, neckline, and flared gharara panels',
      materials: ['Metallic zardozi coil', 'Gold bullion', 'Micro sequins', 'Silk thread']
    },
    stitching: {
      available: ['ready-to-wear', 'custom'],
      sizes: ['S', 'M', 'L', 'XL'],
      customMeasurements: true,
      readyToWearPriceAdjustment: 0,
      customPriceAdjustment: 1500
    },
    images: [
      { src: 'images/products/dress-8/img-1.jpg', alt: 'Teal Chiffon Flared Gharara - View 1', isPrimary: true },
      { src: 'images/products/dress-8/img-2.jpg', alt: 'Teal Chiffon Flared Gharara - View 2' },
      { src: 'images/products/dress-8/img-3.jpg', alt: 'Teal Chiffon Flared Gharara - View 3' },
      { src: 'images/products/dress-8/img-4.jpg', alt: 'Teal Chiffon Flared Gharara - View 4' },
      { src: 'images/products/dress-8/img-5.jpg', alt: 'Teal Chiffon Flared Gharara - View 5' },
      { src: 'images/products/dress-8/img-6.jpg', alt: 'Teal Chiffon Flared Gharara - View 6' },
      { src: 'images/products/dress-8/img-7.jpg', alt: 'Teal Chiffon Flared Gharara - View 7' },
      { src: 'images/products/dress-8/img-8.jpg', alt: 'Teal Chiffon Flared Gharara - View 8' },
      { src: 'images/products/dress-8/img-9.jpg', alt: 'Teal Chiffon Flared Gharara - View 9' }
    ],
    relatedIds: ['dress-5', 'dress-10'],
    reviews: [
      { name: 'Dr. Fatima A.', location: 'London, UK', rating: 5, date: '4 days ago', verified: true, title: 'Showstopping wedding wear', comment: 'The teal tone in pure chiffon paired with the gold zardozi work made me the center of attention at my sister’s wedding!' }
    ]
  },
  {
    id: 'dress-9',
    slug: 'mauve-silk-charmeuse-flapper-wedding-3pc',
    sku: 'HOOR-MSCF-009',
    title: 'Mauve Silk Charmeuse Flapper 3PC',
    subtitle: 'Women’s Eastern Ready-to-Wear Kurta Set',
    shortDescription: 'Stunning mauve silk charmeuse straight kurta embellished with gold zardozi and sequin embroidery, flapper gharara, and net dupatta.',
    description: 'Crafted from luxurious silk charmeuse in an opulent dusty mauve hue, the straight kurta is embellished with intricate gold zardozi and sequin embroidery. The flapper-style gharara bottom adds a touch of modern flair, while the net dupatta with embroidered scalloped border completes the regal ensemble. Lining attached as shown.',
    category: 'Formal',
    subcategory: 'Wedding Guest Couture',
    tags: ['Wedding Collection', 'Mauve', 'Silk Charmeuse', 'Flapper', 'Zardozi', 'Sequins', '3PC'],
    badge: 'POPULAR',
    featured: true,
    newArrival: true,
    bestseller: false,
    available: true,
    price: { pkr: 19990, usd: 72, aed: 265, gbp: 57 },
    fabric: {
      primary: 'Silk Charmeuse / Shamooz Silk',
      secondary: 'Silk Charmeuse Trouser & Embroidered Net Dupatta',
      texture: 'Glossy Silk Sheen with Heavy Drape',
      weight: 'medium-heavy',
      origin: 'Pakistan',
      care: ['Dry clean only', 'Do not steam directly on embroidery']
    },
    work: {
      type: 'Intricate Gold Zardozi & Sequin',
      technique: 'Intricate needlework with gold tilla, zardozi spirals, and floral sequin sprays',
      materials: ['Gold tilla wire', 'Cut dana beads', 'Gilt sequins', 'Silk charmeuse']
    },
    stitching: {
      available: ['ready-to-wear', 'custom'],
      sizes: ['S', 'M', 'L', 'XL'],
      customMeasurements: true,
      readyToWearPriceAdjustment: 0,
      customPriceAdjustment: 1500
    },
    images: [
      { src: 'images/products/dress-9/img-1.jpg', alt: 'Mauve Silk Charmeuse Flapper - View 1', isPrimary: true },
      { src: 'images/products/dress-9/img-2.jpg', alt: 'Mauve Silk Charmeuse Flapper - View 2' },
      { src: 'images/products/dress-9/img-3.jpg', alt: 'Mauve Silk Charmeuse Flapper - View 3' },
      { src: 'images/products/dress-9/img-4.jpg', alt: 'Mauve Silk Charmeuse Flapper - View 4' },
      { src: 'images/products/dress-9/img-5.jpg', alt: 'Mauve Silk Charmeuse Flapper - View 5' },
      { src: 'images/products/dress-9/img-6.jpg', alt: 'Mauve Silk Charmeuse Flapper - View 6' },
      { src: 'images/products/dress-9/img-7.jpg', alt: 'Mauve Silk Charmeuse Flapper - View 7' },
      { src: 'images/products/dress-9/img-8.jpg', alt: 'Mauve Silk Charmeuse Flapper - View 8' },
      { src: 'images/products/dress-9/img-9.jpg', alt: 'Mauve Silk Charmeuse Flapper - View 9' },
      { src: 'images/products/dress-9/img-10.jpg', alt: 'Mauve Silk Charmeuse Flapper - View 10' }
    ],
    relatedIds: ['dress-8', 'dress-10'],
    reviews: [
      { name: 'Samina K.', location: 'Karachi, Pakistan', rating: 5, date: '1 week ago', verified: true, title: 'Magnificent mauve sheen', comment: 'The silk charmeuse feels like liquid gold on the skin. The cut of the flapper gharara is contemporary and elegant.' }
    ]
  },
  {
    id: 'dress-10',
    slug: 'champagne-shamooz-silk-plazzo-wedding-3pc',
    sku: 'HOOR-CSSP-010',
    title: 'Champagne Shamooz Silk Plazzo 3PC',
    subtitle: 'Bride & Wedding Formal Kurta Set',
    shortDescription: 'Exquisite 3-piece kurta set in champagne shamooz silk with intricate gold zardozi & floral embroidery, matching plazzo, and net dupatta.',
    description: 'This breathtaking 3-piece ensemble in luminous champagne silk features a straight-cut kurta with intricate gold zardozi and floral embroidery. The set includes a matching shamooz plazzo and heavily embroidered net dupatta with scalloped borders. Attached inner lining included for supreme comfort. Elevate your presence at weddings and formal ceremonies.',
    category: 'Bridal',
    subcategory: 'Wedding Couture',
    tags: ['Wedding Outfits', 'Champagne', 'Shamooz Silk', 'Plazzo', 'Zardozi', 'Floral Embroidery', '3PC'],
    badge: 'EXCLUSIVE',
    featured: true,
    newArrival: true,
    bestseller: true,
    available: true,
    price: { pkr: 20990, usd: 76, aed: 278, gbp: 60 },
    fabric: {
      primary: 'Charmuse / Shamooz Silk',
      secondary: 'Shamooz Silk Plazzo & Embroidered Net Dupatta',
      texture: 'Rich Champagne Sheen with Heavenly Texture',
      weight: 'medium-heavy',
      origin: 'Pakistan',
      care: ['Dry clean only', 'Keep in breathable garment cover']
    },
    work: {
      type: 'Gold Zardozi & Floral Threadwork',
      technique: 'Hand-guided zardozi with floral silk bouquets and delicate border patti',
      materials: ['Gold bullion wire', 'Pearl accents', 'Micro sequins', 'Silk threads']
    },
    stitching: {
      available: ['ready-to-wear', 'custom'],
      sizes: ['S', 'M', 'L', 'XL'],
      customMeasurements: true,
      readyToWearPriceAdjustment: 0,
      customPriceAdjustment: 1500
    },
    images: [
      { src: 'images/products/dress-10/img-2.jpg', alt: 'Champagne Shamooz Silk Plazzo - View 2' },
      { src: 'images/products/dress-10/img-3.jpg', alt: 'Champagne Shamooz Silk Plazzo - View 3' },
      { src: 'images/products/dress-10/img-4.jpg', alt: 'Champagne Shamooz Silk Plazzo - View 4' },
      { src: 'images/products/dress-10/img-5.jpg', alt: 'Champagne Shamooz Silk Plazzo - View 5' },
      { src: 'images/products/dress-10/img-6.jpg', alt: 'Champagne Shamooz Silk Plazzo - View 6' },
    ],
    relatedIds: ['dress-8', 'dress-9'],
    reviews: [
      { name: 'Mehwish T.', location: 'Houston, USA', rating: 5, date: '5 days ago', verified: true, title: 'Pure royalty in champagne', comment: 'The champagne shamooz silk catches the ambient light so gorgeously. The intricate zardozi floral work is extraordinary.' }
    ]
  },
];

// Config
const CONFIG = {
  whatsappNumber: '923160010301', // Atelier WhatsApp VIP Concierge
  brandName: 'Hoor Collection',
  currency: { default: 'PKR', available: ['PKR', 'USD', 'AED', 'GBP'] },
  symbols: { PKR: 'Rs.', USD: '$', AED: 'AED', GBP: '£' },
};

// ============================================================
// STATE
// ============================================================
const AppState = {
  currency: 'PKR',
  cart: JSON.parse(localStorage.getItem('hoor-cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('hoor-wishlist') || '[]'),
  filters: { categories: [], fabrics: [], search: '', sort: 'featured' },
  currentPage: 'home',
  currentProduct: null,
};

// ============================================================
// UTILITIES
// ============================================================
function formatPrice(price, currency = AppState.currency) {
  const sym = CONFIG.symbols[currency] || 'Rs.';
  if (currency === 'PKR') return `${sym} ${Number(price).toLocaleString()}`;
  if (currency === 'GBP') return `${sym}${Number(price).toLocaleString()}`;
  if (currency === 'USD') return `${sym}${Number(price).toFixed(0)}`;
  return `${sym} ${Number(price).toFixed(0)}`;
}

function getProductPrice(product, currency = AppState.currency) {
  return product.price[currency.toLowerCase()] || product.price.pkr;
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
}

function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function saveCart() {
  localStorage.setItem('hoor-cart', JSON.stringify(AppState.cart));
}

function saveWishlist() {
  localStorage.setItem('hoor-wishlist', JSON.stringify(AppState.wishlist));
}

function getCartCount() {
  return AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return AppState.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

function getFilteredProducts() {
  let products = [...PRODUCTS];
  const f = AppState.filters;

  if (f.search) {
    const q = f.search.toLowerCase();
    products = products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.fabric.primary.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (f.categories.length) {
    products = products.filter(p => f.categories.includes(p.category));
  }

  if (f.fabrics.length) {
    products = products.filter(p =>
      f.fabrics.some(fab => p.fabric.primary.toLowerCase().includes(fab.toLowerCase()))
    );
  }

  switch (f.sort) {
    case 'newest': products.sort((a, b) => b.newArrival - a.newArrival); break;
    case 'price-low': products.sort((a, b) => a.price.pkr - b.price.pkr); break;
    case 'price-high': products.sort((a, b) => b.price.pkr - a.price.pkr); break;
    case 'popular': products.sort((a, b) => b.bestseller - a.bestseller); break;
    default: products.sort((a, b) => b.featured - a.featured);
  }

  return products;
}

// ============================================================
// WHATSAPP PAYLOAD BUILDER
// ============================================================
function buildWhatsAppMessage({ product, stitchingType, size, quantity, measurements, currency }) {
  const price = getProductPrice(product, currency);
  let totalPrice = price * (quantity || 1);
  if (stitchingType === 'custom') totalPrice += (product.stitching?.customPriceAdjustment || 1500);

  const productTitle = `${product.title}${product.subtitle ? ' — ' + product.subtitle : ''}`;
  const fabricType = product.fabric?.primary || 'Pure Luxury Fabric';
  const workType = product.work?.type || 'Artisanal Embroidery';
  const stitchingLabel = stitchingType === 'ready-to-wear' ? 'Ready to Wear' : stitchingType === 'custom' ? 'Custom Tailoring' : 'Unstitched';
  const sizeLabel = size || (stitchingType === 'custom' ? 'Bespoke Custom' : 'Standard');
  const priceFormatted = formatPrice(totalPrice, currency);

  const lines = [
    '🛍️ *HOOR COLLECTION — NEW ORDER*',
    '━━━━━━━━━━━━━━━━━━━━━━',
    '📦 *PRODUCT DETAILS:*',
    `• Product Name: ${productTitle}`,
    `• SKU: ${product.sku}`,
    `• Fabric: ${fabricType}`,
    `• Work: ${workType}`,
    '👗 *ORDER SPECIFICATIONS:*',
    `• Stitching: ${stitchingLabel}`,
    `• Size: ${sizeLabel}`,
    `• Quantity: ${quantity || 1}`,
    `• Price: ${priceFormatted}`,
    '━━━━━━━━━━━━━━━━━━━━━━',
    '👤 *CUSTOMER INFO:*',
    '• Name: _____________',
    '• Phone: _____________'
  ];

  return lines.join('\n');
}

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
}

// ============================================================
// TOAST SYSTEM
// ============================================================
function showToast({ type = 'info', title, description, duration = 4000 }) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    success: '✓',
    error: '✕',
    info: '✦',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast__icon">${icons[type] || '✦'}</div>
    <div>
      <div class="toast__title">${escapeHtml(title)}</div>
      ${description ? `<div class="toast__desc">${escapeHtml(description)}</div>` : ''}
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, duration);
}

// ============================================================
// CART OPERATIONS
// ============================================================
function addToCart({ product, stitchingType, size, quantity, measurements }) {
  const unitPrice = getProductPrice(product, AppState.currency);
  const key = `${product.id}-${stitchingType}-${size || 'none'}`;

  const existing = AppState.cart.find(i => i.key === key);
  if (existing) {
    existing.quantity += quantity;
  } else {
    AppState.cart.push({ key, productId: product.id, sku: product.sku, title: product.title, image: product.images[0].src, stitchingType, size, quantity, unitPrice, measurements });
  }

  saveCart();
  updateCartBadge();
  showToast({ type: 'success', title: 'Added to Cart', description: `${product.title} has been added to your cart.` });
  renderCartDrawer();
}

function removeFromCart(key) {
  AppState.cart = AppState.cart.filter(i => i.key !== key);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function updateCartQuantity(key, delta) {
  const item = AppState.cart.find(i => i.key === key);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.classList.toggle('visible', count > 0);
  });
}

function renderCartDrawer() {
  const body = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');
  if (!body) return;

  if (AppState.cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin:0 auto 1rem;color:var(--charcoal-300)"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <h3 class="font-serif" style="font-size:1.5rem;color:var(--emerald-900);margin-bottom:.5rem">Your cart is empty</h3>
        <p style="color:var(--charcoal-500);font-size:.875rem;margin-bottom:1.5rem">Discover our exquisite collection</p>
        <button class="btn btn-emerald" onclick="closeCart();navigateTo('listing')">Shop Collection</button>
      </div>`;
    if (footer) footer.innerHTML = '';
    return;
  }

  body.innerHTML = AppState.cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${escapeHtml(item.title)}" class="cart-item__image">
        <div class="cart-item__info">
          <div class="cart-item__title">${escapeHtml(item.title)}</div>
          <div class="cart-item__detail">${item.stitchingType === 'ready-to-wear' ? 'Ready to Wear' : item.stitchingType}${item.size ? ' · Size ' + item.size : ''}</div>
          <div class="cart-item__price">${formatPrice(item.unitPrice * item.quantity)}</div>
          <div class="flex-between" style="margin-top:.5rem">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateCartQuantity('${item.key}',-1)">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity('${item.key}',1)">+</button>
            </div>
            <button onclick="removeFromCart('${item.key}')" style="font-size:.75rem;color:var(--charcoal-500);text-decoration:underline">Remove</button>
          </div>
        </div>
      </div>`;
  }).join('');

  if (footer) {
    const total = getCartTotal();
    const cartItems = AppState.cart;
    footer.innerHTML = `
      <div class="flex-between" style="margin-bottom:1rem">
        <span style="font-size:.9rem;color:var(--charcoal-600)">Subtotal</span>
        <span style="font-weight:700;color:var(--emerald-900)">${formatPrice(total)}</span>
      </div>
      <button class="btn btn-whatsapp btn-full" onclick="checkoutViaWhatsApp()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.017.5 3.918 1.381 5.594L0 24l6.594-1.381A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.214-3.714.779.793-3.671-.232-.371A9.818 9.818 0 1112 21.818z"/></svg>
        Order via WhatsApp
      </button>
      <button class="btn btn-outline btn-full" style="border-color:var(--charcoal-200);color:var(--charcoal-700);margin-top:.5rem" onclick="closeCart()">Continue Shopping</button>`;
  }
}

function checkoutViaWhatsApp() {
  if (!AppState.cart.length) return;
  const lines = ['🛍️ *HOOR COLLECTION — CART ORDER*', ''];
  AppState.cart.forEach((item, i) => {
    lines.push(`*${i+1}. ${item.title}*`);
    lines.push(`   Stitching: ${item.stitchingType}${item.size ? ', Size: '+item.size : ''}`);
    lines.push(`   Qty: ${item.quantity} × ${formatPrice(item.unitPrice)}`);
    lines.push('');
  });
  lines.push(`💰 *Cart Total: ${formatPrice(getCartTotal())}*`);
  lines.push('', '👤 *Customer Details:*', '• Name: ', '• Address: ', '• Phone: ');
  openWhatsApp(lines.join('\n'));
}

// ============================================================
// STARS COMPONENT
// ============================================================
function starsHTML(n = 5) {
  return Array.from({length: 5}, (_, i) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="${i < n ? 'var(--gold-500)' : 'none'}" stroke="var(--gold-400)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('');
}

// ============================================================
// PRODUCT CARD
// ============================================================
function renderProductCard(product) {
  const price = getProductPrice(product);
  const mainImg = product.images[0];
  const hoverImg = product.images[1] || product.images[0];
  const isWishlisted = AppState.wishlist.includes(product.id);

  const badgeMap = {
    'NEW': 'badge-gold',
    'BESTSELLER': 'badge-gold',
    'BRIDAL': 'badge-bridal',
    'SPECIAL OFFER': 'badge-bridal',
    'ROYAL EDIT': 'badge-gold',
    'POPULAR': 'badge-emerald',
    'EXCLUSIVE': 'badge-gold'
  };
  const badgeClass = badgeMap[product.badge] || 'badge-gold';

  const videoHTML = product.video ? `
    <video
      class="product-card__video"
      src="${product.video}"
      muted
      loop
      playsinline
      preload="none"
    ></video>
    <div style="position:absolute;top:1rem;right:1rem;background:rgba(10,10,10,.85);border:1px solid rgba(212,175,55,.5);padding:.25rem .6rem;border-radius:4px;font-size:.65rem;color:#D4AF37;font-weight:700;letter-spacing:.05em;z-index:4">
      ▶ RUNWAY
    </div>
  ` : '';

  return `
    <div class="product-card" data-product-id="${product.id}" data-slug="${product.slug}" onmouseenter="const v=this.querySelector('.product-card__video');if(v)v.play().catch(()=>{})" onmouseleave="const v=this.querySelector('.product-card__video');if(v){v.pause();v.currentTime=0;}">
      <a href="#" onclick="event.preventDefault();navigateTo('product',{slug:'${product.slug}'})" class="product-card__link">
        <div class="product-card__image-wrap">
          <img
            src="${mainImg.src}" 
            alt="${escapeHtml(mainImg.alt)}"
            class="product-card__image"
            loading="lazy"
            onmouseover="if(!'${product.video || ''}')this.src='${hoverImg.src}'"
            onmouseout="if(!'${product.video || ''}')this.src='${mainImg.src}'"
          >
          ${videoHTML}
          <div class="product-card__overlay"></div>

          <div class="product-card__badges">
            ${product.badge ? `<span class="badge ${badgeClass}">${product.badge}</span>` : ''}
          </div>

          <div class="product-card__quick-actions">
            <button class="quick-action-btn" title="Quick View" onclick="event.stopPropagation();event.preventDefault();openQuickView('${product.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="quick-action-btn ${isWishlisted?'is-wishlisted':''}" title="Wishlist" onclick="event.stopPropagation();event.preventDefault();toggleWishlist('${product.id}',this)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </button>
            <button class="quick-action-btn" title="Quick Add" onclick="event.stopPropagation();event.preventDefault();quickAdd('${product.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            </button>
          </div>

          <div class="product-card__price-tag">
            <span class="product-card__price">${formatPrice(price)}</span>
            <div class="product-card__stars">${starsHTML(5)}</div>
          </div>
        </div>

        <div class="product-card__info">
          <h3 class="product-card__title">${escapeHtml(product.title)}</h3>
          <p class="product-card__meta">${escapeHtml(product.fabric.primary)} · ${escapeHtml(product.work.type)}</p>
        </div>
      </a>
    </div>`;
}

function toggleWishlist(productId, btn) {
  const idx = AppState.wishlist.indexOf(productId);
  if (idx === -1) {
    AppState.wishlist.push(productId);
    if (btn) {
      btn.classList.add('is-wishlisted');
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', 'currentColor');
    }
    showToast({ type: 'success', title: 'Added to Wishlist' });
  } else {
    AppState.wishlist.splice(idx, 1);
    if (btn) {
      btn.classList.remove('is-wishlisted');
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', 'none');
    }
    showToast({ type: 'info', title: 'Removed from Wishlist' });
  }
  saveWishlist();
  updateWishlistBadge();
  renderWishlistDrawer();
}

function updateWishlistBadge() {
  const count = AppState.wishlist.length;
  document.querySelectorAll('.wishlist-badge').forEach(el => {
    el.textContent = count;
    el.classList.toggle('visible', count > 0);
  });
}

function openWishlistDrawer() {
  renderWishlistDrawer();
  const drawer = document.getElementById('wishlist-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.add('is-open');
  if (backdrop) backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.remove('is-open');
  if (backdrop && !document.getElementById('cart-drawer')?.classList.contains('is-open')) {
    backdrop.classList.remove('is-open');
  }
  document.body.style.overflow = '';
}

function renderWishlistDrawer() {
  const body = document.getElementById('wishlist-drawer-body');
  const footer = document.getElementById('wishlist-drawer-footer');
  if (!body) return;

  const wishlistedProducts = AppState.wishlist.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (!wishlistedProducts.length) {
    body.innerHTML = `
      <div style="text-align:center;padding:3rem 1rem">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin:0 auto 1rem;color:var(--charcoal-300)"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        <h4 class="font-serif" style="font-size:1.4rem;color:var(--emerald-900);margin-bottom:.5rem">Your Wishlist is empty</h4>
        <p style="color:var(--charcoal-500);font-size:.85rem;margin-bottom:1.5rem">Save your favorite handcrafted creations to review later</p>
        <button class="btn btn-emerald" onclick="closeWishlistDrawer();navigateTo('listing')">Discover Catalog</button>
      </div>`;
    if (footer) footer.innerHTML = '';
    return;
  }

  body.innerHTML = wishlistedProducts.map(p => `
    <div style="display:flex;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--cream-300);align-items:center">
      <img src="${p.images[0].src}" alt="${escapeHtml(p.title)}" style="width:75px;height:95px;object-fit:cover;border-radius:.75rem;flex-shrink:0">
      <div style="flex:1">
        <span class="badge ${p.badge==='BRIDAL'?'badge-bridal':'badge-gold'}" style="font-size:.6rem;padding:.15rem .5rem">${p.category}</span>
        <div style="font-family:var(--font-serif);font-size:1.05rem;color:var(--emerald-900);font-weight:600;margin-top:.25rem">${escapeHtml(p.title)}</div>
        <div style="font-weight:700;color:var(--gold-600);font-size:.9rem;margin:.25rem 0">${formatPrice(getProductPrice(p))}</div>
        <div style="display:flex;gap:.75rem;align-items:center;margin-top:.5rem">
          <button class="btn btn-emerald" style="padding:.3rem .75rem;font-size:.75rem" onclick="quickAdd('${p.id}');closeWishlistDrawer()">Add to Bag</button>
          <button onclick="toggleWishlist('${p.id}')" style="font-size:.75rem;color:var(--charcoal-500);text-decoration:underline">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  if (footer) {
    footer.innerHTML = `
      <button class="btn btn-whatsapp btn-full" onclick="inquireWishlistWhatsApp()">
        Inquire All Wishlist Items on WhatsApp
      </button>
      <button class="btn btn-outline btn-full" style="margin-top:.5rem" onclick="closeWishlistDrawer()">Continue Browsing</button>
    `;
  }
}

function inquireWishlistWhatsApp() {
  const wishlistedProducts = AppState.wishlist.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  if (!wishlistedProducts.length) return;

  const lines = ['✨ *HOOR COLLECTION — WISHLIST CONSULTATION*', '', 'Hello! I have saved these pieces to my Hoor Collection wishlist and would like bespoke styling advice:', ''];
  wishlistedProducts.forEach((p, i) => {
    lines.push(`*${i+1}. ${p.title}* (${p.category})`);
    lines.push(`   Price: ${formatPrice(getProductPrice(p))}`);
    lines.push('');
  });
  lines.push('👤 *Client Details:*', '• Name: ', '• Country / City: ');

  openWhatsApp(lines.join('\n'));
}

// Quick View State & Handlers
let quickViewProduct = null;
let quickViewSize = 'M';
let quickViewStitching = 'ready-to-wear';

function openQuickView(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;
  quickViewProduct = p;
  quickViewSize = p.stitching.sizes?.[1] || p.stitching.sizes?.[0] || 'M';
  quickViewStitching = p.stitching.available[0] || 'ready-to-wear';

  const modal = document.getElementById('quick-view-modal');
  const dialog = document.getElementById('quick-view-content');
  if (!modal || !dialog) return;

  dialog.innerHTML = `
    <button onclick="closeQuickView()" style="position:absolute;top:1rem;right:1.25rem;font-size:1.5rem;color:var(--emerald-900);z-index:10;cursor:pointer">✕</button>
    <div class="quick-view-grid">
      <div>
        <div style="position:relative;border-radius:1.25rem;overflow:hidden;aspect-ratio:3/4;background:var(--cream-400)">
          <img id="qv-main-img" src="${p.images[0].src}" alt="${escapeHtml(p.title)}" style="width:100%;height:100%;object-fit:cover">
        </div>
        <div style="display:flex;gap:.5rem;margin-top:.75rem;overflow-x:auto;padding-bottom:.25rem">
          ${p.images.slice(0, 5).map((img, idx) => `
            <img src="${img.src}" onclick="document.getElementById('qv-main-img').src='${img.src}'" style="width:55px;height:70px;object-fit:cover;border-radius:.5rem;cursor:pointer;border:2px solid ${idx===0?'var(--gold-500)':'transparent'}">
          `).join('')}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:1rem">
        <div>
          <span class="badge ${p.badge==='BRIDAL'?'badge-bridal':'badge-gold'}">${p.category}</span>
          <h2 class="font-serif" style="font-size:1.8rem;color:var(--emerald-900);margin:.5rem 0 .25rem">${escapeHtml(p.title)}</h2>
          <p style="font-size:.9rem;color:var(--gold-600);font-weight:600">${escapeHtml(p.subtitle)}</p>
        </div>
        <div style="font-family:var(--font-serif);font-size:1.75rem;font-weight:700;color:var(--emerald-900)">
          ${formatPrice(getProductPrice(p))}
        </div>
        <p style="font-size:.875rem;color:var(--charcoal-600);line-height:1.6">${escapeHtml(p.shortDescription)}</p>
        
        <div>
          <label style="font-size:.8rem;font-weight:600;color:var(--emerald-900);text-transform:uppercase;display:block;margin-bottom:.5rem">Stitching:</label>
          <div style="display:flex;gap:.5rem">
            ${p.stitching.available.map(st => `
              <button class="badge ${quickViewStitching===st?'badge-gold':'badge-emerald'}" onclick="quickViewStitching='${st}';this.parentElement.querySelectorAll('button').forEach(b=>b.className='badge badge-emerald');this.className='badge badge-gold'" style="cursor:pointer;padding:.4rem .75rem">
                ${st==='ready-to-wear'?'Ready to Wear':st==='custom'?'Custom (+Rs.1,500)':'Unstitched'}
              </button>
            `).join('')}
          </div>
        </div>

        <div>
          <label style="font-size:.8rem;font-weight:600;color:var(--emerald-900);text-transform:uppercase;display:block;margin-bottom:.5rem">Size:</label>
          <div style="display:flex;gap:.5rem">
            ${(p.stitching.sizes || ['S', 'M', 'L', 'XL']).map(sz => `
              <button class="badge ${quickViewSize===sz?'badge-gold':'badge-emerald'}" onclick="quickViewSize='${sz}';this.parentElement.querySelectorAll('button').forEach(b=>b.className='badge badge-emerald');this.className='badge badge-gold'" style="cursor:pointer;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-weight:700">
                ${sz}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:.75rem">
          <button class="btn btn-emerald btn-full" onclick="quickViewAddToCart()">Add to Bag</button>
          <button class="btn btn-whatsapp btn-full" onclick="quickViewWhatsAppOrder()">WhatsApp Order</button>
        </div>

        <div style="text-align:center;margin-top:.25rem">
          <a href="#" onclick="event.preventDefault();closeQuickView();navigateTo('product',{slug:'${p.slug}'})" style="font-size:.85rem;color:var(--gold-600);text-decoration:underline">
            View Complete Haute Couture PDP & Zoom Gallery →
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function quickViewAddToCart() {
  if (!quickViewProduct) return;
  addToCart({
    product: quickViewProduct,
    stitchingType: quickViewStitching,
    size: quickViewStitching === 'ready-to-wear' ? quickViewSize : null,
    quantity: 1
  });
  closeQuickView();
  openCartDrawer();
}

function quickViewWhatsAppOrder() {
  if (!quickViewProduct) return;
  const msg = buildWhatsAppMessage({
    product: quickViewProduct,
    stitchingType: quickViewStitching,
    size: quickViewStitching === 'ready-to-wear' ? quickViewSize : null,
    quantity: 1,
    currency: AppState.currency
  });
  closeQuickView();
  openWhatsApp(msg);
}

function quickAdd(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  addToCart({ product, stitchingType: product.stitching.available[0], size: product.stitching.sizes?.[1] || undefined, quantity: 1 });
  openCartDrawer();
}

