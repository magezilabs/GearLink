"use client";

import React, { useState } from "react";
import {
  Sprout,
  HardHat,
  Droplet,
  Landmark,
  Truck,
  PartyPopper,
  Factory,
  Search,
  MapPin,
  Star,
  ShieldCheck,
  User,
  Users,
  ClipboardList,
  CreditCard,
  PackageCheck,
  TrendingUp,
  Bell,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Phone,
  Plus,
  LayoutGrid,
  Filter,
  Banknote,
  MessageSquare,
  ChevronDown,
  Menu,
  Calendar,
  Wallet,
  ArrowLeft,
  BadgeCheck,
  Flag,
  UserPlus,
  Settings,
  LogOut,
  X,
  Lock,
} from "lucide-react";
import { GearLinkLogo } from "@/components/ui/gearlink-logo";
import { AuthView } from "@/components/auth/auth-view";
import { canAccessPage, getRoleDashboardPage, getRoleLabel } from "@/lib/permissions";

const COLORS = {
  ink: "#1B1B18",
  paper: "#F1EDE3",
  panel: "#FFFFFF",
  steel: "#243B34",
  steelLight: "#33544A",
  signal: "#E2A33B",
  signalDark: "#B97F22",
  line: "#DAD4C4",
  muted: "#6B6A62",
};

export const CATEGORIES = [
  { name: "Agriculture", icon: Sprout, color: "#5C7A32" },
  { name: "Construction & Roads", icon: HardHat, color: "#C6821F" },
  { name: "Water & Boreholes", icon: Droplet, color: "#2A6E85" },
  { name: "Government & Public Works", icon: Landmark, color: "#4D5087" },
  { name: "Transport & Logistics", icon: Truck, color: "#A94B26" },
  { name: "Events & Hospitality", icon: PartyPopper, color: "#8C3E68" },
  { name: "Workshop & Industrial", icon: Factory, color: "#54544F" },
];

export function catByName(name: string) {
  return CATEGORIES.find((c) => c.name === name) || CATEGORIES[0];
}

export interface EquipmentItem {
  id: number;
  name: string;
  cat: string;
  loc: string;
  price: number;
  owner: string;
  rating: number;
  reviews: number;
  status: "Available" | "Booked" | "Maintenance";
}

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  { id: 1, name: "John Deere 5075E Tractor", cat: "Agriculture", loc: "Kabarole", price: 180000, owner: "Byaruhanga Moses", rating: 4.8, reviews: 23, status: "Available" },
  { id: 2, name: "Borehole Drilling Rig DR-200", cat: "Water & Boreholes", loc: "Fort Portal", price: 950000, owner: "Kasese Water Works Ltd", rating: 4.9, reviews: 11, status: "Available" },
  { id: 3, name: "Bomag Road Roller BW 120", cat: "Construction & Roads", loc: "Kasese", price: 320000, owner: "Turyahikayo Grace", rating: 4.6, reviews: 17, status: "Booked" },
  { id: 4, name: "30kVA Diesel Generator", cat: "Workshop & Industrial", loc: "Fort Portal", price: 150000, owner: "Asiimwe Deo", rating: 4.7, reviews: 30, status: "Available" },
  { id: 5, name: "Isuzu FRR Truck, 7-tonne", cat: "Transport & Logistics", loc: "Bundibugyo", price: 280000, owner: "Rugendabanga Transport Co.", rating: 4.5, reviews: 19, status: "Available" },
  { id: 6, name: "Event Tent & Chairs, 200-seat", cat: "Events & Hospitality", loc: "Fort Portal", price: 400000, owner: "Nanyunja Jackline", rating: 4.9, reviews: 41, status: "Available" },
  { id: 7, name: "Concrete Mixer 350L", cat: "Construction & Roads", loc: "Kyenjojo", price: 90000, owner: "Sekajigo Equipment Ltd", rating: 4.4, reviews: 8, status: "Available" },
  { id: 8, name: "District Grader CAT 120", cat: "Government & Public Works", loc: "Fort Portal", price: 520000, owner: "Kabarole District Works Dept", rating: 4.9, reviews: 6, status: "Available" },
];

export const LIFECYCLE = [
  "Registration",
  "Browsing",
  "Booking request",
  "Escrow payment",
  "Logistics",
  "Delivery",
  "Fund release",
  "Rating",
  "Oversight",
];

export function money(n: number) {
  return "UGX " + n.toLocaleString();
}

