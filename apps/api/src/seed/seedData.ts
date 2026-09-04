import mongoose from 'mongoose';

// ─── Stable seed ObjectIds ──────────────────────────────────────────────────
export const CAT_IDS = {
  kanchi_bridal: new mongoose.Types.ObjectId('000000000000000000000001'),
  banarasi_brokets: new mongoose.Types.ObjectId('000000000000000000000002'),
  paithani_gadwal: new mongoose.Types.ObjectId('000000000000000000000003'),
  pochampally_patola: new mongoose.Types.ObjectId('000000000000000000000004'),
  mysore_chanderi: new mongoose.Types.ObjectId('000000000000000000000005'),
  organza_luxe: new mongoose.Types.ObjectId('000000000000000000000006'),
  tissue_silk: new mongoose.Types.ObjectId('000000000000000000000007'),
  kuttu_korvai: new mongoose.Types.ObjectId('000000000000000000000008'),
};

export const COL_IDS = {
  bridal: new mongoose.Types.ObjectId('000000000000000000000011'),
  royal: new mongoose.Types.ObjectId('000000000000000000000012'),
  festive: new mongoose.Types.ObjectId('000000000000000000000013'),
  daily_luxe: new mongoose.Types.ObjectId('000000000000000000000014'),
};

export const PROD_IDS = {
  p1: new mongoose.Types.ObjectId('000000000000000000000101'),
  p2: new mongoose.Types.ObjectId('000000000000000000000102'),
  p3: new mongoose.Types.ObjectId('000000000000000000000103'),
  p4: new mongoose.Types.ObjectId('000000000000000000000104'),
  p5: new mongoose.Types.ObjectId('000000000000000000000105'),
  p6: new mongoose.Types.ObjectId('000000000000000000000106'),
  p7: new mongoose.Types.ObjectId('000000000000000000000107'),
  p8: new mongoose.Types.ObjectId('000000000000000000000108'),
  p9: new mongoose.Types.ObjectId('000000000000000000000109'),
  p10: new mongoose.Types.ObjectId('000000000000000000000110'),
  p11: new mongoose.Types.ObjectId('000000000000000000000111'),
  p12: new mongoose.Types.ObjectId('000000000000000000000112'),
  p13: new mongoose.Types.ObjectId('000000000000000000000113'),
  p14: new mongoose.Types.ObjectId('000000000000000000000114'),
  p15: new mongoose.Types.ObjectId('000000000000000000000115'),
  p16: new mongoose.Types.ObjectId('000000000000000000000116'),
  p17: new mongoose.Types.ObjectId('000000000000000000000117'),
  p18: new mongoose.Types.ObjectId('000000000000000000000118'),
};

// ─── Categories ─────────────────────────────────────────────────────────────
export const seedCategories = [
  {
    _id: CAT_IDS.kanchi_bridal,
    name: 'Kanchipuram Pure Silk Bridal',
    slug: 'kanchipuram-bridal',
    description: 'Heirloom South Indian bridal sarees handwoven with 3-ply mulberry silk, pure tested gold zari, and grand temple vanki korvai borders.',
    image: '/images/products/kanchipuram_bridal_crimson.png',
    icon: 'Sparkles',
    displayOrder: 100,
    visible: true,
    productCount: 2,
  },
  {
    _id: CAT_IDS.banarasi_brokets,
    name: 'Banarasi Katan & Rangkat',
    slug: 'banarasi-katan',
    description: 'Imperial Varanasi handlooms featuring pastel multi-shade Rangkat drapes and Mughal gold floral brocade jaal.',
    image: '/images/products/banarasi_rangkat_pastel.png',
    icon: 'Crown',
    displayOrder: 200,
    visible: true,
    productCount: 2,
  },
  {
    _id: CAT_IDS.paithani_gadwal,
    name: 'Paithani & Gadwal Handloom',
    slug: 'paithani-gadwal',
    description: 'Royal Maharashtrian Paithanis with kaleidoscope peacock pallus and heritage Telangana Gadwal drapes with pure silk contrast borders.',
    image: '/images/products/paithani_gold_peacock.png',
    icon: 'Feather',
    displayOrder: 300,
    visible: true,
    productCount: 2,
  },
  {
    _id: CAT_IDS.pochampally_patola,
    name: 'Pochampally Ikat & Patola',
    slug: 'pochampally-patola',
    description: 'Precision tie-and-dye double ikat weaves from Pochampally and royal Patan Patolas woven with iconic geometric and animal motifs.',
    image: '/images/products/pochampally_ikat_geometric.png',
    icon: 'Grid',
    displayOrder: 400,
    visible: true,
    productCount: 2,
  },
  {
    _id: CAT_IDS.mysore_chanderi,
    name: 'Mysore Crepe & Chanderi',
    slug: 'mysore-chanderi',
    description: 'Ultra-supple Karnataka Mysore pure crepe silks and sheer Madhya Pradesh Chanderi drapes designed for effortless elegance.',
    image: '/images/products/mysore_crepe_royal_maroon.png',
    icon: 'Wind',
    displayOrder: 500,
    visible: true,
    productCount: 2,
  },
  {
    _id: CAT_IDS.organza_luxe,
    name: 'Organza & Contemporary Drapes',
    slug: 'organza-contemporary',
    description: 'Ethereal sheer organza silks embellished with scalloped borders, hand-embroidered cutdana vines, and designer accents.',
    image: '/images/products/organza_lavender_floral.png',
    icon: 'Flower2',
    displayOrder: 600,
    visible: true,
    productCount: 2,
  },
  {
    _id: CAT_IDS.tissue_silk,
    name: 'Tissue Silk & Metallic Weaves',
    slug: 'tissue-silk',
    description: 'Luminous metallic warp and weft tissue silk sarees radiating a shimmering golden and rose-gold sheen.',
    image: '/images/products/rose_gold_tissue.png',
    icon: 'Sun',
    displayOrder: 700,
    visible: true,
    productCount: 1,
  },
  {
    _id: CAT_IDS.kuttu_korvai,
    name: 'Korvai & Temple Kuttu',
    slug: 'korvai-kuttu',
    description: 'Master handloom drapes woven with the ancient three-shuttle interlocked temple spire technique.',
    image: '/images/products/emerald_green_kuttu.png',
    icon: 'Shield',
    displayOrder: 800,
    visible: true,
    productCount: 1,
  },
];

// ─── Collections ─────────────────────────────────────────────────────────────
export const seedCollections = [
  {
    _id: COL_IDS.bridal,
    name: 'Bridal Heritage 2026',
    slug: 'bridal-heritage',
    description: 'Regal bridal sarees woven by master craftsmen for grand celebrations and muhurthams.',
    image: '/images/products/kanchipuram_bridal_crimson.png',
    productIds: [PROD_IDS.p1, PROD_IDS.p2, PROD_IDS.p5, PROD_IDS.p8, PROD_IDS.p9],
    displayOrder: 100,
    visible: true,
  },
  {
    _id: COL_IDS.royal,
    name: 'Royal Imperial Silks',
    slug: 'royal-silk',
    description: 'Timeless pure silk drapes in deep jewel tones with pure gold zari highlights.',
    image: '/images/products/banarasi_rangkat_pastel.png',
    productIds: [PROD_IDS.p2, PROD_IDS.p4, PROD_IDS.p6, PROD_IDS.p8, PROD_IDS.p10],
    displayOrder: 200,
    visible: true,
  },
  {
    _id: COL_IDS.festive,
    name: 'Festive Celebrations',
    slug: 'festive-collection',
    description: 'Vibrant drapes with shimmering borders, ideal for Sangeet, Haldi, Mehendi, and receptions.',
    image: '/images/products/paithani_gold_peacock.png',
    productIds: [PROD_IDS.p3, PROD_IDS.p6, PROD_IDS.p7, PROD_IDS.p11, PROD_IDS.p12],
    displayOrder: 300,
    visible: true,
  },
  {
    _id: COL_IDS.daily_luxe,
    name: 'Everyday Luxury & Soirée',
    slug: 'everyday-luxury',
    description: 'Lightweight pure Mysore crepe silks, Chanderi, and pastel organzas crafted for effortless comfort.',
    image: '/images/products/mysore_crepe_royal_maroon.png',
    productIds: [PROD_IDS.p4, PROD_IDS.p7, PROD_IDS.p13, PROD_IDS.p14],
    displayOrder: 400,
    visible: true,
  },
];

