/* Content data for the Tayo Restaurant & Hall site — transcribed from the
 * Figma design (Tayo Restaurant, file Zw5d2nX8OEwRU3vGEV7ahN). */

export type DishCategory = "breakfast" | "snacks" | "mains" | "drinks";

export interface Dish {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: DishCategory;
  image: string;
  pastel: string; // tailwind classes for card background
}

export const CATEGORIES: { id: DishCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "breakfast", label: "Quraac (Breakfast)" },
  { id: "snacks", label: "Snacks (Cunno Fudud)" },
  { id: "mains", label: "Mains (Qado)" },
  { id: "drinks", label: "Drinks (Cabitaano)" },
];

export const DISHES: Dish[] = [
  {
    id: "bariis",
    name: "Bariis Iskukaris",
    desc: "Spiced Somali rice & meat with crisp fresh vegetables.",
    price: 8.5,
    category: "mains",
    image: "/images/dish-bariis.webp",
    pastel: "bg-pastel-pink",
  },
  {
    id: "hilib-ari",
    name: "Hilib Ari",
    desc: "Slow-roasted goat with Somali spices. A house specialty.",
    price: 12.5,
    category: "mains",
    image: "/images/dish-hilib-ari.webp",
    pastel: "bg-pastel-yellow",
  },
  {
    id: "canjeero",
    name: "Canjeero & Beer",
    desc: "Spongy sourdough flatbread paired with spiced liver.",
    price: 4.5,
    category: "breakfast",
    image: "/images/dish-canjeero.jpg",
    pastel: "bg-pastel-lav",
  },
  {
    id: "baasto",
    name: "Baasto Saldaato",
    desc: "Somali-style pasta served with rich meat sauce and spices.",
    price: 7.0,
    category: "mains",
    image: "/images/dish-baasto.webp",
    pastel: "bg-pastel-mint",
  },
  {
    id: "kaluun",
    name: "Kaluun iyo Bariis",
    desc: "Crispy fried fish fillet served over a bed of seasoned rice.",
    price: 9.0,
    category: "mains",
    image: "/images/dish-kaluun.webp",
    pastel: "bg-pastel-pink",
  },
  {
    id: "sambuus",
    name: "Beef Sambuus",
    desc: "Golden pastry triangles filled with savory spiced minced beef.",
    price: 1.5,
    category: "snacks",
    image: "/images/dish-sambuus.webp",
    pastel: "bg-pastel-yellow",
  },
  {
    id: "malawax",
    name: "Malawax",
    desc: "Sweet crepes drizzled with honey.",
    price: 4.0,
    category: "breakfast",
    image: "/images/dish-malawax.jpg",
    pastel: "bg-pastel-lav",
  },
  {
    id: "shaah",
    name: "Shaah Adays",
    desc: "Traditional Somali spiced tea with cardamom and cloves.",
    price: 1.5,
    category: "drinks",
    image: "/images/dish-shaah.webp",
    pastel: "bg-pastel-mint",
  },
  {
    id: "xalwa",
    name: "Somali Xalwa",
    desc: "Somali sweet, spiced jelly with sesame seeds.",
    price: 8.0,
    category: "snacks",
    image: "/images/dish-xalwa.webp",
    pastel: "bg-pastel-pink",
  },
  {
    id: "suqaar",
    name: "Beef Suqaar",
    desc: "Diced beef sautéed with vegetables. A breakfast classic.",
    price: 6.5,
    category: "breakfast",
    image: "/images/hero-plate-1.webp",
    pastel: "bg-pastel-yellow",
  },
  {
    id: "kahwa",
    name: "Somali Kahwa",
    desc: "Strong, dark Somali coffee infused with cardamom and ginger.",
    price: 2.0,
    category: "drinks",
    image: "/images/dish-kahwa.jpg",
    pastel: "bg-pastel-lav",
  },
  {
    id: "mandazi",
    name: "Mandazi (Bur)",
    desc: "Soft, golden-brown sweet fritters lightly dusted with sugar.",
    price: 2.5,
    category: "snacks",
    image: "/images/dish-mandazi.webp",
    pastel: "bg-pastel-mint",
  },
];