function CategoryChip({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const c = catByName(name);
  const Icon = c.icon;
  const pad = size === "sm" ? "4px 10px" : "6px 14px";
  const fs = size === "sm" ? 12 : 13;
  return (
    <span
      className="gl-body inline-flex items-center gap-1.5 transition-colors"
      style={{
        padding: pad,
        borderRadius: 999,
        fontSize: fs,
        fontWeight: 600,
        background: c.color + "1A",
        color: c.color,
        border: `1px solid ${c.color}55`,
      }}
    >
      <Icon size={size === "sm" ? 13 : 15} />
      {name}
    </span>
  );
}

function StatTile({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <div
      style={{
        background: COLORS.panel,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 10,
        padding: "16px 18px",
        flex: 1,
        minWidth: 160,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span className="gl-body" style={{ fontSize: 12.5, color: COLORS.muted, fontWeight: 600 }}>
          {label}
        </span>
        <Icon size={16} color={accent || COLORS.steel} />
      </div>
      <div className="gl-display" style={{ fontSize: 28, fontWeight: 700, color: COLORS.ink, lineHeight: 1 }}>
        {value}
      </div>
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  icon: Icon,
  onClick,
  style,
}: {
  children: React.ReactNode;
  variant?: "primary" | "dark" | "outline" | "ghost";
  icon?: React.ElementType;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 18px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "all 0.2s ease",
    ...style,
  };
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: COLORS.signal, color: "#3A2A0D", borderColor: COLORS.signalDark },
    dark: { background: COLORS.steel, color: "#F1EDE3", borderColor: COLORS.steel },
    outline: { background: "transparent", color: COLORS.steel, borderColor: COLORS.steel },
    ghost: { background: "transparent", color: COLORS.muted, borderColor: "transparent" },
  };
  return (
    <button className="gl-body hover:opacity-90 active:scale-98" onClick={onClick} style={{ ...base, ...styles[variant] }}>
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", overflowX: "auto", gap: 0, padding: "4px 0 14px" }} className="no-scrollbar">
      {LIFECYCLE.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 84 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11.5,
                  fontWeight: 700,
                  background: done ? COLORS.steel : active ? COLORS.signal : "#fff",
                  color: done ? "#fff" : active ? "#3A2A0D" : COLORS.muted,
                  border: `1.5px solid ${done ? COLORS.steel : active ? COLORS.signalDark : COLORS.line}`,
                }}
              >
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span
                className="gl-body"
                style={{
                  fontSize: 11,
                  marginTop: 6,
                  textAlign: "center",
                  lineHeight: 1.2,
                  color: active ? COLORS.ink : COLORS.muted,
                  fontWeight: active ? 700 : 500,
                }}
              >
                {step}
              </span>
            </div>
            {i < LIFECYCLE.length - 1 && (
              <div style={{ width: 26, height: 1.5, background: done ? COLORS.steel : COLORS.line, marginTop: -18 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
      <div>
        {eyebrow && (
          <div className="gl-body" style={{ fontSize: 13, color: COLORS.signalDark, fontWeight: 700, marginBottom: 4 }}>
            {eyebrow}
          </div>
        )}
        <h1 className="gl-display" style={{ fontSize: 34, fontWeight: 700, color: COLORS.ink, margin: 0, lineHeight: 1.05 }}>
          {title}
        </h1>
        {subtitle && (
          <p className="gl-body" style={{ fontSize: 14, color: COLORS.muted, margin: "6px 0 0", maxWidth: 520 }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

/* ---------------- MARKETPLACE ---------------- */
function MarketplacePage({
  setPage,
  setActiveEquipment,
  activeCat,
  setActiveCat,
  equipmentList,
}: {
  setPage: (p: string) => void;
  setActiveEquipment: (e: EquipmentItem) => void;
  activeCat: string | null;
  setActiveCat: (c: string | null) => void;
  equipmentList: EquipmentItem[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = equipmentList.filter((e) => {
    const matchesCat = activeCat ? e.cat === activeCat : true;
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.loc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.owner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        eyebrow="Marketplace"
        title="Find equipment near you"
        subtitle="Browse by sector, or search for a specific machine, tool or vehicle."
      />
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <div
          style={{
            flex: "1 1 260px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: COLORS.panel,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 8,
            padding: "9px 14px",
          }}
        >
          <Search size={16} color={COLORS.muted} />
          <input
            type="text"
            placeholder="Search tractors, generators, trucks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="gl-body w-full text-sm bg-transparent border-none focus:outline-none text-[#1B1B18]"
          />
        </div>
        <Button variant="outline" icon={Filter} onClick={() => setSearchTerm("")}>
          {searchTerm ? "Clear filter" : "Filters"}
        </Button>
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 20 }} className="no-scrollbar">
        <button
          onClick={() => setActiveCat(null)}
          className="gl-body cursor-pointer transition-all"
          style={{
            flexShrink: 0,
            padding: "7px 14px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            background: !activeCat ? COLORS.steel : "#fff",
            color: !activeCat ? "#fff" : COLORS.ink,
            border: `1px solid ${!activeCat ? COLORS.steel : COLORS.line}`,
          }}
        >
          All sectors
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.name}
            onClick={() => setActiveCat(c.name)}
            className="gl-body flex items-center gap-1.5 cursor-pointer transition-all"
            style={{
              flexShrink: 0,
              padding: "7px 14px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              background: activeCat === c.name ? c.color : "#fff",
              color: activeCat === c.name ? "#fff" : COLORS.ink,
              border: `1px solid ${activeCat === c.name ? c.color : COLORS.line}`,
            }}
          >
            <c.icon size={13} />
            {c.name}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
        {filtered.map((item) => {
          const c = catByName(item.cat);
          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveEquipment(item);
                setPage("detail");
              }}
              className="hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: COLORS.panel,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 12,
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  height: 104,
                  background: c.color + "22",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <c.icon size={40} color={c.color} />
                <span
                  className="gl-body"
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    fontSize: 10.5,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 999,
                    background: item.status === "Available" ? "#E9F1E1" : "#F3E3DC",
                    color: item.status === "Available" ? "#3E5E22" : "#8C3E1E",
                  }}
                >
                  {item.status}
                </span>
              </div>
              <div style={{ padding: 14 }}>
                <div className="gl-body" style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink, marginBottom: 4, lineHeight: 1.25 }}>
                  {item.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12.5, color: COLORS.muted, marginBottom: 8 }}>
                  <MapPin size={12} /> {item.loc}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="gl-display" style={{ fontSize: 16, fontWeight: 700, color: COLORS.ink }}>
                    {money(item.price)}
                    <span className="gl-body" style={{ fontSize: 11, fontWeight: 500, color: COLORS.muted }}>
                      /day
                    </span>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12.5, color: COLORS.muted, fontWeight: 600 }}>
                    <Star size={12} fill={COLORS.signal} color={COLORS.signal} /> {item.rating}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- EQUIPMENT DETAIL ---------------- */
function DetailPage({ item, setPage }: { item: EquipmentItem; setPage: (p: string) => void }) {
  const [days, setDays] = useState(3);
  if (!item) return null;
  const c = catByName(item.cat);
  const totalAmount = item.price * days + 25000;

  return (
    <div>
      <button
        onClick={() => setPage("marketplace")}
        className="gl-body flex items-center gap-1.5 text-sm text-[#6B6A62] bg-none border-none cursor-pointer mb-4 p-0 hover:text-[#1B1B18]"
      >
        <ArrowLeft size={14} /> Back to marketplace
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 26 }} className="max-lg:grid-cols-1">
        <div>
          <div
            style={{
              height: 220,
              borderRadius: 12,
              background: c.color + "22",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <c.icon size={72} color={c.color} />
          </div>
          <CategoryChip name={item.cat} size="md" />
          <h1 className="gl-display" style={{ fontSize: 34, fontWeight: 700, margin: "10px 0 6px" }}>
            {item.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 13.5, color: COLORS.muted, marginBottom: 20 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <MapPin size={14} /> {item.loc}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Star size={14} fill={COLORS.signal} color={COLORS.signal} /> {item.rating} ({item.reviews} reviews)
            </span>
          </div>

          <div className="gl-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            About this equipment
          </div>
          <p className="gl-body" style={{ fontSize: 14, color: COLORS.ink, lineHeight: 1.6, marginBottom: 20 }}>
            Well-maintained {item.name.toLowerCase()}, serviced before every rental. Comes with an operator on request for heavy machinery. Fuel is billed separately unless stated otherwise in the booking terms.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[
              ["Condition", "Good — serviced"],
              ["Category", item.cat],
              ["Owner", item.owner],
              ["Availability", item.status],
            ].map(([k, v]) => (
              <div key={k} style={{ border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: 12, background: COLORS.panel }}>
                <div className="gl-body" style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 600 }}>
                  {k}
                </div>
                <div className="gl-body" style={{ fontSize: 13.5, fontWeight: 600, marginTop: 2 }}>
                  {v}
                </div>
              </div>
            ))}
          </div>

          <div className="gl-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
            Reviews
          </div>
          {[
            { n: "Aine Patrick", t: "Renter", r: 5, c: "Machine arrived on time and worked well for two days of ploughing." },
            { n: "Turyahikayo Grace", t: "Renter", r: 4, c: "Good condition, communication with the owner could be a bit faster." },
          ].map((rv) => (
            <div key={rv.n} style={{ borderTop: `1px solid ${COLORS.line}`, padding: "12px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="gl-body" style={{ fontWeight: 700, fontSize: 13.5 }}>
                  {rv.n} <span style={{ color: COLORS.muted, fontWeight: 500 }}>· {rv.t}</span>
                </span>
                <span style={{ display: "flex", gap: 1 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill={i < rv.r ? COLORS.signal : "none"} color={COLORS.signal} />
                  ))}
                </span>
              </div>
              <p className="gl-body" style={{ fontSize: 13.5, color: COLORS.muted, margin: "4px 0 0" }}>
                {rv.c}
              </p>
            </div>
          ))}
        </div>

        <div>
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 20, position: "sticky", top: 20 }}>
            <div className="gl-display" style={{ fontSize: 24, fontWeight: 700 }}>
              {money(item.price)}
              <span className="gl-body" style={{ fontSize: 12, fontWeight: 500, color: COLORS.muted }}>
                {" "}
                / day
              </span>
            </div>

            <div style={{ margin: "14px 0" }}>
              <div style={{ marginBottom: 10 }}>
                <label className="gl-body" style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>
                  Rental Duration (Days)
                </label>
                <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="w-9 h-9 rounded-lg border border-[#DAD4C4] font-bold text-lg flex items-center justify-center bg-[#F1EDE3]/50 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-base">{days} days</span>
                  <button
                    onClick={() => setDays(days + 1)}
                    className="w-9 h-9 rounded-lg border border-[#DAD4C4] font-bold text-lg flex items-center justify-center bg-[#F1EDE3]/50 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: 12, marginBottom: 14, fontSize: 13.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: COLORS.muted }}>
                  {days} days × {money(item.price)}
                </span>
                <span>{money(item.price * days)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: COLORS.muted }}>Service & Insurance fee</span>
                <span>{money(25000)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15, paddingTop: 6, borderTop: `1px stroke ${COLORS.line}` }}>
                <span>Total</span>
                <span>{money(totalAmount)}</span>
              </div>
            </div>

            <Button variant="primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setPage("booking")}>
              Request booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- BOOKING / ESCROW CHECKOUT ---------------- */
function BookingPage({ item, setPage, userRole }: { item: EquipmentItem; setPage: (p: string) => void; userRole: string }) {
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const eq = item || INITIAL_EQUIPMENT[0];
  const total = eq.price * 3 + 25000;
  const heavy = ["Water & Boreholes", "Construction & Roads", "Transport & Logistics", "Government & Public Works"].includes(eq.cat);

  return (
    <div>
      <PageHeader eyebrow="Booking" title="Book and pay into escrow" subtitle="Your money is held safely until the equipment is delivered and confirmed working." />
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: "18px 22px", marginBottom: 22 }}>
        <Stepper current={3} />
      </div>

      {paymentSuccess ? (
        <div style={{ background: COLORS.panel, border: `2px solid ${COLORS.steel}`, borderRadius: 16, padding: 32, textAlign: "center", maxWidth: 540, margin: "0 auto" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#E9F1E1", color: "#3E5E22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <CheckCircle2 size={32} />
          </div>
          <h2 className="gl-display" style={{ fontSize: 28, fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>
            Escrow Payment Secured!
          </h2>
          <p className="gl-body" style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.5, marginBottom: 24 }}>
            {money(total)} has been deposited into GearLink Escrow. The owner ({eq.owner}) has been notified to prepare {eq.name}.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Button variant="dark" onClick={() => setPage(getRoleDashboardPage(userRole))}>
              Go to My Dashboard
            </Button>
            <Button variant="outline" onClick={() => setPage("marketplace")}>
              Return to Marketplace
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20 }} className="max-lg:grid-cols-1">
          <div>
            <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 20, marginBottom: 18 }}>
              <div className="gl-display" style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
                Booking summary
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 8,
                    background: catByName(eq.cat).color + "22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {React.createElement(catByName(eq.cat).icon, { size: 24, color: catByName(eq.cat).color })}
                </div>
                <div>
                  <div className="gl-body" style={{ fontWeight: 700, fontSize: 14.5 }}>
                    {eq.name}
                  </div>
                  <div style={{ fontSize: 12.5, color: COLORS.muted }}>
                    Owner: {eq.owner} · {eq.loc}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 14, fontSize: 13.5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${COLORS.line}` }}>
                  <span style={{ color: COLORS.muted }}>Dates</span>
                  <span>12 – 15 Sep 2026 (3 days)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${COLORS.line}` }}>
                  <span style={{ color: COLORS.muted }}>Rental cost</span>
                  <span>{money(eq.price * 3)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${COLORS.line}` }}>
                  <span style={{ color: COLORS.muted }}>Service & Insurance fee</span>
                  <span>{money(25000)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: `1px solid ${COLORS.line}`, fontWeight: 700, fontSize: 15 }}>
                  <span>Total due</span>
                  <span>{money(total)}</span>
                </div>
              </div>
            </div>

            {heavy && (
              <div style={{ background: "#FBF3E4", border: `1px solid ${COLORS.signalDark}55`, borderRadius: 12, padding: 16, marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Truck size={16} color={COLORS.signalDark} />
                  <span className="gl-body" style={{ fontWeight: 700, fontSize: 14 }}>
                    Transport coordination required
                  </span>
                </div>
                <p className="gl-body" style={{ fontSize: 13, color: "#5A4520", margin: 0 }}>
                  This equipment needs logistics support. A youth agent will be assigned to coordinate pickup and delivery once payment is confirmed.
                </p>
              </div>
            )}

            <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 20 }}>
              <div className="gl-display" style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
                Payment method
              </div>
              {[
                { name: "MTN Mobile Money", icon: Phone },
                { name: "Airtel Money", icon: Phone },
                { name: "Invoice (Government / Institution)", icon: ClipboardList },
              ].map((m, i) => (
                <label
                  key={m.name}
                  onClick={() => setSelectedPayment(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    border: `1px solid ${selectedPayment === i ? COLORS.steel : COLORS.line}`,
                    borderRadius: 8,
                    marginBottom: 8,
                    cursor: "pointer",
                    background: selectedPayment === i ? COLORS.paper : "transparent",
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: `2px solid ${selectedPayment === i ? COLORS.steel : COLORS.line}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedPayment === i && <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.steel }} />}
                  </div>
                  <m.icon size={16} color={COLORS.muted} />
                  <span className="gl-body" style={{ fontSize: 13.5, fontWeight: selectedPayment === i ? 600 : 400 }}>
                    {m.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: COLORS.steel, borderRadius: 12, padding: 20, color: "#F1EDE3" }}>
              <div className="gl-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
                Escrow protection
              </div>
              <p className="gl-body" style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.9, marginBottom: 14 }}>
                GearLink holds your payment until you confirm the equipment was delivered and works as described. Funds release to the owner only after that confirmation.
              </p>
            </div>
            <Button variant="primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} icon={Wallet} onClick={() => setPaymentSuccess(true)}>
              Pay {money(total)} into escrow
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- OWNER DASHBOARD ---------------- */
function OwnerDashboard({
  equipmentList,
  onAddEquipment,
}: {
  equipmentList: EquipmentItem[];
  onAddEquipment: (e: EquipmentItem) => void;
}) {
  const [tab, setTab] = useState("listings");
  const [showAddModal, setShowAddModal] = useState(false);

  const [eqName, setEqName] = useState("");
  const [eqCat, setEqCat] = useState("Agriculture");
  const [eqLoc, setEqLoc] = useState("Fort Portal");
  const [eqPrice, setEqPrice] = useState(120000);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eqName) return;
    const newItem: EquipmentItem = {
      id: Date.now(),
      name: eqName,
      cat: eqCat,
      loc: eqLoc,
      price: Number(eqPrice),
      owner: "Sekajigo Equipment Ltd",
      rating: 5.0,
      reviews: 1,
      status: "Available",
    };
    onAddEquipment(newItem);
    setShowAddModal(false);
    setEqName("");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Owner dashboard"
        title="Manage your equipment"
        subtitle="Sekajigo Equipment Ltd · Fort Portal"
        action={
          <Button variant="primary" icon={Plus} onClick={() => setShowAddModal(true)}>
            List New Equipment
          </Button>
        }
      />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <StatTile label="Active listings" value={equipmentList.length.toString()} icon={LayoutGrid} />
        <StatTile label="Pending requests" value="2" icon={ClipboardList} accent={COLORS.signalDark} />
        <StatTile label="Earnings this month" value="UGX 1.4M" icon={TrendingUp} />
        <StatTile label="Average rating" value="4.7" icon={Star} />
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 18, borderBottom: `1px solid ${COLORS.line}` }}>
        {[
          ["listings", "My listings"],
          ["requests", "Booking requests"],
          ["earnings", "Earnings"],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className="gl-body cursor-pointer"
            style={{
              padding: "10px 16px",
              fontSize: 13.5,
              fontWeight: 600,
              background: "none",
              border: "none",
              color: tab === k ? COLORS.ink : COLORS.muted,
              borderBottom: tab === k ? `2px solid ${COLORS.signal}` : "2px solid transparent",
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === "listings" && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, overflow: "hidden" }}>
          {equipmentList.map((e, i) => (
            <div
              key={e.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderTop: i ? `1px solid ${COLORS.line}` : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 7,
                    background: catByName(e.cat).color + "22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {React.createElement(catByName(e.cat).icon, { size: 16, color: catByName(e.cat).color })}
                </div>
                <div>
                  <div className="gl-body" style={{ fontWeight: 700, fontSize: 13.5 }}>
                    {e.name}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>
                    {money(e.price)}/day · {e.loc}
                  </div>
                </div>
              </div>
              <span
                className="gl-body"
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: e.status === "Available" ? "#E9F1E1" : "#F3E3DC",
                  color: e.status === "Available" ? "#3E5E22" : "#8C3E1E",
                }}
              >
                {e.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#DAD4C4] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="gl-display font-bold text-xl">List New Equipment</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#6B6A62]">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Equipment Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caterpillar D6 Dozer"
                  value={eqName}
                  onChange={(e) => setEqName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#DAD4C4] rounded-lg"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Sector Category</label>
                <select
                  value={eqCat}
                  onChange={(e) => setEqCat(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#DAD4C4] rounded-lg bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button variant="primary" style={{ width: "100%", justifyContent: "center" }}>
                Save Listing
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- RENTER DASHBOARD ---------------- */
function RenterDashboard() {
  const bookings = [
    { eq: "Bomag Road Roller BW 120", stage: 5, dates: "5–7 Sep" },
    { eq: "Event Tent & Chairs, 200-seat", stage: 8, dates: "22 Aug" },
    { eq: "30kVA Diesel Generator", stage: 2, dates: "1–2 Sep" },
  ];

  return (
    <div>
      <PageHeader eyebrow="Renter dashboard" title="Your bookings" subtitle="Turyahikayo Grace · Kasese" />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <StatTile label="Active bookings" value="2" icon={Clock} />
        <StatTile label="Completed" value="9" icon={PackageCheck} />
        <StatTile label="Total spent" value="UGX 3.1M" icon={Wallet} />
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {bookings.map((b) => {
          const eq = INITIAL_EQUIPMENT.find((e) => e.name === b.eq) || INITIAL_EQUIPMENT[0];
          const c = catByName(eq.cat);
          return (
            <div key={b.eq} style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", gap: 10, items: "center" }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      background: c.color + "22",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <c.icon size={17} color={c.color} />
                  </div>
                  <div>
                    <div className="gl-body" style={{ fontWeight: 700, fontSize: 14 }}>
                      {b.eq}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>{b.dates}</div>
                  </div>
                </div>
              </div>
              <Stepper current={b.stage} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- YOUTH AGENT DASHBOARD ---------------- */
function AgentDashboard() {
  const jobs = [
    { eq: "Borehole Drilling Rig DR-200", from: "Fort Portal", to: "Bundibugyo", status: "In transit" },
    { eq: "Bomag Road Roller BW 120", from: "Kasese depot", to: "Kilembe road site", status: "Pending pickup" },
  ];
  return (
    <div>
      <PageHeader eyebrow="Youth agent dashboard" title="Onboarding & logistics" subtitle="Region: Rwenzori · Commission rate: 8%" />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <StatTile label="Owners onboarded" value="14" icon={UserPlus} />
        <StatTile label="Active logistics jobs" value="3" icon={Truck} />
        <StatTile label="Commission this month" value="UGX 260K" icon={Banknote} />
      </div>
    </div>
  );
}

/* ---------------- GOVERNANCE DASHBOARD ---------------- */
function GovernanceDashboard() {
  return (
    <div>
      <PageHeader eyebrow="Governance dashboard" title="Oversight & accountability" subtitle="Jurisdiction: Kabarole & Kasese districts" />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <StatTile label="Equipment monitored" value="182" icon={ShieldCheck} />
        <StatTile label="Flagged listings" value="3" icon={Flag} accent="#A32D2D" />
        <StatTile label="Transactions this month" value="47" icon={ClipboardList} />
        <StatTile label="Officers active" value="6" icon={Users} />
      </div>
    </div>
  );
}

/* ---------------- MAIN APP CONTROLLER ---------------- */
export default function GearLinkUI() {
  // Main view mode: 'auth' (shows Splash / Login / Register) or 'workspace' (shows Dashboard & Marketplace)
  const [viewMode, setViewMode] = useState<"auth" | "workspace">("auth");
  const [authInitialState, setAuthInitialState] = useState<"splash" | "login" | "register" | "forgot">("splash");

  // User state
  const [user, setUser] = useState<{ name: string; role: string; phone: string; location: string } | null>(null);

  // Workspace Page & Role
  const [page, setPage] = useState("marketplace");
  const [role, setRole] = useState("owner");
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [activeEquipment, setActiveEquipment] = useState<EquipmentItem>(INITIAL_EQUIPMENT[0]);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLoginSuccess = (userData: { name: string; role: string; phone: string; location: string }) => {
    setUser(userData);
    setRole(userData.role);
    setViewMode("workspace");
    setPage("marketplace");
  };

  const handleAddEquipment = (newItem: EquipmentItem) => {
    setEquipmentList((prev) => [newItem, ...prev]);
  };

  const roleNav: Record<string, { key: string; label: string; icon: React.ElementType; page: string }[]> = {
    owner: [{ key: "owner-dash", label: "Owner dashboard", icon: HardHat, page: "owner" }],
    renter: [{ key: "renter-dash", label: "My bookings", icon: Sprout, page: "renter" }],
    agent: [{ key: "agent-dash", label: "Agent dashboard", icon: Users, page: "agent" }],
    gov: [{ key: "gov-dash", label: "Oversight", icon: Landmark, page: "gov" }],
  };

  const commonNav = [
    { key: "marketplace", label: "Marketplace", icon: LayoutGrid, page: "marketplace" },
    { key: "detail", label: "Equipment detail", icon: Search, page: "detail" },
    { key: "booking", label: "Book & pay", icon: CreditCard, page: "booking" },
  ];

  const roleLabels: Record<string, string> = {
    owner: "Owner",
    renter: "Renter",
    agent: "Youth Agent",
    gov: "Governance Officer",
  };

  /* Render Auth View if in 'auth' mode */
  if (viewMode === "auth") {
    return <AuthView initialState={authInitialState} onLoginSuccess={handleLoginSuccess} />;
  }

  /* Render Full GearLink Workspace */
  return (
    <div className="gl-body min-h-screen flex bg-[#F1EDE3] text-[#1B1B18]">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#243B34] text-[#F1EDE3] flex items-center justify-between px-4 z-40 shadow-md">
        <GearLinkLogo size="sm" showText={true} />
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-[#F1EDE3]">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-64 bg-[#243B34] text-[#F1EDE3] p-5 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } h-screen overflow-y-auto`}
      >
        <div className="mb-6 px-1 flex items-center justify-between">
          <GearLinkLogo size="md" showText={true} animated={true} />
        </div>

        {/* Auth Quick Navigation Controls */}
        <div className="mb-4 p-2 rounded-xl bg-white/10 border border-white/15 text-xs space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider font-bold text-[#E2A33B]">Auth Screens Quick Access</div>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => {
                setAuthInitialState("splash");
                setViewMode("auth");
              }}
              className="py-1 px-2 rounded bg-white/10 hover:bg-white/20 text-left font-medium"
            >
              Splash
            </button>
            <button
              onClick={() => {
                setAuthInitialState("login");
                setViewMode("auth");
              }}
              className="py-1 px-2 rounded bg-white/10 hover:bg-white/20 text-left font-medium"
            >
              Login
            </button>
            <button
              onClick={() => {
                setAuthInitialState("register");
                setViewMode("auth");
              }}
              className="py-1 px-2 rounded bg-white/10 hover:bg-white/20 text-left font-medium"
            >
              Register
            </button>
            <button
              onClick={() => {
                setAuthInitialState("forgot");
                setViewMode("auth");
              }}
              className="py-1 px-2 rounded bg-white/10 hover:bg-white/20 text-left font-medium"
            >
              OTP Reset
            </button>
          </div>
        </div>

        {/* Locked Active Account Role Display */}
        <div className="mb-4 p-2.5 rounded-xl bg-white/10 border border-white/15 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={13} className="text-[#E2A33B]" />
            <div>
              <div className="text-[10px] text-[#9AAAA3] uppercase font-bold tracking-wider">Active Role</div>
              <div className="font-bold text-white text-xs">{roleLabels[role] || getRoleLabel(role)}</div>
            </div>
          </div>
          <span className="text-[10px] bg-[#E2A33B]/20 text-[#E2A33B] border border-[#E2A33B]/40 px-2 py-0.5 rounded-full font-extrabold">
            Restricted
          </span>
        </div>

        {/* Common Navigation */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9AAAA3", padding: "0 6px", marginBottom: 6 }}>Explore</div>
        {commonNav.map((n) => (
          <button
            key={n.key}
            onClick={() => {
              setPage(n.page);
              setSidebarOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 10px",
              borderRadius: 8,
              background: page === n.page ? "rgba(255,255,255,0.12)" : "transparent",
              color: "#F1EDE3",
              border: "none",
              cursor: "pointer",
              fontSize: 13.5,
              fontWeight: 500,
              textAlign: "left",
              marginBottom: 2,
            }}
          >
            <n.icon size={15} /> {n.label}
          </button>
        ))}

        {/* Role Workspace Navigation */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9AAAA3", padding: "16px 6px 6px" }}>Your workspace</div>
        {roleNav[role]?.map((n) => (
          <button
            key={n.key}
            onClick={() => {
              setPage(n.page);
              setSidebarOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 10px",
              borderRadius: 8,
              background: page === n.page ? "rgba(255,255,255,0.12)" : "transparent",
              color: "#F1EDE3",
              border: "none",
              cursor: "pointer",
              fontSize: 13.5,
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            <n.icon size={15} /> {n.label}
          </button>
        ))}

        {/* User Footer Profile & Sign Out */}
        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: COLORS.signal,
                  color: "#3A2A0D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {user ? user.name.slice(0, 2).toUpperCase() : "SJ"}
              </div>
              <div style={{ fontSize: 12 }}>
                <div style={{ fontWeight: 600 }} className="truncate max-w-[100px]">
                  {user ? user.name : "Sekajigo James"}
                </div>
                <div style={{ color: "#9AAAA3", fontSize: 10 }}>{roleLabels[role]}</div>
              </div>
            </div>
            <button
              onClick={() => {
                setAuthInitialState("splash");
                setViewMode("auth");
              }}
              title="Sign Out to Auth"
              className="p-1.5 rounded hover:bg-white/10 text-[#9AAAA3] hover:text-white cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 sm:p-8 lg:p-10 max-lg:pt-20 overflow-x-hidden min-h-screen">
        <div className="flex justify-end gap-3 mb-4">
          <button className="p-2 rounded-full hover:bg-[#DAD4C4]/40 text-[#6B6A62]">
            <Bell size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-[#DAD4C4]/40 text-[#6B6A62]">
            <Settings size={18} />
          </button>
        </div>

        {!canAccessPage(role, page) ? (
          <div className="bg-white border border-[#DAD4C4] rounded-2xl p-8 text-center max-w-md mx-auto my-12 shadow-lg">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-[#B97F22] flex items-center justify-center mx-auto mb-4 border border-[#E2A33B]/40">
              <Lock size={28} />
            </div>
            <h2 className="gl-display font-bold text-xl text-[#1B1B18] mb-2">Access Restricted</h2>
            <p className="gl-body text-xs text-[#6B6A62] mb-6 leading-relaxed">
              Your account is registered as <strong className="text-[#1B1B18]">{getRoleLabel(role)}</strong>. You are only authorized to access your designated workspace dashboard.
            </p>
            <Button variant="primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setPage(getRoleDashboardPage(role))}>
              Go to {getRoleLabel(role)} Dashboard
            </Button>
          </div>
        ) : (
          <>
            {page === "marketplace" && (
              <MarketplacePage
                setPage={setPage}
                setActiveEquipment={setActiveEquipment}
                activeCat={activeCat}
                setActiveCat={setActiveCat}
                equipmentList={equipmentList}
              />
            )}
            {page === "detail" && <DetailPage item={activeEquipment} setPage={setPage} />}
            {page === "booking" && <BookingPage item={activeEquipment} setPage={setPage} userRole={role} />}
            {page === "owner" && <OwnerDashboard equipmentList={equipmentList} onAddEquipment={handleAddEquipment} />}
            {page === "renter" && <RenterDashboard />}
            {page === "agent" && <AgentDashboard />}
            {page === "gov" && <GovernanceDashboard />}
          </>
        )}
      </div>
    </div>
  );
}