// ─── Products ────────────────────────────────────────────────────────────────
export const seedProducts = [
  // 1. Imperial Crimson Bridal Kanchipuram
  {
    _id: PROD_IDS.p1,
    name: 'Imperial Crimson Bridal Gold Zari Kanchipuram',
    slug: 'imperial-crimson-bridal-gold-kanchipuram',
    sku: 'SRS-KNC-001',
    description: 'An heirloom South Indian bridal masterpiece handwoven in deep vermilion crimson pure silk with 24k tested gold zari temple vanki korvai borders and intricate peacock chakra medallions across the grand pallu.',
    story: 'Woven over 45 days in the heritage looms of Kanchipuram, this bridal drape features interlocked Korvai borders that symbolize eternal marital prosperity and regal South Indian grace.',
    price: 48500,
    mrp: 58000,
    categoryId: CAT_IDS.kanchi_bridal,
    collectionIds: [COL_IDS.bridal, COL_IDS.royal],
    stock: 3,
    images: [
      { url: '/images/products/kanchipuram_bridal_crimson.png', isPrimary: true, alt: 'Imperial Crimson Bridal Kanchipuram' },
      { url: '/images/products/kanchipuram_red_gold.png', isPrimary: false, alt: 'Kanchipuram Detail View' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#B22222',
      sheenColorHex: '#FFD700',
      roughness: 0.28,
      metalness: 0.65,
      clearcoat: 0.85
    },
    attributes: {
      fabric: 'Kanchipuram Silk',
      color: 'Crimson Red',
      colors: ['Crimson Red', 'Gold'],
      pattern: 'Peacock Chakra Korvai',
      occasion: 'Bridal Muhurtham',
      weave: 'Three-Shuttle Korvai Handloom',
      border: 'Heavy Temple Vanki Gold Zari Border',
      length: '6.3 Meters (with blouse)',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['crimson red', 'vermilion', 'pure gold'],
      fabric: ['silk', 'pure mulberry silk', 'kanchipuram silk'],
      motifs: ['peacock', 'chakra', 'temple spire', 'vanki'],
      pattern: 'traditional bridal korvai',
      border: { color: 'pure gold', weight: 'heavy', type: 'temple korvai' },
      zari: true,
      zariType: '24K Tested Gold Zari',
      occasion: ['wedding', 'bridal', 'muhurtham', 'reception'],
      style: 'traditional luxury',
      visualEmbedding: [0.94, 0.22, 0.12, 0.88, 0.95, 0.42, 0.65, 0.18],
      palluDetails: 'Full golden tapestry with twin dancing peacocks and floral creepers'
    },
    tryOn: {
      enabled: true,
      supportedDrapes: ['Nivi', 'Bengali', 'Gujarati', 'Maharashtrian', 'Seedha Pallu'],
      recommendedDrape: 'Nivi'
    },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: {
        dominantColor: '#B22222',
        secondaryColor: '#FFD700',
        fabricConfidence: 0.99,
        motifCount: 88,
        borderWidthRatio: 0.28
      },
      aiQualityScore: { imageQuality: 99, metadataCompleteness: 98, sareeVisibility: 100, garmentFidelity: 98, seoCompleteness: 96, overall: 98 },
      aiGeneratedStory: 'The ultimate royal bridal drape featuring temple-grade craftsmanship and gleaming gold zari.',
      tags: ['bridal', 'muhurtham', 'kanchipuram', 'crimson red', 'gold zari', 'wedding saree']
    },
    tags: ['Bridal', 'Kanchipuram', 'Crimson Red', 'Pure Gold Zari', 'Wedding', 'CMR Top Pick'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 100,
    seo: {
      title: 'Imperial Crimson Bridal Gold Zari Kanchipuram | Sree Ram Silks',
      description: 'Heirloom South Indian pure silk bridal Kanchipuram with pure tested gold zari.'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 2. Royal Purple Peacock Gold Paithani
  {
    _id: PROD_IDS.p2,
    name: 'Royal Purple & Magenta Peacock Gold Paithani',
    slug: 'royal-purple-peacock-gold-paithani',
    sku: 'SRS-PTH-002',
    description: 'An illustrious Maharashtrian Paithani silk saree woven in royal purple and magenta dual-tone body with an opulent tapestry gold zari pallu adorned with multicolored peacock (mor) and lotus motifs.',
    story: 'Hailing from the ancient weaving town of Paithan, this handwoven masterpiece embodies the Maratha royal court heritage with its signature oblique square design and kaleidoscopic bird motifs.',
    price: 32900,
    mrp: 38500,
    categoryId: CAT_IDS.paithani_gadwal,
    collectionIds: [COL_IDS.bridal, COL_IDS.royal, COL_IDS.festive],
    stock: 4,
    images: [
      { url: '/images/products/paithani_gold_peacock.png', isPrimary: true, alt: 'Royal Purple Gold Paithani Saree' },
      { url: '/images/products/banarasi_royal_blue.png', isPrimary: false, alt: 'Paithani Drape View' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#4B0082',
      sheenColorHex: '#FFD700',
      roughness: 0.32,
      metalness: 0.60,
      clearcoat: 0.80
    },
    attributes: {
      fabric: 'Pure Paithani Silk',
      color: 'Royal Purple',
      colors: ['Royal Purple', 'Magenta', 'Gold'],
      pattern: 'Asawali & Peacock Pallu',
      occasion: 'Reception & Festive Wedding',
      weave: 'Handloom Tapestry Weave',
      border: 'Narali Gold Zari Border',
      length: '6.3 Meters (with blouse)',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['royal purple', 'magenta', 'antique gold'],
      fabric: ['silk', 'paithani silk', 'pure handloom silk'],
      motifs: ['peacock', 'mor', 'lotus', 'parrot', 'narali coconut'],
      pattern: 'tapestry brocade',
      border: { color: 'antique gold', weight: 'heavy', type: 'narali gold border' },
      zari: true,
      zariType: 'Fine Tested Gold Zari',
      occasion: ['wedding', 'reception', 'festive', 'sangeet'],
      style: 'royal maharashtrian',
      visualEmbedding: [0.72, 0.15, 0.84, 0.62, 0.91, 0.55, 0.48, 0.30],
      palluDetails: 'Elaborate hand-interlocked peacock and parrot tapestry on pure gold base'
    },
    tryOn: {
      enabled: true,
      supportedDrapes: ['Nivi', 'Maharashtrian', 'Gujarati', 'Seedha Pallu'],
      recommendedDrape: 'Maharashtrian'
    },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: {
        dominantColor: '#4B0082',
        secondaryColor: '#FFD700',
        fabricConfidence: 0.98,
        motifCount: 45,
        borderWidthRatio: 0.24
      },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 97, sareeVisibility: 99, garmentFidelity: 97, seoCompleteness: 95, overall: 97 },
      aiGeneratedStory: 'A timeless royal Maharashtrian Paithani in dual-tone purple with breathtaking peacock tapestry.',
      tags: ['paithani', 'purple silk', 'peacock pallu', 'maharashtrian wedding', 'gold zari']
    },
    tags: ['Paithani', 'Purple', 'Peacock Motifs', 'Gold Zari', 'Festive', 'CMR Top Pick'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 200,
    seo: {
      title: 'Royal Purple & Magenta Peacock Gold Paithani | Sree Ram Silks',
      description: 'Handwoven pure Paithani silk saree with iconic multi-hued peacock pallu.'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 3. Vibrant Teal & Mustard Double Ikat Pochampally
  {
    _id: PROD_IDS.p3,
    name: 'Vibrant Teal & Mustard Double Ikat Pochampally Silk',
    slug: 'teal-mustard-double-ikat-pochampally',
    sku: 'SRS-POC-003',
    description: 'An authentic Telangana Pochampally double ikat silk saree showcasing sharp geometric diamond Chevron patterns in luminous teal and mustard yellow, finished with a classic black and gold zari border.',
    story: 'Woven with mathematical precision using tie-and-dye warp and weft yarns, Pochampally Ikat carries a prestigious UNESCO heritage tag and unmatched handloom legacy.',
    price: 12499,
    mrp: 15999,
    categoryId: CAT_IDS.pochampally_patola,
    collectionIds: [COL_IDS.festive, COL_IDS.daily_luxe],
    stock: 6,
    images: [
      { url: '/images/products/pochampally_ikat_geometric.png', isPrimary: true, alt: 'Pochampally Double Ikat Silk Saree' },
      { url: '/images/products/peacock_blue_chanderi.png', isPrimary: false, alt: 'Pochampally Close-up' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#008080',
      sheenColorHex: '#FFD700',
      roughness: 0.38,
      metalness: 0.40,
      clearcoat: 0.60
    },
    attributes: {
      fabric: 'Pure Mulberry Silk',
      color: 'Teal & Mustard Yellow',
      colors: ['Teal', 'Mustard Yellow', 'Black'],
      pattern: 'Double Ikat Geometric Chevron',
      occasion: 'Festive & Contemporary Soirée',
      weave: 'Handloom Double Ikat Tie-and-Dye',
      border: 'Contrast Black Gold Zari Border',
      length: '6.3 Meters (with blouse)',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['teal', 'mustard yellow', 'black', 'gold'],
      fabric: ['silk', 'pochampally silk', 'handloom double ikat'],
      motifs: ['geometric', 'chevron', 'diamond', 'patola grid'],
      pattern: 'geometric double ikat',
      border: { color: 'black gold', weight: 'medium', type: 'contrast zari band' },
      zari: true,
      zariType: 'Tested Zari Border',
      occasion: ['festive', 'pooja', 'formal event', 'party'],
      style: 'heritage contemporary',
      visualEmbedding: [0.22, 0.81, 0.45, 0.76, 0.63, 0.38, 0.52, 0.41],
      palluDetails: 'Geometric ikat grid with horizontal zari stripes'
    },
    tryOn: {
      enabled: true,
      supportedDrapes: ['Nivi', 'Modern', 'Gujarati'],
      recommendedDrape: 'Nivi'
    },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: {
        dominantColor: '#008080',
        secondaryColor: '#DAA520',
        fabricConfidence: 0.97,
        motifCount: 30,
        borderWidthRatio: 0.18
      },
      aiQualityScore: { imageQuality: 97, metadataCompleteness: 96, sareeVisibility: 98, garmentFidelity: 97, seoCompleteness: 94, overall: 96 },
      aiGeneratedStory: 'Geometric handloom elegance in teal and mustard for the modern saree connoisseur.',
      tags: ['pochampally', 'ikat silk', 'teal saree', 'handloom', 'affordable luxury']
    },
    tags: ['Pochampally', 'Double Ikat', 'Teal', 'Mustard', 'Handloom', 'Under ₹15000'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 300,
    seo: {
      title: 'Vibrant Teal & Mustard Double Ikat Pochampally Silk | Sree Ram Silks',
      description: 'Pure handloom Pochampally double ikat silk saree with geometric chevron motifs.'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 4. Royal Maroon Pure Mysore Crepe Silk
  {
    _id: PROD_IDS.p4,
    name: 'Royal Maroon & Gold Pure Mysore Crepe Silk',
    slug: 'royal-maroon-pure-mysore-crepe-silk',
    sku: 'SRS-MYS-004',
    description: 'An iconic Karnataka Mysore Pure Crepe Silk saree in deep regal maroon wine with a glistening solid pure gold zari border and delicate coin buttas across the silky flowing body.',
    story: 'Crafted with 100% natural silk yarn and genuine gold zari in the historic silk hub of Karnataka, renowned for its lightweight fluid drape and understated luxury.',
    price: 16800,
    mrp: 19500,
    categoryId: CAT_IDS.mysore_chanderi,
    collectionIds: [COL_IDS.royal, COL_IDS.daily_luxe],
    stock: 5,
    images: [
      { url: '/images/products/mysore_crepe_royal_maroon.png', isPrimary: true, alt: 'Royal Maroon Mysore Crepe Silk' },
      { url: '/images/products/burgundy_velvet_border.png', isPrimary: false, alt: 'Mysore Silk Drape' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#800020',
      sheenColorHex: '#FFD700',
      roughness: 0.20,
      metalness: 0.45,
      clearcoat: 0.90
    },
    attributes: {
      fabric: 'Pure Mysore Crepe Silk',
      color: 'Regal Maroon Wine',
      colors: ['Maroon Wine', 'Gold'],
      pattern: 'Solid Crepe with Gold Coin Buttas',
      occasion: 'Evening Soirée, Office Gala & Festive',
      weave: 'Powerloom Crepe Twist Weave',
      border: 'Solid Pure Gold Zari Border',
      length: '6.3 Meters (with blouse)',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['maroon wine', 'burgundy', 'pure gold'],
      fabric: ['silk', 'mysore silk', 'pure crepe silk'],
      motifs: ['coin butta', 'kasuti line', 'solid zari'],
      pattern: 'minimalist crepe luxe',
      border: { color: 'pure gold', weight: 'medium', type: 'solid zari band' },
      zari: true,
      zariType: 'Pure Tested Gold Zari',
      occasion: ['evening party', 'pooja', 'formal wedding', 'reception'],
      style: 'timeless minimalist royal',
      visualEmbedding: [0.88, 0.12, 0.25, 0.72, 0.85, 0.45, 0.60, 0.20],
      palluDetails: 'Classic 5-line Mysore gold zari striping'
    },
    tryOn: {
      enabled: true,
      supportedDrapes: ['Nivi', 'Modern', 'Bengali'],
      recommendedDrape: 'Nivi'
    },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: {
        dominantColor: '#800020',
        secondaryColor: '#FFD700',
        fabricConfidence: 0.99,
        motifCount: 50,
        borderWidthRatio: 0.15
      },
      aiQualityScore: { imageQuality: 99, metadataCompleteness: 98, sareeVisibility: 100, garmentFidelity: 99, seoCompleteness: 97, overall: 99 },
      aiGeneratedStory: 'Fluid lightweight drape and silky sheen in royal maroon wine with solid gold borders.',
      tags: ['mysore crepe', 'maroon silk', 'gold zari border', 'lightweight luxury', 'under 20000']
    },
    tags: ['Mysore Silk', 'Crepe Silk', 'Maroon', 'Gold Zari', 'Minimalist Luxe', 'CMR Top Pick'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 400,
    seo: {
      title: 'Royal Maroon & Gold Pure Mysore Crepe Silk | Sree Ram Silks',
      description: 'Authentic pure Mysore crepe silk saree with solid gold zari border.'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 5. Pastel Rangkat Floral Banarasi Katan Georgette
  {
    _id: PROD_IDS.p5,
    name: 'Pastel Rangkat Floral Banarasi Katan Georgette',
    slug: 'pastel-rangkat-floral-banarasi-katan',
    sku: 'SRS-BAN-005',
    description: 'A breathtaking Banarasi Rangkat pure katan silk drape featuring multi-colored pastel stripes in blush pink, mint green, and pale lavender with intricate antique gold zari floral jaal and meenakari resham highlights.',
    story: 'Rangkat is the pinnacle of Varanasi weaving art, requiring individual colored weft insertions across vertical pastel bands to create a symphony of subtle regal shades.',
    price: 28500,
    mrp: 34000,
    categoryId: CAT_IDS.banarasi_brokets,
    collectionIds: [COL_IDS.bridal, COL_IDS.royal, COL_IDS.festive],
    stock: 3,
    images: [
      { url: '/images/products/banarasi_rangkat_pastel.png', isPrimary: true, alt: 'Pastel Rangkat Banarasi Saree' },
      { url: '/images/products/rose_gold_tissue.png', isPrimary: false, alt: 'Banarasi Detail' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#FFD1DC',
      sheenColorHex: '#E6E6FA',
      roughness: 0.25,
      metalness: 0.55,
      clearcoat: 0.85
    },
    attributes: {
      fabric: 'Pure Banarasi Katan Silk',
      color: 'Pastel Multi (Blush Pink, Mint, Lavender)',
      colors: ['Blush Pink', 'Mint Green', 'Lavender', 'Gold'],
      pattern: 'Floral Jaal & Meenakari Rangkat',
      occasion: 'Daytime Wedding & Sangeet',
      weave: 'Handloom Kadwa Cutwork Jaal',
      border: 'Antique Gold Brocade Border',
      length: '6.3 Meters (with blouse)',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['blush pink', 'mint green', 'lavender', 'antique gold'],
      fabric: ['silk', 'banarasi silk', 'katan silk', 'georgette silk'],
      motifs: ['floral jaal', 'meenakari', 'bel', 'paisley'],
      pattern: 'multi-hue rangkat',
      border: { color: 'antique gold', weight: 'medium', type: 'scalloped brocade' },
      zari: true,
      zariType: 'Antique Matte Gold Zari',
      occasion: ['wedding', 'sangeet', 'daytime reception', 'engagement'],
      style: 'contemporary regal pastel',
      visualEmbedding: [0.65, 0.78, 0.82, 0.45, 0.89, 0.35, 0.68, 0.28],
      palluDetails: 'Intricate Kadwa floral tapestry with meenakari inlays'
    },
    tryOn: {
      enabled: true,
      supportedDrapes: ['Nivi', 'Bengali', 'Gujarati', 'Modern'],
      recommendedDrape: 'Nivi'
    },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: {
        dominantColor: '#FFD1DC',
        secondaryColor: '#98FF98',
        fabricConfidence: 0.99,
        motifCount: 95,
        borderWidthRatio: 0.20
      },
      aiQualityScore: { imageQuality: 99, metadataCompleteness: 98, sareeVisibility: 100, garmentFidelity: 98, seoCompleteness: 96, overall: 98 },
      aiGeneratedStory: 'Pastel dreamscape handwoven in Varanasi with antique gold floral jaal.',
      tags: ['banarasi', 'rangkat', 'pastel saree', 'blush pink', 'wedding guest', 'meenakari']
    },
    tags: ['Banarasi', 'Rangkat', 'Pastel Pink', 'Floral Jaal', 'Wedding', 'CMR Top Pick'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 500,
    seo: {
      title: 'Pastel Rangkat Floral Banarasi Katan Georgette | Sree Ram Silks',
      description: 'Handwoven Banarasi Rangkat pure silk saree in multi-hued pastel shades with antique zari.'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 6. Mustard & Emerald Handloom Gadwal Silk
  {
    _id: PROD_IDS.p6,
    name: 'Mustard & Emerald Contrast Handloom Gadwal Silk',
    slug: 'mustard-emerald-contrast-handloom-gadwal',
    sku: 'SRS-GAD-006',
    description: 'An authentic Telangana Gadwal handloom saree featuring a radiant mustard golden yellow body with an attached pure silk emerald green contrast border, intricately woven with traditional temple kuttu zari spires and peacock buttas.',
    story: 'Gadwal sarees are famous for their unique interlocking technique (Kuttu) where a lightweight cotton or fine silk body is seamlessly joined to rich pure silk zari borders.',
    price: 19200,
    mrp: 23500,
    categoryId: CAT_IDS.paithani_gadwal,
    collectionIds: [COL_IDS.royal, COL_IDS.festive],
    stock: 4,
    images: [
      { url: '/images/products/gadwal_handloom_mustard.png', isPrimary: true, alt: 'Mustard Emerald Gadwal Silk Saree' },
      { url: '/images/products/emerald_green_kuttu.png', isPrimary: false, alt: 'Gadwal Border Detail' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#FFDB58',
      sheenColorHex: '#50C878',
      roughness: 0.30,
      metalness: 0.50,
      clearcoat: 0.75
    },
    attributes: {
      fabric: 'Pure Gadwal Silk',
      color: 'Mustard Yellow & Emerald Green',
      colors: ['Mustard Yellow', 'Emerald Green', 'Gold'],
      pattern: 'Temple Kuttu & Peacock Buttas',
      occasion: 'Haldi, Pooja & Traditional Wedding',
      weave: 'Handloom Kuttu Interlocked Weave',
      border: 'Heavy Emerald Green Temple Zari Border',
      length: '6.3 Meters (with blouse)',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['mustard yellow', 'emerald green', 'gold'],
      fabric: ['silk', 'gadwal silk', 'handloom silk'],
      motifs: ['temple spire', 'peacock butta', 'rudraksha'],
      pattern: 'contrast kuttu border',
      border: { color: 'emerald green gold', weight: 'heavy', type: 'interlocked temple kuttu' },
      zari: true,
      zariType: 'Pure Tested Gold Zari',
      occasion: ['haldi', 'pooja', 'wedding', 'festive'],
      style: 'traditional south handloom',
      visualEmbedding: [0.85, 0.72, 0.15, 0.65, 0.88, 0.42, 0.55, 0.30],
      palluDetails: 'Rich emerald green pallu packed with gold zari coin and peacock rows'
    },
    tryOn: {
      enabled: true,
      supportedDrapes: ['Nivi', 'Gujarati', 'Seedha Pallu'],
      recommendedDrape: 'Nivi'
    },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: {
        dominantColor: '#FFDB58',
        secondaryColor: '#50C878',
        fabricConfidence: 0.98,
        motifCount: 40,
        borderWidthRatio: 0.22
      },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 97, sareeVisibility: 99, garmentFidelity: 97, seoCompleteness: 95, overall: 97 },
      aiGeneratedStory: 'Radiant mustard yellow with an emerald green temple border—a festive staple.',
      tags: ['gadwal', 'mustard yellow', 'emerald green', 'haldi saree', 'temple border']
    },
    tags: ['Gadwal', 'Mustard', 'Emerald Green', 'Temple Border', 'Haldi', 'Under ₹20000'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 600,
    seo: {
      title: 'Mustard & Emerald Contrast Handloom Gadwal Silk | Sree Ram Silks',
      description: 'Handwoven pure Gadwal silk saree with temple kuttu contrast border.'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 7. Lavender Sheer Organza Hand-Embroidered Saree
  {
    _id: PROD_IDS.p7,
    name: 'Lavender Sheer Organza Hand-Embroidered Saree',
    slug: 'lavender-sheer-organza-hand-embroidered',
    sku: 'SRS-ORG-007',
    description: 'An ethereal soft lavender sheer organza silk saree delicately embellished with hand-embroidered silver cutdana floral vines, scalloped resham borders, and pearl spray motifs.',
    story: 'Embodying modern Indian haute couture, this organza drape pairs featherlight sheer textures with bespoke hand embroidery for cocktail parties and summer receptions.',
    price: 9800,
    mrp: 13500,
    categoryId: CAT_IDS.organza_luxe,
    collectionIds: [COL_IDS.festive, COL_IDS.daily_luxe],
    stock: 7,
    images: [
      { url: '/images/products/organza_lavender_floral.png', isPrimary: true, alt: 'Lavender Sheer Organza Saree' },
      { url: '/images/products/rose_gold_tissue.png', isPrimary: false, alt: 'Organza Embroidery Detail' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#E6E6FA',
      sheenColorHex: '#C0C0C0',
      roughness: 0.15,
      metalness: 0.20,
      clearcoat: 0.95
    },
    attributes: {
      fabric: 'Pure Silk Organza',
      color: 'Soft Lavender Lilac',
      colors: ['Lavender', 'Silver', 'Pearl White'],
      pattern: 'Cutdana Floral Vine & Scalloped Border',
      occasion: 'Cocktail, Reception & Summer Soirée',
      weave: 'Sheer Plain Organza Weave with Hand Embroidery',
      border: 'Hand-Embroidered Scalloped Silver Border',
      length: '6.3 Meters (with blouse)',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['lavender', 'lilac', 'silver', 'pearl white'],
      fabric: ['silk', 'organza', 'sheer silk'],
      motifs: ['floral vine', 'cutdana', 'scallop', 'pearl spray'],
      pattern: 'delicate floral embroidery',
      border: { color: 'silver', weight: 'light', type: 'scalloped embroidered' },
      zari: false,
      zariType: 'Silver Cutdana & Resham Embroidery',
      occasion: ['cocktail', 'reception', 'engagement', 'summer party'],
      style: 'contemporary chic haute couture',
      visualEmbedding: [0.35, 0.42, 0.91, 0.15, 0.78, 0.25, 0.85, 0.60],
      palluDetails: 'Cascading floral vine embroidery with cutdana edging'
    },
    tryOn: {
      enabled: true,
      supportedDrapes: ['Nivi', 'Modern', 'Bengali'],
      recommendedDrape: 'Modern'
    },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: {
        dominantColor: '#E6E6FA',
        secondaryColor: '#C0C0C0',
        fabricConfidence: 0.96,
        motifCount: 65,
        borderWidthRatio: 0.12
      },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 97, sareeVisibility: 99, garmentFidelity: 96, seoCompleteness: 95, overall: 97 },
      aiGeneratedStory: 'Featherlight sheer lavender organza with sparkling hand embroidery.',
      tags: ['organza', 'lavender saree', 'cutdana embroidery', 'cocktail saree', 'under 10000']
    },
    tags: ['Organza', 'Lavender', 'Cutdana Embroidery', 'Cocktail', 'Under ₹10000', 'CMR Top Pick'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 700,
    seo: {
      title: 'Lavender Sheer Organza Hand-Embroidered Saree | Sree Ram Silks',
      description: 'Ethereal lavender pure organza saree with hand-embroidered silver floral vines.'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 8. Ruby Red & Emerald Elephant Patan Patola Silk
  {
    _id: PROD_IDS.p8,
    name: 'Ruby Red & Emerald Elephant Patan Patola Silk',
    slug: 'ruby-red-elephant-patan-patola-silk',
    sku: 'SRS-PAT-008',
    description: 'A museum-grade Gujarat Patan Patola pure silk double ikat saree woven in deep ruby red and forest emerald green with iconic kunjar (elephant), popat (parrot), and floral square grid motifs.',
    story: 'Patan Patola is one of the rarest weaving arts in the world. Woven by hereditary Salvi weavers, both sides of the fabric are identical in color and design, taking up to six months to complete a single drape.',
    price: 54000,
    mrp: 65000,
    categoryId: CAT_IDS.pochampally_patola,
    collectionIds: [COL_IDS.bridal, COL_IDS.royal],
    stock: 2,
    images: [
      { url: '/images/products/patola_heritage_ruby.png', isPrimary: true, alt: 'Patan Patola Double Ikat Silk Saree' },
      { url: '/images/products/pochampally_ikat_geometric.png', isPrimary: false, alt: 'Patola Motifs View' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#9B111E',
      sheenColorHex: '#FFD700',
      roughness: 0.35,
      metalness: 0.50,
      clearcoat: 0.70
    },
    attributes: {
      fabric: 'Pure Patan Patola Silk',
      color: 'Ruby Red & Emerald Green',
      colors: ['Ruby Red', 'Emerald Green', 'Gold'],
      pattern: 'Chhabdi Bhat & Kunjar (Elephant) Double Ikat',
      occasion: 'Royal Wedding & Heirloom Collection',
      weave: 'Heritage Double Ikat (8-ply pure silk)',
      border: 'Solid Gold Zari Tissue Border',
      length: '6.3 Meters (with blouse)',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['ruby red', 'emerald green', 'gold', 'mustard'],
      fabric: ['silk', 'patola silk', 'pure double ikat silk'],
      motifs: ['elephant', 'kunjar', 'parrot', 'popat', 'geometric square'],
      pattern: 'royal double ikat patola',
      border: { color: 'gold tissue', weight: 'medium', type: 'pure zari tissue border' },
      zari: true,
      zariType: 'Tested Gold Zari Tissue',
      occasion: ['wedding', 'royal reception', 'heirloom collection'],
      style: 'royal gujarati heritage',
      visualEmbedding: [0.92, 0.45, 0.18, 0.79, 0.88, 0.62, 0.40, 0.25],
      palluDetails: 'Grand double ikat tapestry with marching elephants and parrots'
    },
    tryOn: {
      enabled: true,
      supportedDrapes: ['Nivi', 'Gujarati', 'Seedha Pallu', 'Bengali'],
      recommendedDrape: 'Gujarati'
    },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: {
        dominantColor: '#9B111E',
        secondaryColor: '#50C878',
        fabricConfidence: 0.99,
        motifCount: 75,
        borderWidthRatio: 0.18
      },
      aiQualityScore: { imageQuality: 99, metadataCompleteness: 99, sareeVisibility: 100, garmentFidelity: 99, seoCompleteness: 97, overall: 99 },
      aiGeneratedStory: 'Six months of master artisanal weaving in the historic Salvi tradition of Patan.',
      tags: ['patola', 'double ikat', 'ruby red', 'heirloom silk', 'luxury wedding']
    },
    tags: ['Patola', 'Patan Double Ikat', 'Ruby Red', 'Elephant Motif', 'Heritage Luxury'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 800,
    seo: {
      title: 'Ruby Red & Emerald Elephant Patan Patola Silk | Sree Ram Silks',
      description: 'Rare museum-grade pure Patan Patola double ikat saree with elephant and parrot motifs.'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 9. Classic Kanchipuram Vermilion Red & Antique Gold Butta
  {
    _id: PROD_IDS.p9,
    name: 'Kanchipuram Vermilion Red & Antique Gold Butta',
    slug: 'kanchipuram-vermilion-red-gold-butta',
    sku: 'SRS-KNC-009',
    description: 'Traditional Kanchipuram silk saree in auspicious vermilion red with delicate mango and floral gold zari buttas and a rich temple border.',
    story: 'A classic staple for traditional poojas and family festivities, woven with enduring pure mulberry silk.',
    price: 24500,
    mrp: 29000,
    categoryId: CAT_IDS.kanchi_bridal,
    collectionIds: [COL_IDS.bridal, COL_IDS.festive],
    stock: 5,
    images: [
      { url: '/images/products/kanchipuram_red_gold.png', isPrimary: true, alt: 'Kanchipuram Vermilion Red Saree' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#C41E3A',
      sheenColorHex: '#FFD700',
      roughness: 0.30,
      metalness: 0.55,
      clearcoat: 0.80
    },
    attributes: {
      fabric: 'Kanchipuram Silk',
      color: 'Vermilion Red',
      colors: ['Vermilion Red', 'Gold'],
      pattern: 'Mango Butta & Temple Zari',
      occasion: 'Traditional Festival & Pooja',
      weave: 'Handloom Korvai Weave',
      border: 'Temple Gold Zari Border',
      length: '6.3 Meters',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['vermilion red', 'gold'],
      fabric: ['silk', 'kanchipuram silk'],
      motifs: ['mango', 'manga butta', 'temple'],
      pattern: 'butta brocade',
      border: { color: 'gold', weight: 'medium', type: 'temple spire' },
      zari: true,
      zariType: 'Tested Gold Zari',
      occasion: ['pooja', 'festive', 'traditional wedding', 'haldi'],
      style: 'traditional',
      visualEmbedding: [0.89, 0.28, 0.15, 0.82, 0.92, 0.40, 0.58, 0.20],
      palluDetails: 'Traditional zari lines with floral vines'
    },
    tryOn: { enabled: true, supportedDrapes: ['Nivi', 'Bengali', 'Gujarati'], recommendedDrape: 'Nivi' },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: { dominantColor: '#C41E3A', secondaryColor: '#FFD700', fabricConfidence: 0.98, motifCount: 55, borderWidthRatio: 0.20 },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 97, sareeVisibility: 99, garmentFidelity: 97, seoCompleteness: 95, overall: 97 },
      aiGeneratedStory: 'Classic South Indian bridal red with auspicious temple motifs.',
      tags: ['kanchipuram', 'red silk', 'temple border', 'gold butta']
    },
    tags: ['Kanchipuram', 'Red', 'Gold Butta', 'Temple Border', 'Festive'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 900,
    seo: { title: 'Kanchipuram Vermilion Red & Antique Gold Butta | Sree Ram Silks', description: 'Traditional Kanchipuram silk saree.' },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 10. Banarasi Royal Midnight Blue Mughal Brocade
  {
    _id: PROD_IDS.p10,
    name: 'Banarasi Royal Midnight Blue Mughal Brocade',
    slug: 'banarasi-royal-midnight-blue-mughal-brocade',
    sku: 'SRS-BAN-010',
    description: 'An imperial Varanasi silk drape in deep midnight royal blue with dense antique gold zari brocade florals and Mughal shikargah motifs.',
    story: 'Inspired by royal courts, featuring opulent zari craftsmanship that glimmers in evening lights.',
    price: 18900,
    mrp: 23000,
    categoryId: CAT_IDS.banarasi_brokets,
    collectionIds: [COL_IDS.royal, COL_IDS.festive],
    stock: 4,
    images: [
      { url: '/images/products/banarasi_royal_blue.png', isPrimary: true, alt: 'Banarasi Royal Blue Saree' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#002366',
      sheenColorHex: '#FFD700',
      roughness: 0.25,
      metalness: 0.60,
      clearcoat: 0.85
    },
    attributes: {
      fabric: 'Banarasi Silk',
      color: 'Royal Blue',
      colors: ['Royal Blue', 'Gold'],
      pattern: 'Mughal Shikargah & Floral Jaal',
      occasion: 'Reception & Evening Gala',
      weave: 'Handloom Brocade Jaal',
      border: 'Antique Zari Border',
      length: '6.3 Meters',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['royal blue', 'midnight blue', 'antique gold'],
      fabric: ['silk', 'banarasi silk', 'brocade'],
      motifs: ['mughal floral', 'shikargah', 'paisley'],
      pattern: 'heavy brocade jaal',
      border: { color: 'antique gold', weight: 'heavy', type: 'scalloped zari' },
      zari: true,
      zariType: 'Antique Gold Zari',
      occasion: ['reception', 'evening party', 'wedding guest'],
      style: 'royal opulent',
      visualEmbedding: [0.15, 0.25, 0.92, 0.70, 0.88, 0.50, 0.45, 0.35],
      palluDetails: 'Intricate Mughal gold tapestry with floral medallions'
    },
    tryOn: { enabled: true, supportedDrapes: ['Nivi', 'Bengali', 'Gujarati'], recommendedDrape: 'Nivi' },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: { dominantColor: '#002366', secondaryColor: '#FFD700', fabricConfidence: 0.98, motifCount: 65, borderWidthRatio: 0.22 },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 97, sareeVisibility: 99, garmentFidelity: 97, seoCompleteness: 95, overall: 97 },
      aiGeneratedStory: 'Midnight blue Banarasi brocade woven with golden Mughal opulence.',
      tags: ['banarasi', 'royal blue', 'mughal brocade', 'evening reception']
    },
    tags: ['Banarasi', 'Royal Blue', 'Brocade', 'Reception', 'Under ₹20000'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 1000,
    seo: { title: 'Banarasi Royal Midnight Blue Mughal Brocade | Sree Ram Silks', description: 'Banarasi silk saree in royal blue.' },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 11. Emerald Green Korvai Temple Kuttu Silk
  {
    _id: PROD_IDS.p11,
    name: 'Emerald Green Korvai Temple Kuttu Silk',
    slug: 'emerald-green-korvai-temple-kuttu-silk',
    sku: 'SRS-KUT-011',
    description: 'A heritage handloom silk saree created with interlocked temple border techniques (Korvai/Kuttu) in deep emerald green and rich magenta pink.',
    story: 'Authentic 3-shuttle Korvai weave preserving ancient temple architecture motifs.',
    price: 21500,
    mrp: 26000,
    categoryId: CAT_IDS.kuttu_korvai,
    collectionIds: [COL_IDS.royal, COL_IDS.festive],
    stock: 4,
    images: [
      { url: '/images/products/emerald_green_kuttu.png', isPrimary: true, alt: 'Emerald Green Korvai Saree' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#004B23',
      sheenColorHex: '#FF1493',
      roughness: 0.30,
      metalness: 0.50,
      clearcoat: 0.80
    },
    attributes: {
      fabric: 'Pure Handloom Silk',
      color: 'Emerald Green & Magenta',
      colors: ['Emerald Green', 'Magenta Pink', 'Gold'],
      pattern: 'Korvai Temple Spire Weave',
      occasion: 'Traditional Wedding & Temple Festivities',
      weave: 'Three-Shuttle Korvai Weave',
      border: 'Contrast Magenta Temple Border',
      length: '6.3 Meters',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['emerald green', 'magenta pink', 'gold'],
      fabric: ['silk', 'handloom silk', 'korvai silk'],
      motifs: ['temple spire', 'rudraksha', 'peacock'],
      pattern: 'temple korvai',
      border: { color: 'magenta gold', weight: 'heavy', type: 'interlocked temple kuttu' },
      zari: true,
      zariType: 'Tested Gold Zari',
      occasion: ['wedding', 'pooja', 'temple festival'],
      style: 'traditional heritage',
      visualEmbedding: [0.20, 0.88, 0.40, 0.65, 0.85, 0.38, 0.50, 0.30],
      palluDetails: 'Contrasting magenta pallu with solid gold zari bands'
    },
    tryOn: { enabled: true, supportedDrapes: ['Nivi', 'Gujarati', 'Maharashtrian'], recommendedDrape: 'Nivi' },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: { dominantColor: '#004B23', secondaryColor: '#FF1493', fabricConfidence: 0.98, motifCount: 40, borderWidthRatio: 0.22 },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 97, sareeVisibility: 99, garmentFidelity: 97, seoCompleteness: 95, overall: 97 },
      aiGeneratedStory: 'Heritage three-shuttle Korvai weave in emerald green and magenta.',
      tags: ['korvai', 'emerald green', 'temple border', 'handloom']
    },
    tags: ['Korvai', 'Emerald Green', 'Temple Weave', 'Festive'],
    featured: false,
    visible: true,
    archived: false,
    displayOrder: 1100,
    seo: { title: 'Emerald Green Korvai Temple Kuttu Silk | Sree Ram Silks', description: 'Handloom Korvai silk saree.' },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 12. Rose Gold Shimmering Tissue Silk
  {
    _id: PROD_IDS.p12,
    name: 'Rose Gold Shimmering Tissue Silk',
    slug: 'rose-gold-shimmering-tissue-silk',
    sku: 'SRS-TIS-012',
    description: 'A luminous tissue silk saree woven with metallic rose-gold and silver yarn, giving an iridescent glow perfect for modern brides and festive evenings.',
    story: 'Featherlight metallic threads interlace with pure silk for a show-stopping reflective sheen.',
    price: 14200,
    mrp: 17500,
    categoryId: CAT_IDS.tissue_silk,
    collectionIds: [COL_IDS.festive, COL_IDS.daily_luxe],
    stock: 5,
    images: [
      { url: '/images/products/rose_gold_tissue.png', isPrimary: true, alt: 'Rose Gold Tissue Silk Saree' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#B76E79',
      sheenColorHex: '#FFE4E1',
      roughness: 0.18,
      metalness: 0.80,
      clearcoat: 0.95
    },
    attributes: {
      fabric: 'Tissue Silk',
      color: 'Rose Gold',
      colors: ['Rose Gold', 'Silver'],
      pattern: 'Metallic Shimmer with Subtle Floral Buttis',
      occasion: 'Sangeet, Reception & Cocktail',
      weave: 'Metallic Warp Tissue Weave',
      border: 'Slender Rose-Gold Zari Border',
      length: '6.3 Meters',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['rose gold', 'metallic champagne', 'silver'],
      fabric: ['silk', 'tissue silk', 'metallic silk'],
      motifs: ['floral butti', 'shimmer wave'],
      pattern: 'all-over metallic tissue',
      border: { color: 'rose gold', weight: 'light', type: 'metallic border' },
      zari: true,
      zariType: 'Metallic Rose Gold Zari',
      occasion: ['sangeet', 'reception', 'cocktail', 'party'],
      style: 'contemporary glamour',
      visualEmbedding: [0.75, 0.60, 0.70, 0.40, 0.95, 0.30, 0.85, 0.50],
      palluDetails: 'Shimmering tissue pallu with delicate self-weave tassels'
    },
    tryOn: { enabled: true, supportedDrapes: ['Nivi', 'Modern', 'Bengali'], recommendedDrape: 'Nivi' },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: { dominantColor: '#B76E79', secondaryColor: '#FFE4E1', fabricConfidence: 0.97, motifCount: 30, borderWidthRatio: 0.12 },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 96, sareeVisibility: 99, garmentFidelity: 97, seoCompleteness: 95, overall: 97 },
      aiGeneratedStory: 'Luminous rose gold metallic tissue saree for sparkling celebrations.',
      tags: ['tissue silk', 'rose gold', 'sangeet saree', 'metallic sheen']
    },
    tags: ['Tissue Silk', 'Rose Gold', 'Metallic', 'Sangeet', 'Under ₹15000'],
    featured: false,
    visible: true,
    archived: false,
    displayOrder: 1200,
    seo: { title: 'Rose Gold Shimmering Tissue Silk | Sree Ram Silks', description: 'Rose gold tissue silk saree.' },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 13. Peacock Blue Chanderi Zari Border Silk
  {
    _id: PROD_IDS.p13,
    name: 'Peacock Blue Chanderi Zari Border Silk',
    slug: 'peacock-blue-chanderi-zari-silk',
    sku: 'SRS-CHN-013',
    description: 'A breathable, lightweight Chanderi pure silk cotton drape in vibrant peacock blue with fine gold zari borders and dainty geometric buttas.',
    story: 'Crafted in Madhya Pradesh, Chanderi sarees are prized for their featherlight comfort and translucent texture.',
    price: 7499,
    mrp: 9999,
    categoryId: CAT_IDS.mysore_chanderi,
    collectionIds: [COL_IDS.daily_luxe, COL_IDS.festive],
    stock: 8,
    images: [
      { url: '/images/products/peacock_blue_chanderi.png', isPrimary: true, alt: 'Peacock Blue Chanderi Saree' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#005F73',
      sheenColorHex: '#FFD700',
      roughness: 0.35,
      metalness: 0.35,
      clearcoat: 0.70
    },
    attributes: {
      fabric: 'Pure Chanderi Silk Cotton',
      color: 'Peacock Blue',
      colors: ['Peacock Blue', 'Gold'],
      pattern: 'Gold Coin Buttas',
      occasion: 'Office Party, Daytime Pooja & Festive',
      weave: 'Handloom Chanderi Weave',
      border: 'Fine Gold Zari Border',
      length: '6.3 Meters',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['peacock blue', 'gold'],
      fabric: ['silk', 'chanderi silk', 'silk cotton'],
      motifs: ['coin butta', 'zari line'],
      pattern: 'lightweight chanderi butta',
      border: { color: 'gold', weight: 'light', type: 'delicate zari border' },
      zari: true,
      zariType: 'Tested Zari',
      occasion: ['office event', 'pooja', 'daytime festive', 'summer party'],
      style: 'understated elegant',
      visualEmbedding: [0.18, 0.45, 0.85, 0.55, 0.70, 0.35, 0.60, 0.40],
      palluDetails: 'Horizontal gold zari stripes with fine tassels'
    },
    tryOn: { enabled: true, supportedDrapes: ['Nivi', 'Modern'], recommendedDrape: 'Nivi' },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: { dominantColor: '#005F73', secondaryColor: '#FFD700', fabricConfidence: 0.96, motifCount: 35, borderWidthRatio: 0.10 },
      aiQualityScore: { imageQuality: 97, metadataCompleteness: 96, sareeVisibility: 98, garmentFidelity: 96, seoCompleteness: 94, overall: 96 },
      aiGeneratedStory: 'Featherlight peacock blue Chanderi for all-day comfort.',
      tags: ['chanderi', 'peacock blue', 'under 10000', 'lightweight saree']
    },
    tags: ['Chanderi', 'Peacock Blue', 'Lightweight', 'Budget Luxe', 'Under ₹10000'],
    featured: false,
    visible: true,
    archived: false,
    displayOrder: 1300,
    seo: { title: 'Peacock Blue Chanderi Zari Border Silk | Sree Ram Silks', description: 'Lightweight Chanderi silk saree.' },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 14. Burgundy Velvet Border Designer Silk
  {
    _id: PROD_IDS.p14,
    name: 'Burgundy Velvet Border Designer Silk Saree',
    slug: 'burgundy-velvet-border-designer-silk',
    sku: 'SRS-VLV-014',
    description: 'A contemporary designer drape in rich burgundy wine silk paired with an opulent plush velvet border embroidered with antique zardozi work.',
    story: 'A showstopping evening fusion drape marrying traditional silk drape with plush winter velvet borders.',
    price: 11999,
    mrp: 14999,
    categoryId: CAT_IDS.organza_luxe,
    collectionIds: [COL_IDS.festive, COL_IDS.daily_luxe],
    stock: 5,
    images: [
      { url: '/images/products/burgundy_velvet_border.png', isPrimary: true, alt: 'Burgundy Velvet Border Saree' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#4A0E17',
      sheenColorHex: '#DAA520',
      roughness: 0.28,
      metalness: 0.40,
      clearcoat: 0.85
    },
    attributes: {
      fabric: 'Art Silk & Velvet',
      color: 'Burgundy Wine',
      colors: ['Burgundy Wine', 'Antique Gold'],
      pattern: 'Solid Silk with Zardozi Velvet Border',
      occasion: 'Winter Wedding, Reception & Soirée',
      weave: 'Designer Silk with Embroidered Border',
      border: 'Plush Velvet Zardozi Border',
      length: '6.3 Meters',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['burgundy wine', 'antique gold'],
      fabric: ['silk', 'designer silk', 'velvet'],
      motifs: ['zardozi', 'velvet patch', 'floral vine'],
      pattern: 'designer fusion',
      border: { color: 'burgundy gold', weight: 'heavy', type: 'velvet embroidered' },
      zari: true,
      zariType: 'Antique Zardozi Work',
      occasion: ['reception', 'winter wedding', 'cocktail party'],
      style: 'glamorous fusion',
      visualEmbedding: [0.82, 0.15, 0.28, 0.65, 0.80, 0.40, 0.70, 0.30],
      palluDetails: 'Solid burgundy drape with scalloped velvet zardozi end'
    },
    tryOn: { enabled: true, supportedDrapes: ['Nivi', 'Modern'], recommendedDrape: 'Modern' },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: { dominantColor: '#4A0E17', secondaryColor: '#DAA520', fabricConfidence: 0.96, motifCount: 25, borderWidthRatio: 0.18 },
      aiQualityScore: { imageQuality: 97, metadataCompleteness: 96, sareeVisibility: 98, garmentFidelity: 96, seoCompleteness: 94, overall: 96 },
      aiGeneratedStory: 'Opulent burgundy wine silk with plush embroidered velvet borders.',
      tags: ['burgundy', 'velvet border', 'designer saree', 'winter wedding']
    },
    tags: ['Designer Silk', 'Burgundy', 'Velvet Border', 'Reception', 'Under ₹15000'],
    featured: false,
    visible: true,
    archived: false,
    displayOrder: 1400,
    seo: { title: 'Burgundy Velvet Border Designer Silk | Sree Ram Silks', description: 'Designer burgundy silk saree with velvet border.' },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 15. Kota Doria Pastel Gold Zari Silk Saree (₹2,999)
  {
    _id: PROD_IDS.p15,
    name: 'Kota Doria Pastel Gold Zari Silk Saree',
    slug: 'kota-doria-pastel-gold-zari-silk',
    sku: 'SRS-KTA-015',
    description: 'Featherlight authentic Rajasthan Kota Doria semi-silk saree with airy square khat weave, delicate gold zari border, and subtle floral buttis.',
    story: 'Woven for effortless grace and breezy elegance, this Kota Doria is ideal for daytime poojas, workwear luxury, and festive gatherings.',
    price: 2999,
    mrp: 4499,
    categoryId: CAT_IDS.mysore_chanderi,
    collectionIds: [COL_IDS.daily_luxe, COL_IDS.festive],
    stock: 12,
    images: [
      { url: '/images/products/peacock_blue_chanderi.png', isPrimary: true, alt: 'Kota Doria Pastel Gold Saree' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#C5A059',
      sheenColorHex: '#F5E6CA',
      roughness: 0.35,
      metalness: 0.25,
      clearcoat: 0.70
    },
    attributes: {
      fabric: 'Kota Doria Silk Cotton',
      color: 'Pastel Champagne Gold',
      colors: ['Pastel Gold', 'Ivory'],
      pattern: 'Traditional Khat Check with Zari Border',
      occasion: 'Pooja, Daily Festive & Office Wear',
      weave: 'Handloom Kota Doria Khat Weave',
      border: 'Woven Fine Gold Zari Border',
      length: '6.3 Meters',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['gold', 'ivory', 'pastel gold'],
      fabric: ['kota doria', 'silk cotton', 'handloom'],
      motifs: ['khat check', 'fine zari', 'floral butti'],
      pattern: 'airy square khat',
      border: { color: 'gold', weight: 'light', type: 'fine zari border' },
      zari: true,
      zariType: 'Fine Tested Metallic Zari',
      occasion: ['pooja', 'daily wear', 'festive', 'office'],
      style: 'under 5000 budget lightweight',
      visualEmbedding: [0.35, 0.45, 0.70, 0.25, 0.50, 0.30, 0.40, 0.60],
      palluDetails: 'Airy woven khat pallu with zari stripes'
    },
    tryOn: { enabled: true, supportedDrapes: ['Nivi', 'Modern', 'Gujarati'], recommendedDrape: 'Nivi' },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: { dominantColor: '#C5A059', secondaryColor: '#F5E6CA', fabricConfidence: 0.98, motifCount: 15, borderWidthRatio: 0.08 },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 98, sareeVisibility: 98, garmentFidelity: 97, seoCompleteness: 96, overall: 97 },
      aiGeneratedStory: 'Airy Rajasthan Kota Doria with graceful gold zari borders at a budget-friendly price point.',
      tags: ['kota doria', 'under 5000', 'budget saree', 'pastel gold', 'pooja wear']
    },
    tags: ['Kota Doria', 'Pastel Gold', 'Under ₹5000', 'Budget Handloom', 'Daily Festive'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 1500,
    seo: { title: 'Kota Doria Pastel Gold Zari Silk Saree | Sree Ram Silks', description: 'Affordable Kota Doria handloom saree under ₹3000.' },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 16. Kanjeevaram Art Silk Traditional Wedding Saree (₹3,499)
  {
    _id: PROD_IDS.p16,
    name: 'Kanjeevaram Art Silk Traditional Wedding Saree',
    slug: 'kanjeevaram-artsilk-traditional-wedding',
    sku: 'SRS-ART-016',
    description: 'Grand festive South Indian Kanjeevaram art silk drape in royal vermilion crimson with rich gold zari peacock motifs and temple korvai borders.',
    story: 'Created to deliver authentic bridal majesty at an accessible price point, pairing rich luster with comfortable drape fall.',
    price: 3499,
    mrp: 5999,
    categoryId: CAT_IDS.kanchi_bridal,
    collectionIds: [COL_IDS.bridal, COL_IDS.festive],
    stock: 15,
    images: [
      { url: '/images/products/kanchipuram_red_gold.png', isPrimary: true, alt: 'Kanjeevaram Art Silk Saree' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#8B0000',
      sheenColorHex: '#FFD700',
      roughness: 0.22,
      metalness: 0.45,
      clearcoat: 0.90
    },
    attributes: {
      fabric: 'Art Silk',
      color: 'Vermilion Red & Gold',
      colors: ['Vermilion Red', '24K Gold Zari'],
      pattern: 'Traditional Temple Korvai Brocade',
      occasion: 'Wedding, Muhurtham & Festive',
      weave: 'Jacquard Art Silk Brocade',
      border: 'Grand Temple Korvai Border',
      length: '6.3 Meters',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['vermilion red', 'gold', 'crimson'],
      fabric: ['art silk', 'kanjeevaram style', 'brocade'],
      motifs: ['peacock', 'temple border', 'kamalam butti'],
      pattern: 'temple brocade',
      border: { color: 'gold', weight: 'heavy', type: 'temple korvai' },
      zari: true,
      zariType: 'Lustrous Gold Zari Weave',
      occasion: ['wedding', 'muhurtham', 'festive', 'temple'],
      style: 'bridal majesty under 5000',
      visualEmbedding: [0.90, 0.10, 0.15, 0.85, 0.92, 0.50, 0.85, 0.40],
      palluDetails: 'Rich grand brocade pallu with twin peacocks'
    },
    tryOn: { enabled: true, supportedDrapes: ['Nivi', 'Modern', 'Seedha Pallu'], recommendedDrape: 'Nivi' },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: { dominantColor: '#8B0000', secondaryColor: '#FFD700', fabricConfidence: 0.97, motifCount: 30, borderWidthRatio: 0.22 },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 98, sareeVisibility: 99, garmentFidelity: 98, seoCompleteness: 96, overall: 98 },
      aiGeneratedStory: 'Grand South Indian temple brocade art silk saree for wedding ceremonies under ₹5000.',
      tags: ['kanjeevaram', 'art silk', 'under 5000', 'wedding saree', 'red gold']
    },
    tags: ['Kanjeevaram', 'Art Silk', 'Under ₹5000', 'Wedding', 'Red Saree'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 1600,
    seo: { title: 'Kanjeevaram Art Silk Traditional Wedding Saree | Sree Ram Silks', description: 'Affordable bridal Kanjeevaram art silk saree under ₹5000.' },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 17. Pochampally Handloom Cotton Silk Saree (₹3,899)
  {
    _id: PROD_IDS.p17,
    name: 'Pochampally Handloom Cotton Silk Saree',
    slug: 'pochampally-handloom-cotton-silk',
    sku: 'SRS-POC-017',
    description: 'Telangana authentic double ikat handloom drape blending breathable cotton warp with lustrous silk weft, featuring geometric diamond patterns.',
    story: 'Woven by master ikat artisans in Bhoodan Pochampally, offering versatile elegance from morning ceremonies to evening celebrations.',
    price: 3899,
    mrp: 5499,
    categoryId: CAT_IDS.pochampally_patola,
    collectionIds: [COL_IDS.festive, COL_IDS.daily_luxe],
    stock: 9,
    images: [
      { url: '/images/products/pochampally_ikat_geometric.png', isPrimary: true, alt: 'Pochampally Cotton Silk Saree' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#008080',
      sheenColorHex: '#DAA520',
      roughness: 0.30,
      metalness: 0.35,
      clearcoat: 0.78
    },
    attributes: {
      fabric: 'Cotton Silk Handloom',
      color: 'Teal & Mustard Yellow',
      colors: ['Teal Green', 'Mustard Yellow', 'Black'],
      pattern: 'Double Ikat Geometric Diamond',
      occasion: 'Festive, Haldi & Casual Celebration',
      weave: 'Authentic Pochampally Double Ikat',
      border: 'Contrast Mustard Zari Border',
      length: '6.3 Meters',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['teal', 'mustard yellow', 'black'],
      fabric: ['cotton silk', 'pochampally', 'ikat', 'handloom'],
      motifs: ['geometric diamond', 'ikat chevrons', 'rudraksha'],
      pattern: 'double ikat weave',
      border: { color: 'mustard gold', weight: 'medium', type: 'woven ikat border' },
      zari: true,
      zariType: 'Fine Tested Zari',
      occasion: ['festive', 'haldi', 'pooja', 'daily festive'],
      style: 'handloom ikat under 5000',
      visualEmbedding: [0.20, 0.65, 0.60, 0.70, 0.65, 0.45, 0.60, 0.50],
      palluDetails: 'Geometric ikat grid pallu with tassel finishing'
    },
    tryOn: { enabled: true, supportedDrapes: ['Nivi', 'Modern', 'Bengali'], recommendedDrape: 'Nivi' },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: { dominantColor: '#008080', secondaryColor: '#DAA520', fabricConfidence: 0.98, motifCount: 22, borderWidthRatio: 0.14 },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 98, sareeVisibility: 98, garmentFidelity: 97, seoCompleteness: 95, overall: 97 },
      aiGeneratedStory: 'Artisanal Telangana double ikat cotton silk drape under ₹5000.',
      tags: ['pochampally', 'cotton silk', 'under 5000', 'double ikat', 'teal yellow']
    },
    tags: ['Pochampally', 'Cotton Silk', 'Under ₹5000', 'Double Ikat', 'Handloom'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 1700,
    seo: { title: 'Pochampally Handloom Cotton Silk Saree | Sree Ram Silks', description: 'Authentic Pochampally cotton silk saree under ₹5000.' },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 18. Chanderi Daily Luxe Printed Silk Saree (₹4,499)
  {
    _id: PROD_IDS.p18,
    name: 'Chanderi Daily Luxe Printed Silk Saree',
    slug: 'chanderi-daily-luxe-printed-silk',
    sku: 'SRS-CHN-018',
    description: 'Madhya Pradesh lightweight Chanderi pure silk cotton drape in pastel sage mint with delicate floral bootas and gold tissue pallu.',
    story: 'An imperial classic crafted for summer soirees and daytime celebrations with a weightless sheer drape.',
    price: 4499,
    mrp: 6999,
    categoryId: CAT_IDS.mysore_chanderi,
    collectionIds: [COL_IDS.daily_luxe, COL_IDS.festive],
    stock: 8,
    images: [
      { url: '/images/products/peacock_blue_chanderi.png', isPrimary: true, alt: 'Chanderi Printed Silk Saree' }
    ],
    threeDAsset: {
      modelUrl: '',
      colorHex: '#87A96B',
      sheenColorHex: '#F0E68C',
      roughness: 0.28,
      metalness: 0.32,
      clearcoat: 0.82
    },
    attributes: {
      fabric: 'Chanderi Silk Cotton',
      color: 'Sage Mint & Gold',
      colors: ['Sage Mint Green', 'Antique Gold'],
      pattern: 'Hand-block Floral Boota with Zari Tissue',
      occasion: 'Day Wedding, Pooja & Sangeet',
      weave: 'Handwoven Chanderi Sheer Weave',
      border: 'Woven Antique Gold Tissue Border',
      length: '6.3 Meters',
      blousePiece: true
    },
    sareeDNA: {
      colors: ['sage mint', 'green', 'gold'],
      fabric: ['chanderi', 'silk cotton', 'chanderi silk'],
      motifs: ['floral boota', 'zari tissue', 'leaf vine'],
      pattern: 'sheer floral boota',
      border: { color: 'antique gold', weight: 'medium', type: 'zari tissue border' },
      zari: true,
      zariType: 'Antique Gold Zari',
      occasion: ['day wedding', 'pooja', 'sangeet', 'festive'],
      style: 'lightweight luxury under 5000',
      visualEmbedding: [0.40, 0.70, 0.50, 0.60, 0.75, 0.35, 0.55, 0.45],
      palluDetails: 'Tissue gold woven pallu with floral motifs'
    },
    tryOn: { enabled: true, supportedDrapes: ['Nivi', 'Modern'], recommendedDrape: 'Modern' },
    ai: {
      analysisStatus: 'COMPLETED',
      detectedAttributes: { dominantColor: '#87A96B', secondaryColor: '#F0E68C', fabricConfidence: 0.98, motifCount: 18, borderWidthRatio: 0.12 },
      aiQualityScore: { imageQuality: 98, metadataCompleteness: 98, sareeVisibility: 98, garmentFidelity: 98, seoCompleteness: 96, overall: 98 },
      aiGeneratedStory: 'Lightweight sage mint Chanderi silk with gold tissue border under ₹5000.',
      tags: ['chanderi', 'under 5000', 'sage mint', 'tissue border', 'summer wedding']
    },
    tags: ['Chanderi', 'Sage Mint', 'Under ₹5000', 'Silk Cotton', 'Summer Wedding'],
    featured: true,
    visible: true,
    archived: false,
    displayOrder: 1800,
    seo: { title: 'Chanderi Daily Luxe Printed Silk Saree | Sree Ram Silks', description: 'Chanderi silk cotton saree under ₹5000.' },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// ─── Seed Admin ──────────────────────────────────────────────────────────────
export const seedAdmin = {
  name: 'VASRĀ Showroom Admin',
  email: 'admin@sreeramsilks.com',
  passwordHash: '$2a$10$7Z2v7vR6K8dY8Z8e0Y.2u.V1q7m.qK1k6G4x8e0Y.2u.V1q7m.qK',
  role: 'SUPER_ADMIN',
  status: 'ACTIVE'
};

// ─── Seed Homepage ────────────────────────────────────────────────────────────
export const seedHomepage = {
  hero: {
    title: 'VASRĀ AI',
    subtitle: 'AI-Native 3D Digital Saree Showroom & Agentic Commerce.',
    badgeText: 'Powered by NVIDIA Nemotron-70B & 3D Spatial Silk Twin Engine',
    ctaText: 'Ask AI Stylist',
    ctaLink: '/catalog',
    secondaryCtaText: 'Explore 3D Showroom',
    secondaryCtaLink: '/catalog',
    backgroundStyle: '3D_SILK',
  },
  sections: [
    { id: 'sec-hero', type: 'hero', title: 'Cinematic 3D Hero', enabled: true, order: 100 },
    { id: 'sec-categories', type: 'categories', title: 'Curated Heritage Traditions', subtitle: 'Explore Handwoven Masterpieces', enabled: true, order: 200 },
    { id: 'sec-featured', type: 'featured_collection', title: 'Imperial Masterpieces', subtitle: 'Hand-picked AI Recommended Drapes', enabled: true, order: 300 },
    { id: 'sec-heritage', type: 'heritage_story', title: 'The Craftsmanship', subtitle: 'Centuries of Indian Weaving Mastery', enabled: true, order: 400 },
    { id: 'sec-promo', type: 'promo_banner', title: 'Virtual Try-On Suite', subtitle: 'Visualize any saree draped on your photo in seconds', enabled: true, order: 500 },
  ],
};
