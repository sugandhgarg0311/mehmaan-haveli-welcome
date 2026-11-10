import kitchen from "@/assets/exp-kitchen.jpg";
import blockprint from "@/assets/exp-blockprint.jpg";
import pottery from "@/assets/exp-pottery.jpg";
import kolam from "@/assets/exp-kolam.jpg";
import courtyard from "@/assets/exp-courtyard.jpg";
import rooftop from "@/assets/exp-rooftop.jpg";

export type ExperienceCategory = "Food" | "Craft" | "Mornings";

export interface Experience {
  slug: string;
  title: string;
  hindi: string;
  host: string;
  city: string;
  state: string;
  category: ExperienceCategory;
  durationHours: number;
  /** Full price per guest in rupees — nothing added later. */
  priceInr: number;
  expect: string;
  image: string;
  /** Sample hosts are role-played until real hosts join. */
  rolePlay: true;
}

export const experiences: Experience[] = [
  {
    slug: "dal-baati-meena-ji",
    title: "Dal baati in Meena ji's kitchen",
    hindi: "रसोई",
    host: "Meena ji",
    city: "Jaipur",
    state: "Rajasthan",
    category: "Food",
    durationHours: 3,
    priceInr: 1800,
    expect: "Shape baati by hand, learn her ghee tadka, then eat together on the floor mat.",
    image: kitchen,
    rolePlay: true,
  },
  {
    slug: "bagru-block-printing",
    title: "Block printing with the Chhipa family",
    hindi: "छपाई",
    host: "Rafiq ji",
    city: "Bagru",
    state: "Rajasthan",
    category: "Craft",
    durationHours: 4,
    priceInr: 2200,
    expect: "Press century-old wooden blocks into indigo and madder. Take your own stole home.",
    image: blockprint,
    rolePlay: true,
  },
  {
    slug: "kutch-clay-wheel",
    title: "Clay and wheel with Ramesh ji",
    hindi: "माटी",
    host: "Ramesh ji",
    city: "Bhuj",
    state: "Gujarat",
    category: "Craft",
    durationHours: 3,
    priceInr: 1500,
    expect: "Sit at the wheel in his courtyard. Your pot is fired and kept for you to collect.",
    image: pottery,
    rolePlay: true,
  },
  {
    slug: "chennai-kolam-dawn",
    title: "Kolam at the doorstep at dawn",
    hindi: "कोलम",
    host: "Lakshmi ji",
    city: "Chennai",
    state: "Tamil Nadu",
    category: "Mornings",
    durationHours: 2,
    priceInr: 1200,
    expect: "Learn dots and loops with rice flour, then filter coffee on the thinnai.",
    image: kolam,
    rolePlay: true,
  },
  {
    slug: "lucknow-courtyard-dinner",
    title: "Dinner in a Lucknow courtyard",
    hindi: "दस्तरख़्वान",
    host: "Nazia ji",
    city: "Lucknow",
    state: "Uttar Pradesh",
    category: "Food",
    durationHours: 3,
    priceInr: 2500,
    expect: "Awadhi dishes passed hand to hand, and the stories behind each one.",
    image: courtyard,
    rolePlay: true,
  },
  {
    slug: "ahmedabad-rooftop-chai",
    title: "Rooftop chai and kite stories",
    hindi: "पतंग",
    host: "Hasmukh ji",
    city: "Ahmedabad",
    state: "Gujarat",
    category: "Mornings",
    durationHours: 2,
    priceInr: 900,
    expect: "Sunrise over the old pols, kulhad chai, and a first lesson in flying a kite.",
    image: rooftop,
    rolePlay: true,
  },
];

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
