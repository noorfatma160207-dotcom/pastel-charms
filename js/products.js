// ==========================================
// Pastel Charms - Product Catalog Data
// Easily edit products, prices in ₹, categories, and descriptions here!
// ==========================================

const CATEGORIES = [
  { id: 'all', name: 'All Cute Things', icon: '✨', count: 12 },
  { id: 'bracelets', name: 'Bracelets', icon: '💎', count: 4, desc: 'Handcrafted bead & charm bracelets with customizable letters' },
  { id: 'pipe-flowers', name: 'Pipe Cleaner Flowers', icon: '🌸', count: 3, desc: 'Fluffy, everlasting handmade pipe cleaner blooms' },
  { id: 'roses', name: 'Handmade Roses', icon: '🌹', count: 2, desc: 'Intricately folded satin & velvet ribbon keepsake roses' },
  { id: 'custom-gifts', name: 'Custom Gifts', icon: '🎀', count: 2, desc: 'Aesthetic hampers and personalized gift bundles for besties' },
  { id: 'crafts', name: 'Other Crafts', icon: '✨', count: 2, desc: 'Phone charms, crochet keychains, and cute desk buddies' }
];

const PRODUCTS = [
  {
    id: 'pc-01',
    name: 'Custom Name Bead Bracelet',
    category: 'bracelets',
    categoryName: 'Bracelets',
    price: 50,
    originalPrice: 65,
    rating: 4.9,
    reviewsCount: 48,
    badge: 'Best Seller',
    customizable: true,
    isNew: false,
    shortDesc: 'Handmade elastic bead bracelet customized with your name or initials ♡',
    description: 'Our signature beaded bracelet made with high-quality pastel acrylic beads, durable elastic cord, and your custom name or initials. Perfect for daily college wear, cute stacking, or matching with your best friend!',
    image: 'https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '💎',
    materials: 'High-grade stretch cord, pastel acrylic beads, custom letter charms',
    deliveryTime: '1-2 days on campus',
    tags: ['bracelet', 'custom', 'name', 'beads', 'pastel', 'friendship', 'bestseller']
  },
  {
    id: 'pc-02',
    name: 'Evil Eye Charm Bracelet',
    category: 'bracelets',
    categoryName: 'Bracelets',
    price: 60,
    originalPrice: 75,
    rating: 5.0,
    reviewsCount: 52,
    badge: 'Best Seller',
    customizable: true,
    isNew: false,
    shortDesc: 'Aesthetic protective glass evil eye bead with gold spacer accents.',
    description: 'Ward off negative energy and bad exam vibes with this delicate evil eye bracelet. Made with a vibrant royal blue or blush pink glass evil eye bead, tiny metallic spacer beads, and subtle pastel seed beads. Adjustable fit for all wrist sizes.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🧿',
    materials: 'Glass evil eye talisman, gold-tone non-tarnish beads, nylon cord',
    deliveryTime: 'Same day campus pickup available',
    tags: ['evil eye', 'bracelet', 'protection', 'aesthetic', 'gold']
  },
  {
    id: 'pc-03',
    name: 'Black & Silver Minimalist Bracelet',
    category: 'bracelets',
    categoryName: 'Bracelets',
    price: 50,
    originalPrice: 60,
    rating: 4.8,
    reviewsCount: 29,
    badge: 'Popular',
    customizable: true,
    isNew: false,
    shortDesc: 'Sleek monochrome obsidian-style beads with metallic silver stars.',
    description: 'Understated and chic. Features matte black beads paired with shiny silver spacer beads and a dainty silver star or heart charm. Universally flattering, looks amazing with watches and hoodies!',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🖤',
    materials: 'Matte black lava/acrylic beads, silver alloy charms, durable cord',
    deliveryTime: '1 day',
    tags: ['black', 'silver', 'minimal', 'bracelet', 'unisex', 'y2k']
  },
  {
    id: 'pc-04',
    name: 'Pastel Pearl Daisy Bracelet',
    category: 'bracelets',
    categoryName: 'Bracelets',
    price: 55,
    originalPrice: 70,
    rating: 4.9,
    reviewsCount: 23,
    badge: 'Cute Pick',
    customizable: true,
    isNew: true,
    shortDesc: 'Faux pearls woven into dainty little daisy blossoms with pastel centers.',
    description: 'Super sweet cottagecore vibes! Each tiny daisy is delicately hand-woven with creamy mini pearls and soft yellow or baby pink seed bead centers. Looks stunning layered with other bracelets.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🌼',
    materials: 'Creamy faux pearls, glass seed beads, lobster claw clasp or elastic',
    deliveryTime: '1-2 days',
    tags: ['pearl', 'daisy', 'flower', 'pastel', 'cottagecore', 'bracelet']
  },
  {
    id: 'pc-05',
    name: 'Pipe Cleaner Everlasting Daisy',
    category: 'pipe-flowers',
    categoryName: 'Pipe Cleaner Flowers',
    price: 35,
    originalPrice: 45,
    rating: 5.0,
    reviewsCount: 64,
    badge: 'Best Seller',
    customizable: true,
    isNew: false,
    shortDesc: 'A flower that never wilts! Hand-crafted fluffy pastel daisy with leaf stem.',
    description: 'Adorably soft and whimsical pipe cleaner flower on a bendable green stem. You can choose white petals, baby pink, lilac, or butter yellow petals with a sunshine yellow center. Perfect desk companion or sweet gift for college friends!',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🌸',
    materials: 'Velvety plush pipe cleaners, floral wire stem, cute ribbon tie',
    deliveryTime: 'Same day campus handoff',
    tags: ['pipe cleaner', 'flower', 'daisy', 'handmade', 'gift', 'cute', 'forever flower']
  },
  {
    id: 'pc-06',
    name: 'Fluffy Pipe Cleaner Tulip Bouquet',
    category: 'pipe-flowers',
    categoryName: 'Pipe Cleaner Flowers',
    price: 75,
    originalPrice: 95,
    rating: 4.9,
    reviewsCount: 38,
    badge: 'Trending',
    customizable: true,
    isNew: true,
    shortDesc: 'Trio of soft velvet tulips wrapped in aesthetic Korean floral paper.',
    description: 'An everlasting mini bouquet featuring 3 plush handcrafted pipe cleaner tulips (Blush Pink, Buttercup Yellow, and Lilac) wrapped carefully in waterproof matte Korean floral paper with a satin bow.',
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🌷',
    materials: 'Plush velvet chenille stems, floral tape, Korean matte wrapping paper',
    deliveryTime: '1-2 days',
    tags: ['tulip', 'bouquet', 'pipe cleaner', 'korean style', 'aesthetic']
  },
  {
    id: 'pc-07',
    name: 'Baby Blossom Flower Pot Desk Buddy',
    category: 'pipe-flowers',
    categoryName: 'Pipe Cleaner Flowers',
    price: 65,
    originalPrice: 80,
    rating: 4.8,
    reviewsCount: 19,
    badge: 'New',
    customizable: false,
    isNew: true,
    shortDesc: 'Mini terracotta pot planted with cute fuzzy blossoms for your study desk.',
    description: 'Brighten up your dorm desk or study table! A miniature hand-painted pot featuring 3 colorful mini blooms with green leaves. Zero watering required, 100% cute serotonin boost every time you study.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🪴',
    materials: 'Mini terracotta pot, chenille stems, floral foam base',
    deliveryTime: '1 day',
    tags: ['pot', 'desk decor', 'dorm', 'flowers', 'cute']
  },
  {
    id: 'pc-08',
    name: 'Handmade Velvet Ribbon Rose',
    category: 'roses',
    categoryName: 'Handmade Roses',
    price: 35,
    originalPrice: 50,
    rating: 5.0,
    reviewsCount: 47,
    badge: 'Best Seller',
    customizable: true,
    isNew: false,
    shortDesc: 'Single handcrafted rose folded petal-by-petal from satin velvet ribbon.',
    description: 'Each rose is delicately assembled by hand with over 20 shimmering ribbon petals. Lasts forever and never fades. Available in Romantic Crimson, Baby Pink, Cream Ivory, and Black Rose.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🌹',
    materials: 'Heavy satin ribbon, leaf embellishments, floral stem, shimmer finish',
    deliveryTime: 'Same day campus handoff',
    tags: ['rose', 'satin', 'ribbon rose', 'forever flower', 'gift', 'romantic']
  },
  {
    id: 'pc-09',
    name: 'Blush Pink Ribbon Rose Duo',
    category: 'roses',
    categoryName: 'Handmade Roses',
    price: 65,
    originalPrice: 85,
    rating: 4.9,
    reviewsCount: 26,
    badge: 'Cute Pick',
    customizable: true,
    isNew: false,
    shortDesc: 'Two paired blush pink & ivory handmade roses with a glitter crown.',
    description: 'A darling set of two hand-folded ribbon roses crowned with miniature pearl pins and wrapped in translucent tracing paper with an organza bow.',
    image: 'https://images.unsplash.com/photo-1548625361-16eb16260a93?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🥀',
    materials: 'Silky satin ribbons, faux pearl pins, organza ribbon',
    deliveryTime: '1 day',
    tags: ['rose set', 'pink', 'ivory', 'aesthetic', 'ribbon']
  },
  {
    id: 'pc-10',
    name: 'Bestie Sunshine Custom Gift Hamper',
    category: 'custom-gifts',
    categoryName: 'Custom Gifts',
    price: 120,
    originalPrice: 160,
    rating: 5.0,
    reviewsCount: 34,
    badge: 'Best Value',
    customizable: true,
    isNew: true,
    shortDesc: 'Includes 1 custom bracelet, 1 pipe cleaner flower, stickers & gift card ♡',
    description: 'The ultimate affordable birthday or appreciation gift for your college bestie! Packaged in a cute craft box with crinkle paper, includes: 1 personalized name bracelet, 1 pipe cleaner flower of your choice, cute vinyl stickers, and a handwritten mini love card.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🎁',
    materials: 'Kraft gift box, aesthetic crinkle paper, customized items, handwritten card',
    deliveryTime: '2 days (custom prepared)',
    tags: ['gift set', 'hamper', 'bestie', 'birthday', 'custom bundle']
  },
  {
    id: 'pc-11',
    name: 'Mini Birthday Surprise Craft Box',
    category: 'custom-gifts',
    categoryName: 'Custom Gifts',
    price: 100,
    originalPrice: 130,
    rating: 4.8,
    reviewsCount: 21,
    badge: 'Gift Pick',
    customizable: true,
    isNew: false,
    shortDesc: 'Cute mystery craft box with 2 bracelets, mini flower, and sweet treats.',
    description: 'Give a magical unboxing moment! Contains two coordinating bracelets, a handmade mini rose or daisy, aesthetic stickers, and sweet treats in a pastel gift bag.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🎀',
    materials: 'Pastel gift packaging, twin bracelets, craft flower, stickers',
    deliveryTime: '1-2 days',
    tags: ['surprise box', 'gifts', 'bundle', 'affordable', 'cute']
  },
  {
    id: 'pc-12',
    name: 'Aesthetic Beaded Phone Charm Strap',
    category: 'crafts',
    categoryName: 'Other Crafts',
    price: 40,
    originalPrice: 55,
    rating: 4.9,
    reviewsCount: 39,
    badge: 'Trending',
    customizable: true,
    isNew: false,
    shortDesc: 'Y2K pastel beaded wrist strap with heart, butterfly & pearl charms.',
    description: 'Loop it onto your phone case, bag zip, or camera! Hand-strung with durable cord, pastel acrylic hearts, butterfly beads, and glossy pearls. Keeps your phone secure and looking adorable.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '✨',
    materials: 'Heavy-duty nylon lanyard loop, acrylic beads, faux pearls',
    deliveryTime: 'Same day campus pickup',
    tags: ['phone charm', 'strap', 'y2k', 'beads', 'cute', 'butterfly']
  }
];

