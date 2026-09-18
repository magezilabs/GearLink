import { Sprout, HardHat, Droplet, Landmark, Truck, PartyPopper, Factory } from "lucide-react";
import type { EquipmentItem } from "./types";

export const COLORS = {
  ink:         "#0D1117",
  paper:       "#F4F5FF",
  panel:       "#FFFFFF",
  border:      "#E4E6F0",
  muted:       "#8892AA",
  primary:     "#FF6B35",
  primaryDark: "#E85520",
  teal:        "#00D4FF",
  ok:          "#00C896",
  warn:        "#FFB800",
  // kept for backward compat
  steel:        "#0B0F1E",
  steelLight:   "#1E2744",
  signal:       "#FF6B35",
  signalDark:   "#E85520",
  line:         "#E4E6F0",
};

export const CATEGORIES = [
  { name: "Agriculture",             icon: Sprout,      color: "#22C55E" },
  { name: "Construction & Roads",    icon: HardHat,     color: "#FF6B35" },
  { name: "Water & Boreholes",       icon: Droplet,     color: "#00D4FF" },
  { name: "Government & Public Works",icon: Landmark,   color: "#7C6FF7" },
  { name: "Transport & Logistics",   icon: Truck,       color: "#FFB800" },
  { name: "Events & Hospitality",    icon: PartyPopper, color: "#F43F8E" },
  { name: "Workshop & Industrial",   icon: Factory,     color: "#8892AA" },
];

export function catByName(name: string) {
  return CATEGORIES.find((c) => c.name === name) ?? CATEGORIES[0];
}

export function money(n: number) {
  return "UGX " + n.toLocaleString();
}

export const LIFECYCLE = [
  "Registration", "Browsing", "Booking request",
  "Escrow payment", "Logistics", "Delivery",
  "Fund release", "Rating", "Oversight",
];

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  { id:1, name:"John Deere 5075E Tractor",       cat:"Agriculture",              loc:"Kabarole",   price:180000, owner:"Byaruhanga Moses",          rating:4.8, reviews:23, status:"Available",    img3d:"/3d_tractor.png" },
  { id:2, name:"Borehole Drilling Rig DR-200",   cat:"Water & Boreholes",        loc:"Fort Portal",price:950000, owner:"Kasese Water Works Ltd",    rating:4.9, reviews:11, status:"Available",    img3d:"/3d_rig.png" },
  { id:3, name:"Bomag Road Roller BW 120",       cat:"Construction & Roads",     loc:"Kasese",     price:320000, owner:"Turyahikayo Grace",          rating:4.6, reviews:17, status:"Booked",       img3d:"/3d_dozer.png" },
  { id:4, name:"30kVA Diesel Generator",         cat:"Workshop & Industrial",    loc:"Fort Portal",price:150000, owner:"Asiimwe Deo",                rating:4.7, reviews:30, status:"Available" },
  { id:5, name:"Isuzu FRR Truck, 7-tonne",       cat:"Transport & Logistics",    loc:"Bundibugyo", price:280000, owner:"Rugendabanga Transport Co.", rating:4.5, reviews:19, status:"Available" },
  { id:6, name:"Event Tent & Chairs, 200-seat",  cat:"Events & Hospitality",     loc:"Fort Portal",price:400000, owner:"Nanyunja Jackline",          rating:4.9, reviews:41, status:"Available" },
  { id:7, name:"Concrete Mixer 350L",            cat:"Construction & Roads",     loc:"Kyenjojo",   price:90000,  owner:"Sekajigo Equipment Ltd",    rating:4.4, reviews:8,  status:"Available" },
  { id:8, name:"District Grader CAT 120",        cat:"Government & Public Works",loc:"Fort Portal",price:520000, owner:"Kabarole District Works Dept",rating:4.9,reviews:6, status:"Available",    img3d:"/3d_dozer.png" },
];
