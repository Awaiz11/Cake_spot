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
  addressLine: "Firdous Market, Gulberg III",
  city: "Lahore, Pakistan",
  hours: "Tue – Sun · 11:00 AM – 11:00 PM",
  rating: 4.9,
  reviewCount: 570,
} as const;

export function waLink(message: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

type Ext = "jpeg" | "png";

export function photo(id: number, ext: Ext, w: number) {
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
    flavour: "Belgian chocolate fudge with hazelnut cream",
    finish: "Hand-sculpted fondant bear, piped pearl border",
    note: "Our most-ordered design. The bear is sculpted the same morning, never pre-made.",
    price: "from PKR 6,800",
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
    flavour: "Vanilla bean with raspberry preserve",
    finish: "Cashmere-blue buttercream, twin bears, sugar booties",
    note: "Built for baby showers — matches any nursery palette on request.",
    price: "from PKR 5,900",
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
    flavour: "Butterscotch praline",
    note: "Hot-air balloon topper with a hand-moulded bear basket.",
    finish: "Two tiers, sky-blue combs and isomalt balloon",
    price: "from PKR 11,400",
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
    flavour: "Dark chocolate truffle sponge",
    finish: "Chocolate-moulded bear, gold-dust shimmer",
    note: "A smaller love — perfect for a surprise weekday visit.",
    price: "from PKR 4,200",
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
    flavour: "Red velvet with mascarpone cream",
    finish: "Silver-leaf numerals, garden roses, hand-tied ribbon",
    note: "Our signature silver & gold anniversary — 25th, 50th, anything in between.",
    price: "from PKR 13,600",
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
    flavour: "Salted caramel with toasted almond",
    finish: "24k gold crown, string-pearl piping",
    note: "Made for the one who hosts everything.",
    price: "from PKR 8,900",
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
    flavour: "Pistachio & rose (kesar pista)",
    finish: "Single sugar rose, hand-painted butterfly, cream crumb coat",
    note: "Proof that restraint reads more expensive than excess.",
    price: "from PKR 6,400",
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
    flavour: "Belgian chocolate & hazelnut",
    finish: "Three tiers, brushed gold leaf, piped beaded base",
    note: "Engagements and big family anniversaries. Delivered assembled.",
    price: "from PKR 24,000",
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
    flavour: "Coconut & pineapple (classic Cake Spot)",
    finish: "Smooth alabaster coat, gold numeral candle, fresh tulips",
    note: "The quiet birthday cake. Ten minutes of piping, zero clutter.",
    price: "from PKR 5,600",
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
    flavour: "White forest with blueberry curd",
    finish: "Seasonal berries, hand-lettered message",
    note: "Written by hand in chocolate — send us the exact wording.",
    price: "from PKR 5,200",
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
    flavour: "Vanilla with wild berry filling",
    finish: "Ripple-swirl icing, citrus sprinkles, candle-ready crown",
    note: "Photographs beautifully in daylight — everyone asks where it's from.",
    price: "from PKR 5,400",
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
    flavour: "Black forest & kirsch cherry",
    finish: "Pressed-flower tiers, gold numerals",
    note: "Milestone birthdays get a design consult, on the house.",
    price: "from PKR 19,500",
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
    flavour: "Lemon & poppy seed",
    finish: "Ivory crumb coat, live-safe orchids and eucalyptus",
    note: "Wedding-adjacent, engagement dinners, mehndi mornings.",
    price: "from PKR 7,800",
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
    flavour: "Belgian chocolate ganache",
    finish: "Single candle, posy of dried bloom, matte ivory shell",
    note: "Arrives on its own gold stand — no plating needed at home.",
    price: "from PKR 6,200",
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
    flavour: "Rabindri soan with cream cheese",
    finish: "Hand-painted petal work, no fondant",
    note: "For people who say they don't like fondant. They're usually right.",
    price: "from PKR 6,900",
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
    flavour: "Red velvet",
    finish: "Watercolour floral icing, script message",
    note: "Corporates and gifting runs — 12+ boxes get a volume quote.",
    price: "from PKR 4,600",
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
    flavour: "Chocolate fudge with oreo crunch",
    finish: "Full fondant suit, sculpted cape, hand-painted crest",
    note: "The figure is modelled over two days by our theme artist.",
    price: "from PKR 9,600",
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
    flavour: "Butterscotch & praline",
    finish: "Textured reptile tiers, sugar foliage, edible moss",
    note: "Any theme, any film, any size. Send the reference photo.",
    price: "from PKR 16,800",
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
    flavour: "Vanilla with strawberry cream",
    finish: "Vehicles, road-map board, numeral topper",
    note: "Second birthdays are our busiest — book 5 days ahead.",
    price: "from PKR 8,400",
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
    flavour: "Blueberry cheesecake",
    finish: "Iridescent shimmer, sculpted characters, piped snowfall",
    note: "Elsa, Cocomelon, Barbie, Chhota Bheem — all requested weekly.",
    price: "from PKR 12,000",
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
  { name: "Belgian Chocolate Fudge", note: "deep, moist, ganache layer" },
  { name: "Butterscotch Praline", note: "toasted praline crunch" },
  { name: "Red Velvet", note: "mascarpone, mild cocoa" },
  { name: "Black Forest", note: "cherry, dark chocolate curl" },
  { name: "Salted Caramel", note: "slow-cooked caramel, sea salt" },
  { name: "Kesar Pista", note: "saffron & pistachio, desiccated coconut" },
  { name: "Gulkand Rose", note: "rose petal preserve, cardamom sponge" },
  { name: "Coconut & Pineapple", note: "the classic Lahori birthday" },
  { name: "Blueberry Cheesecake", note: "baked cheesecake layer" },
  { name: "Rabindri Soan", note: "local sweet, cream cheese" },
  { name: "Hazelnut Cherry", note: "chocolate-hazelnut, sour cherry" },
  { name: "Lemon Poppy Seed", note: "bright, light, citrus curd" },
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
      "The teddy bear cake was honestly too pretty to cut. My daughter noticed the bear's little shoes and refused the candles for ten minutes. Taste was as good as the look — not sweet, very fresh cream.",
    name: "Ayesha R.",
    area: "Gulberg III",
    occasion: "3rd Birthday · Teddy Bear",
    rating: 5,
  },
  {
    quote:
      "Ordered an anniversary cake for my parents' 25th at 9pm for the next morning. They confirmed on WhatsApp in five minutes, delivered it on time, and my mother asked who made it before she asked what time it was.",
    name: "Hamza T.",
    area: "DHA Phase 5",
    occasion: "25th Anniversary · Two Tier",
    rating: 5,
  },
  {
    quote:
      "I sent them a Pinterest photo at midnight and they built almost exactly that cake two days later. The gold detail was hand-painted, not a sticker. Chocolate was rich but not syrup-sweet.",
    name: "Zoya M.",
    area: "Model Town",
    occasion: "Glam Kit Cake · Custom Theme",
    rating: 5,
  },
  {
    quote:
      "We've used Cake Spot for every office birthday for two years now. 30 boxes, always on time, always the same taste. Cheaper than the mall chains and it actually looks like the photo.",
    name: "Bilal A.",
    area: "Bahria Town",
    occasion: "Corporate · Regular Cakes",
    rating: 5,
  },
  {
    quote:
      "The butterscotch is the best in Lahore, I've tried all of them. My cake arrived still cold, box was perfect, and they wrote my father's name in proper Urdu script — no spelling mistake, which never happens.",
    name: "Sana K.",
    area: "Johar Town",
    occasion: "60th Birthday · Butterscotch",
    rating: 5,
  },
  {
    quote:
      "They talked me out of three tiers and into a 2kg one with better finishing. Saved me money and the cake was still the main event of the room. That's the difference.",
    name: "Umar F.",
    area: "Cantt",
    occasion: "Engagement · Ivory & Orchid",
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
    meta: "Replies within 30 minutes, 11am–11pm",
  },
  {
    n: "02",
    title: "Finalise flavour, size & design detail",
    body:
      "We lock the sponge, filling, servings, colour palette and the exact wording on the cake. A digital sketch goes out before a single bag is filled, and 50% confirms the slot.",
    meta: "Sketch + confirmed quote in 24 hours",
  },
  {
    n: "03",
    title: "Handcrafted fresh, ready for pickup or Lahore delivery",
    body:
      "Baked, sculpted and finished the same morning. Collect from Firdous Market, Gulberg III, or have it delivered chilled anywhere in Lahore in a locked, tier-safe box.",
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