const SAMPLE_COLLEGES = [
  'Delhi University (North / South Campus)',
  'IIT Delhi / IIT Bombay / IIT Madras',
  'BITS Pilani / Goa / Hyderabad',
  'Christ University, Bangalore',
  'Manipal Academy of Higher Education (MAHE)',
  'SRM University / VIT Vellore / Chennai',
  'Mumbai University & Mithibai / NMIMS',
  'Symbiosis International University, Pune',
  'St. Xavier\'s College',
  'Ashoka University',
  'Amity University',
  'Other / Local College (Enter Below)'
];

const REVIEWS = [
  {
    name: 'Ananya S.',
    college: 'Delhi University, Miranda House',
    rating: 5,
    date: '2 days ago',
    avatar: '🌸',
    text: 'Ordered custom name bracelets for me and my roommate! They arrived in the cutest little pastel bag with free stickers. The beads are so high quality and fit perfectly ♡',
    item: 'Custom Name Bead Bracelet'
  },
  {
    name: 'Rhea M.',
    college: 'Christ University, Bangalore',
    rating: 5,
    date: '1 week ago',
    avatar: '🌷',
    text: 'The pipe cleaner tulip bouquet is sitting on my study table and it makes me smile every day. Never dying flowers are the best thing for a lazy college student!',
    item: 'Fluffy Pipe Cleaner Tulip Bouquet'
  },
  {
    name: 'Tanvi K.',
    college: 'Mithibai College, Mumbai',
    rating: 5,
    date: '2 weeks ago',
    avatar: '✨',
    text: 'Gave the Bestie Sunshine hamper to my friend for her birthday. She literally cried happy tears! Super affordable and so much love put into the packaging.',
    item: 'Bestie Sunshine Custom Gift Hamper'
  },
  {
    name: 'Aarav P.',
    college: 'IIT Bombay',
    rating: 5,
    date: '3 weeks ago',
    avatar: '🖤',
    text: 'Got the Black & Silver minimalist bracelet. Very clean, fits comfortably, and got delivered to hostel 14 within 24 hours. Highly recommended!',
    item: 'Black & Silver Minimalist Bracelet'
  }
];

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?auto=format&fit=crop&w=600&q=80',
    caption: 'Fresh batch of custom name bracelets heading to North Campus today! Which color palette is your fav? ♡✨',
    likes: 342,
    comments: 28
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80',
    caption: 'Fuzzy pipe cleaner daisies blooming in pastel pink & sunshine yellow 🌸 Forever flowers for your soulmate.',
    likes: 489,
    comments: 42
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80',
    caption: 'Evil eye protection on deck ✨ Keeping away all negative exam energy!',
    likes: 295,
    comments: 19
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
    caption: 'Crimson & Blush ribbon roses folded petal-by-petal. Who would you gift this to? 🌹',
    likes: 512,
    comments: 57
  }
];

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

const BUSINESS_CONFIG = {
  name: 'Pastel Charms',
  brandShort: 'Pastel Charms',
  tagline: 'Handmade with love, made just for you ♡',
  subheading: 'Cute handmade bracelets, flowers & little things made to make your day a little more special.',
  whatsappNumber: '919876543210',
  instagramHandle: 'pastelcharms.crafts',
  email: 'hello.pastelcharms@gmail.com',
  currency: '₹',
  startingPrice: 35,
  locationNote: 'Free handoff on campus & student-friendly doorstep delivery 🌸'
};

if (typeof window !== 'undefined') {
  window.CATEGORIES = CATEGORIES;
  window.PRODUCTS = PRODUCTS;
  window.SAMPLE_COLLEGES = SAMPLE_COLLEGES;
  window.REVIEWS = REVIEWS;
  window.INSTAGRAM_POSTS = INSTAGRAM_POSTS;
  window.BUSINESS_CONFIG = BUSINESS_CONFIG;
  window.getProductById = getProductById;
}