export const BEST_SELLERS = [
  {
    id: "hilib",
    tag: "House Specialty",
    name: "Hilib Ari",
    desc: "Slow-roasted tender goat meat with spices",
    price: 12.5,
    image: "/images/dish-hilib-ari.webp",
    bg: "bg-gradient-to-br from-[#ffdfcc] to-pastel-pink",
  },
  {
    id: "baasto",
    tag: "Pasta",
    name: "Baasto Saldaato",
    desc: "Somali style pasta",
    price: 7.0,
    image: "/images/best-baasto.webp",
    bg: "bg-gradient-to-br from-pastel-yellow to-[#fff9e6]",
  },
  {
    id: "kaluun",
    tag: "Seafood",
    name: "Kaluun Iyo Bariis",
    desc: "Fried fish & rice",
    price: 9.0,
    image: "/images/dish-kaluun.webp",
    bg: "bg-gradient-to-br from-pastel-mint to-[#e6f9ed]",
  },
];

export const TESTIMONIALS = [
  {
    name: "Amina Y.",
    time: "2 weeks ago",
    quote:
      "The Bariis Iskukaris reminds me of home! The absolute best Somali spot in Mogadishu.",
  },
  {
    name: "Omar M.",
    time: "1 month ago",
    quote:
      "Amazing atmosphere and the Shaah is perfect. Highly recommend for family dinners.",
  },
];

export const EXPERIENCE_POINTS = [
  "A welcoming, modern dining space",
  "Authentic Somali favorites & refreshing drinks",
  "Conveniently located for meetups",
];

export const CONTACT_INFO = {
  phoneDisplay: "+252 (0) 61X XXX XXX",
  phoneNav: "Call 061 9180005",
  email: "info@tayorestaurant.com",
  hours: "Mon - Sun: 8:00 AM - 11:00 PM",
  hoursHome: "Monday – Sunday: 8:00 AM – 11:00 PM",
  address: "Rugsan Mall, Mogadishu, Somalia",
  addressLines: ["Tayo Restaurant & Hall", "Upper Level, Rugsan Mall", "Mogadishu, Somalia"],
};

export const HALL_FEATURES = [
  {
    title: "Up to 400 Guests",
    desc: "Flexible seating arrangements.",
    icon: "users",
  },
  {
    title: "Premium Tayo Catering",
    desc: "Custom Somali cuisine menus available.",
    icon: "chef",
  },
  {
    title: "Stage & Decor Included",
    desc: "Access to our illuminated arched stage.",
    icon: "sparkles",
  },
];

export const HERITAGE_FEATURES = [
  {
    title: "The Authentic Tayo Feast",
    desc: "World-class catering featuring Hilib Ari & traditional dishes.",
    icon: "feast",
  },
  {
    title: "Flexible Cultural Seating",
    desc: "Spacious layouts accommodating up to 400 guests.",
    icon: "seating",
  },
];

/* Dates in November 2026 already booked in the design mock */
export const BOOKED_DATES = new Set([6, 10, 11]);

export const EVENT_TYPES = [
  "Wedding (Aroos)",
  "Engagement / Henna Night",
  "Corporate Event",
  "Birthday Celebration",
  "Other Celebration",
];

export const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/menu", label: "Cafeteria Menu" },
  { path: "/hall", label: "Tayo Hall" },
  { path: "/contact", label: "Contact" },
];

export const MARQUEE_ITEMS = [
  "Bariis Iskukaris",
  "Hilib Ari",
  "Canjeero",
  "Beef Sambuus",
  "Shaah Adays",
  "Malawax",
  "Somali Kahwa",
  "Baasto Saldaato",
  "Fresh Mango Juice",
  "Mandazi",
];

export const FOOTER_COLS = [
  {
    title: "RESTAURANT",
    links: [
      { label: "Cafeteria Menu", path: "/menu" },
      { label: "Daily Favorites", path: "/menu" },
      { label: "The Tayo Experience", path: "/" },
    ],
  },
  {
    title: "TAYO HALL",
    links: [
      { label: "Venue Overview", path: "/hall" },
      { label: "Weddings & Events", path: "/hall" },
      { label: "Book the Hall", path: "/hall" },
    ],
  },
  {
    title: "CONNECT",
    links: [
      { label: "WhatsApp Us", href: "https://wa.me/252619180005" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Facebook", href: "https://facebook.com" },
    ],
  },
];
