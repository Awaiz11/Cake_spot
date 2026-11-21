/**
 * Single source of truth for Cake Spot brand content.
 * Sourced from cakespot.pk (Lahore) public listing + product catalogue.
 */

export const BRAND = {
  name: "Cake Spot",
  handle: "@cakespot.pk",
  instagram: "https://www.instagram.com/cakespot.pk",
  facebook: "https://www.facebook.com/cakespot.pk/",
  site: "https://cakespot.pk",
  phoneDisplay: "+92 307 2445458",
  whatsapp: "923072445458",
  email: "cakespot.pk@gmail.com",
  addressLine: "Block K, Gulberg III",
  city: "Lahore, Pakistan",
  hours: "Every day · 7:00 AM – 2:00 AM",
  rating: 4.9,
  reviewCount: 570,
} as const;

export function waLink(message: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

type Ext = "jpeg" | "png";

/** Cake Spot's own photos (cakespot.pk), keyed by the slot id used across the site. */
const CAKESPOT_UPLOADS = "https://cakespot.pk/wp-content/uploads/";
const REAL_PHOTOS: Record<number, string> = {
  // Teddy Bear
  30668691: "2025/11/Lumii_20251102_115741538-scaled.jpg",
  29964261: "2025/07/Lumii_20241117_144634172-scaled.jpg",
  10577002: "2025/05/Lumii_20250315_211705144.jpg",
  17939214: "2025/07/Lumii_20250413_193624650.jpg",
  // Anniversary
  31793674: "2025/07/IMG_20250705_001503-scaled.jpg",
  33695614: "2025/07/IMG_20250705_001603-scaled.jpg",
  33755869: "2025/07/Lumii_20241105_170239378-scaled.jpg",
  1051089: "2025/07/d8ba155c52176bf56ae31bdae5856a61.jpg",
  // Birthdays
  18745770: "2025/07/Lumii_20250109_214213656.jpg",
  28815810: "2025/11/Lumii_20251105_004932645-scaled.jpg",
  32191353: "2025/07/Lumii_20240627_210238201.jpg",
  40268501: "2025/09/IMG-20250901-WA0077.jpg",
  // Floral & Minimal
  29051734: "2025/07/Lumii_20250126_184452608.jpg",
  31909818: "2025/03/Lumii_20250129_182605574-scaled.jpg",
  27176367: "2025/07/Lumii_20250502_170530524.jpg",
  34723391: "2025/07/Lumii_20250426_192710911.jpg",
  // Kids & Theme
  10336820: "2025/05/IMG20230903125836-scaled.jpg",
  25559070: "2025/07/Lumii_20241224_082010986-scaled.jpg",
  32370565: "2025/07/Lumii_20241123_173630253-scaled.jpg",
  29533829: "2025/07/Lumii_20250224_080707045-scaled.jpg",
  // Instagram strip
  35472159: "2025/07/Lumii_20240408_004546662.jpg",
  7450957: "2025/03/Lumii_20250209_135642111-1.webp",
  28487973: "2025/07/Lumii_20241127_150658141.jpg",
  5365902: "2025/09/IMG-20250816-WA0103.jpg",
  31009164: "2025/07/Dholki-cake-2.webp",
  // Craft + order form
  6996363: "2025/07/Lumii_20250621_141357374.jpg",
  14050799: "2025/07/IMG_20241116_200422.jpg",
  3983576: "2025/09/43c25756423b6faf47f756ac3efe4f4d.jpg",
};

/** Small slots get the 650px thumbnail, large slots the full photo. */
export function photo(id: number, ext: Ext, w: number) {
  const real = REAL_PHOTOS[id];
  if (real) {
    return CAKESPOT_UPLOADS + (w <= 620 ? real.replace(/\.(jpg|webp)$/, "-650x650.$1") : real);
  }
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&w=${w}`;
}

/* ─────────────────────────────────────────────────────────────────
   Categories
   ───────────────────────────────────────────────────────────────── */

export const CATEGORIES = [
  "All",
  "Teddy Bear",
  "Anniversary",
  "Birthdays",
  "Floral & Minimal",
  "Kids & Theme",
] as const;

export type Category = (typeof CATEGORIES)[number];

/* ─────────────────────────────────────────────────────────────────
   Gallery
   ───────────────────────────────────────────────────────────────── */

export type Cake = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  photoId: number;
  ext: Ext;
  ratio: "portrait" | "tall" | "square" | "wide";
  serves: string;
  weight: string;
  flavour: string;
  finish: string;
  note: string;
  price: string;
};

export const CAKES: Cake[] = [
  {
    id: "teddy-cloud",
    title: "Teddy in Clouds",
    category: "Teddy Bear",
    photoId: 30668691,
    ext: "jpeg",
    ratio: "tall",
    serves: "12–14 guests",
    weight: "2 kg",
    flavour: "Cadbury Chocolate",
    finish: "Hand-sculpted fondant bear, piped pearl border",
    note: "Our most-ordered design. The bear is sculpted the same morning, never pre-made.",
    price: "from PKR 7,000",
  },
  {
    id: "teddy-bonnet",
    title: "Bonnet & Booties",
    category: "Teddy Bear",
    photoId: 29964261,
    ext: "jpeg",
    ratio: "portrait",
    serves: "10–12 guests",
    weight: "1.5 kg",
    flavour: "Vanilla Crunch",
    finish: "Cashmere-blue buttercream, twin bears, sugar booties",
    note: "Built for baby showers — matches any nursery palette on request.",
    price: "from PKR 8,400",
  },
  {
    id: "teddy-balloon",
    title: "Teddy's First Flight",
    category: "Teddy Bear",
    photoId: 10577002,
    ext: "jpeg",
    ratio: "tall",
    serves: "18–20 guests",
    weight: "3 kg / two tier",
    flavour: "Butterscotch",
    note: "Hot-air balloon topper with a hand-moulded bear basket.",
    finish: "Two tiers, sky-blue combs and isomalt balloon",
    price: "from PKR 3,000",
  },
  {
    id: "teddy-cocoa",
    title: "Cocoa Bear",
    category: "Teddy Bear",
    photoId: 17939214,
    ext: "jpeg",
    ratio: "square",
    serves: "8–10 guests",
    weight: "1 kg",
    flavour: "Chocolate Fudge",
    finish: "Chocolate-moulded bear, gold-dust shimmer",
    note: "A smaller love — perfect for a surprise weekday visit.",
    price: "from PKR 3,000",
  },
  {
    id: "anniversary-25",
    title: "Twenty-Five, Still Sweet",
    category: "Anniversary",
    photoId: 31793674,
    ext: "jpeg",
    ratio: "tall",
    serves: "22–25 guests",
    weight: "3.5 kg / two tier",
    flavour: "Red Velvet",
    finish: "Silver-leaf numerals, garden roses, hand-tied ribbon",
    note: "Our signature silver & gold anniversary — 25th, 50th, anything in between.",
    price: "from PKR 3,000",
  },
  {
    id: "anniversary-crown",
    title: "Gilded Crown",
    category: "Anniversary",
    photoId: 33695614,
    ext: "jpeg",
    ratio: "portrait",
    serves: "14–16 guests",
    weight: "2.5 kg",
    flavour: "Caramel Crunch",
    finish: "24k gold crown, string-pearl piping",
    note: "Made for the one who hosts everything.",
    price: "from PKR 3,000",
  },
  {
    id: "anniversary-rose",
    title: "One Rose, One Promise",
    category: "Anniversary",
    photoId: 33755869,
    ext: "png",
    ratio: "square",
    serves: "10 guests",
    weight: "1.5 kg",
    flavour: "Chocolate Fudge",
    finish: "Single sugar rose, hand-painted butterfly, cream crumb coat",
    note: "Proof that restraint reads more expensive than excess.",
    price: "from PKR 3,000",
  },
  {
    id: "anniversary-three-tier",
    title: "The Long Gold Table",
    category: "Anniversary",
    photoId: 1051089,
    ext: "jpeg",
    ratio: "square",
    serves: "40–45 guests",
    weight: "6 kg / three tier",
    flavour: "Cadbury Chocolate",
    finish: "Three tiers, brushed gold leaf, piped beaded base",
    note: "Engagements and big family anniversaries. Delivered assembled.",
    price: "from PKR 3,000",
  },
  {
    id: "birthday-tulip",
    title: "Tulip & Gold",
    category: "Birthdays",
    photoId: 18745770,
    ext: "jpeg",
    ratio: "square",
    serves: "12 guests",
    weight: "2 kg",
    flavour: "Pineapple",
    finish: "Smooth alabaster coat, gold numeral candle, fresh tulips",
    note: "The quiet birthday cake. Ten minutes of piping, zero clutter.",
    price: "from PKR 4,200",
  },
  {
    id: "birthday-berry",
    title: "Morning Berries",
    category: "Birthdays",
    photoId: 28815810,
    ext: "jpeg",
    ratio: "portrait",
    serves: "10–12 guests",
    weight: "1.8 kg",
    flavour: "Seasonal Fruits",
    finish: "Seasonal berries, hand-lettered message",
    note: "Written by hand in chocolate — send us the exact wording.",
    price: "from PKR 3,000",
  },
  {
    id: "birthday-sunbeam",
    title: "Sunbeam Sprinkle",
    category: "Birthdays",
    photoId: 32191353,
    ext: "jpeg",
    ratio: "square",
    serves: "12 guests",
    weight: "2 kg",
    flavour: "Vanilla Crunch",
    finish: "Ripple-swirl icing, citrus sprinkles, candle-ready crown",
    note: "Photographs beautifully in daylight — everyone asks where it's from.",
    price: "from PKR 4,200",
  },
  {
    id: "birthday-fifty",
    title: "Fifty & Floral",
    category: "Birthdays",
    photoId: 40268501,
    ext: "jpeg",
    ratio: "tall",
    serves: "30–35 guests",
    weight: "5 kg / three tier",
    flavour: "KitKat Chocolate",
    finish: "Pressed-flower tiers, gold numerals",
    note: "Milestone birthdays get a design consult, on the house.",
    price: "from PKR 4,500",
  },
  {
    id: "floral-orchid",
    title: "Orchid Study",
    category: "Floral & Minimal",
    photoId: 29051734,
    ext: "jpeg",
    ratio: "wide",
    serves: "14 guests",
    weight: "2.2 kg",
    flavour: "Vanilla Crunch",
    finish: "Ivory crumb coat, live-safe orchids and eucalyptus",
    note: "Wedding-adjacent, engagement dinners, mehndi mornings.",
    price: "from PKR 16,500",
  },
  {
    id: "floral-goldstand",
    title: "Gold Stand Bloom",
    category: "Floral & Minimal",
    photoId: 31909818,
    ext: "jpeg",
    ratio: "portrait",
    serves: "10 guests",
    weight: "1.5 kg",
    flavour: "Coffee Chocolate",
    finish: "Single candle, posy of dried bloom, matte ivory shell",
    note: "Arrives on its own gold stand — no plating needed at home.",
    price: "from PKR 7,000",
  },
  {
    id: "floral-pastel",
    title: "Pressed Petal",
    category: "Floral & Minimal",
    photoId: 27176367,
    ext: "jpeg",
    ratio: "square",
    serves: "12 guests",
    weight: "2 kg",
    flavour: "Coconut",
    finish: "Hand-painted petal work, no fondant",
    note: "For people who say they don't like fondant. They're usually right.",
    price: "from PKR 3,000",
  },
  {
    id: "floral-thankyou",
    title: "Thank You, Blooms",
    category: "Floral & Minimal",
    photoId: 34723391,
    ext: "jpeg",
    ratio: "portrait",
    serves: "8 guests",
    weight: "1 kg",
    flavour: "Red Velvet",
    finish: "Watercolour floral icing, script message",
    note: "Corporates and gifting runs — 12+ boxes get a volume quote.",
    price: "from PKR 16,500",
  },
  {
    id: "kids-superman",
    title: "Superman Lands in Gulberg",
    category: "Kids & Theme",
    photoId: 10336820,
    ext: "jpeg",
    ratio: "tall",
    serves: "16 guests",
    weight: "2.5 kg",
    flavour: "Chocolate Fudge",
    finish: "Full fondant suit, sculpted cape, hand-painted crest",
    note: "The figure is modelled over two days by our theme artist.",
    price: "from PKR 16,500",
  },
  {
    id: "kids-dino",
    title: "Dinosaur Expedition",
    category: "Kids & Theme",
    photoId: 25559070,
    ext: "jpeg",
    ratio: "tall",
    serves: "25–28 guests",
    weight: "4 kg / three tier",
    flavour: "Butterscotch",
    finish: "Textured reptile tiers, sugar foliage, edible moss",
    note: "Any theme, any film, any size. Send the reference photo.",
    price: "from PKR 3,000",
  },
  {
    id: "kids-transport",
    title: "Number Two, Full Throttle",
    category: "Kids & Theme",
    photoId: 32370565,
    ext: "jpeg",
    ratio: "wide",
    serves: "14 guests",
    weight: "2.2 kg",
    flavour: "KitKat Chocolate",
    finish: "Vehicles, road-map board, numeral topper",
    note: "Second birthdays are our busiest — book 5 days ahead.",
    price: "from PKR 16,500",
  },
  {
    id: "kids-elsa",
    title: "Snow Day Princess",
    category: "Kids & Theme",
    photoId: 29533829,
    ext: "jpeg",
    ratio: "tall",
    serves: "18 guests",
    weight: "3 kg / two tier",
    flavour: "Caramel Crunch",
    finish: "Iridescent shimmer, sculpted characters, piped snowfall",
    note: "Elsa, Cocomelon, Barbie, Chhota Bheem — all requested weekly.",
    price: "from PKR 3,000",
  },
];

/* ─────────────────────────────────────────────────────────────────
   Specialties
   ───────────────────────────────────────────────────────────────── */

export type Specialty = {
  key: string;
  name: string;
  line: string;
  blurb: string;
  photoId: number;
  ext: Ext;
  meta: string;
  category: Exclude<Category, "All">;
};

export const SPECIALTIES: Specialty[] = [
  {
    key: "teddy",
    name: "Teddy Bear Cakes",
    line: "The one Lahore keeps tagging us for",
    blurb:
      "A hand-sculpted bear settled into soft buttercream, sized from a one-kilo surprise to a three-tier shower centrepiece.",
    photoId: 30668691,
    ext: "jpeg",
    meta: "120+ made this year",
    category: "Teddy Bear",
  },
  {
    key: "anniversary",
    name: "Anniversary Cakes",
    line: "For the couple who's still in it",
    blurb:
      "Gilded numerals, single sugar roses, restrained ivory shells. Made to be photographed before the candles go out.",
    photoId: 31793674,
    ext: "jpeg",
    meta: "Same-week slots open",
    category: "Anniversary",
  },
  {
    key: "milestone",
    name: "Milestone Birthdays",
    line: "Firsts, forties and fifties",
    blurb:
      "One-year-olds, sweet sixteens, the 50th with the whole family invited. Three tiers if the room needs a centrepiece.",
    photoId: 18745770,
    ext: "jpeg",
    meta: "Design consult included",
    category: "Birthdays",
  },
  {
    key: "theme",
    name: "Custom Theme Cakes",
    line: "Send a photo, get that cake",
    blurb:
      "Cricket stadiums, bikes, Superman, Elsa, astrology charts, glam kits. If you can describe it, our artists can pipe it.",
    photoId: 10336820,
    ext: "jpeg",
    meta: "Full bespoke sculpting",
    category: "Kids & Theme",
  },
];

/* ─────────────────────────────────────────────────────────────────
   Flavours
   ───────────────────────────────────────────────────────────────── */

export const FLAVOURS: { name: string; note: string }[] = [
  { name: "Cadbury Chocolate", note: "most selling" },
  { name: "Caramel Crunch", note: "most selling" },
  { name: "Chocolate Fudge", note: "rich and chocolatey" },
  { name: "KitKat Chocolate", note: "with KitKat crunch" },
  { name: "Butterscotch", note: "a family favourite" },
  { name: "Vanilla Crunch", note: "light and classic" },
  { name: "Red Velvet", note: "soft, with cream" },
  { name: "Coffee Chocolate", note: "for coffee lovers" },
  { name: "Pineapple", note: "the classic birthday cake" },
  { name: "Coconut", note: "light and fresh" },
  { name: "Seasonal Fruits", note: "fresh fruit, when in season" },
];

export const FLAVOUR_NAMES = FLAVOURS.map((f) => f.name);

/* ─────────────────────────────────────────────────────────────────
   Testimonials — written in the voice of real review excerpts
   ───────────────────────────────────────────────────────────────── */

export type Review = {
  quote: string;
  name: string;
  area: string;
  occasion: string;
  rating: number;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "We had “the best” experience with Cake Spot. They took the order on such a short notice. The cake was made exactly the same as we asked and it was very very delicious. I am your permanent customer from now onwards.",
    name: "Sajjad Ahmad",
    area: "cakespot.pk",
    occasion: "Customer review",
    rating: 5,
  },
  {
    quote:
      "Thank you so much for making another beautiful cake for my parents’ anniversary! This is actually my 4th time ordering cakes from you, and you never disappoint.",
    name: "Google review",
    area: "Google",
    occasion: "Anniversary cake",
    rating: 5,
  },
  {
    quote:
      "Everything was so accurate as per instructions regarding cake and its details. Taste was absolutely amazing. Highly recommended.",
    name: "Junaid Malik",
    area: "cakespot.pk",
    occasion: "Customer review",
    rating: 5,
  },
  {
    quote:
      "Ordered this beautiful teddy bear cake for my son’s birthday, and it completely exceeded our expectations. The blue-and-white color theme and hand-crafted details were so neat and charming.",
    name: "Teddy bear cake",
    area: "Google",
    occasion: "Son’s birthday",
    rating: 5,
  },
  {
    quote:
      "Totally recommended. Cake was same as pic, and was delicious and fresh. Delivered on time. Thank you so much.",
    name: "sma 26",
    area: "cakespot.pk",
    occasion: "Customer review",
    rating: 5,
  },
  {
    quote:
      "The buttercream KitKat cake was moist, subtle, delicious, and beautifully made. So many family and friends asked where I got it from! Great taste, great service, and very economical too.",
    name: "First-time customer",
    area: "Google",
    occasion: "KitKat cake",
    rating: 5,
  },
];

/* ─────────────────────────────────────────────────────────────────
   Instagram strip
   ───────────────────────────────────────────────────────────────── */

export const IG_POSTS: { photoId: number; ext: Ext; caption: string; likes: string }[] = [
  { photoId: 17939214, ext: "jpeg", caption: "Cocoa bear, 1kg", likes: "1,204" },
  { photoId: 35472159, ext: "jpeg", caption: "Roses on the stairs", likes: "2,318" },
  { photoId: 7450957, ext: "png", caption: "First birthday, fondant friends", likes: "986" },
  { photoId: 28487973, ext: "jpeg", caption: "Pressed petal study", likes: "1,540" },
  { photoId: 5365902, ext: "jpeg", caption: "Under the sea, 1.5kg", likes: "733" },
  { photoId: 31009164, ext: "jpeg", caption: "Heart for a haldi morning", likes: "3,012" },
];

/* ─────────────────────────────────────────────────────────────────
   Delivery + process
   ───────────────────────────────────────────────────────────────── */

export const DELIVERY_AREAS = [
  "Gulberg",
  "DHA",
  "Model Town",
  "Bahria Town",
  "Johar Town",
  "Cantt",
  "Faisal Town",
  "Valencia Town",
  "Garden Town",
  "Askari",
  "Wapda Town",
  "Ichhra",
];

export const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Wedding / Engagement",
  "Baby Shower",
  "Corporate Gifting",
  "Other",
] as const;

export const SIZES = [
  "1 kg · serves 8–10",
  "1.5 kg · serves 10–12",
  "2 kg · serves 12–16",
  "3 kg · two tier · serves 18–25",
  "5 kg+ · three tier · serves 30+",
  "Not sure — advise me",
] as const;

export const PROCESS = [
  {
    n: "01",
    title: "Share your vision & reference photo",
    body:
      "Send the idea on WhatsApp or through the form — a Pinterest pin, a screenshot, a napkin sketch. We reply with honest feasibility, a real price and the earliest slot we can actually hold.",
    meta: "Open every day, 7 AM – 2 AM",
  },
  {
    n: "02",
    title: "Finalise flavour, size & design detail",
    body:
      "We lock the sponge, filling, servings, colour palette and the exact wording on the cake. A digital sketch goes out before a single bag is filled,.",
    meta: "Sketch + confirmed quote in 24 hours",
  },
  {
    n: "03",
    title: "Handcrafted fresh, ready for pickup or Lahore delivery",
    body:
      "Baked, sculpted and finished the same morning. Collect from our shop in Gulberg III, or have it delivered chilled anywhere in Lahore in a locked, tier-safe box.",
    meta: "Pickup at Gulberg III · chilled delivery across Lahore",
  },
] as const;

export const CRAFT_POINTS = [
  {
    k: "Same-morning sculpting",
    v: "Figures, bears and toppers are modelled the day your cake ships. Nothing sits in a freezer waiting for an order.",
  },
  {
    k: "Sweetness, dialled down",
    v: "Lahori palates, trained restraint — less syrup, real cream, and fillings that hold up in a Lahore afternoon.",
  },
  {
    k: "One artist, start to finish",
    v: "The person who sketches your cake is the person who pipes the border. No production line, no handoff.",
  },
];

/** Maps a gallery category to the closest occasion option in the order form. */
export const OCCASION_BY_CATEGORY: Record<string, string> = {
  "Teddy Bear": "Birthday",
  Anniversary: "Anniversary",
  Birthdays: "Birthday",
  "Floral & Minimal": "Wedding / Engagement",
  "Kids & Theme": "Birthday",
};
