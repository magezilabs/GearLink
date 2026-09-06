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
  SlidersHorizontal,
  Activity,
  FileText,
  Sparkles,
  HelpCircle,
  ShieldAlert,
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
  img3d?: string;
}

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  { id: 1, name: "John Deere 5075E Tractor", cat: "Agriculture", loc: "Kabarole", price: 180000, owner: "Byaruhanga Moses", rating: 4.8, reviews: 23, status: "Available", img3d: "/3d_tractor.png" },
  { id: 2, name: "Borehole Drilling Rig DR-200", cat: "Water & Boreholes", loc: "Fort Portal", price: 950000, owner: "Kasese Water Works Ltd", rating: 4.9, reviews: 11, status: "Available", img3d: "/3d_rig.png" },
  { id: 3, name: "Bomag Road Roller BW 120", cat: "Construction & Roads", loc: "Kasese", price: 320000, owner: "Turyahikayo Grace", rating: 4.6, reviews: 17, status: "Booked", img3d: "/3d_dozer.png" },
  { id: 4, name: "30kVA Diesel Generator", cat: "Workshop & Industrial", loc: "Fort Portal", price: 150000, owner: "Asiimwe Deo", rating: 4.7, reviews: 30, status: "Available" },
  { id: 5, name: "Isuzu FRR Truck, 7-tonne", cat: "Transport & Logistics", loc: "Bundibugyo", price: 280000, owner: "Rugendabanga Transport Co.", rating: 4.5, reviews: 19, status: "Available" },
  { id: 6, name: "Event Tent & Chairs, 200-seat", cat: "Events & Hospitality", loc: "Fort Portal", price: 400000, owner: "Nanyunja Jackline", rating: 4.9, reviews: 41, status: "Available" },
  { id: 7, name: "Concrete Mixer 350L", cat: "Construction & Roads", loc: "Kyenjojo", price: 90000, owner: "Sekajigo Equipment Ltd", rating: 4.4, reviews: 8, status: "Available" },
  { id: 8, name: "District Grader CAT 120", cat: "Government & Public Works", loc: "Fort Portal", price: 520000, owner: "Kabarole District Works Dept", rating: 4.9, reviews: 6, status: "Available", img3d: "/3d_dozer.png" },
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
  trend,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  accent?: string;
  trend?: string;
}) {
  return (
    <div
      className="glow-card glass-panel transition-all duration-300"
      style={{
        borderRadius: 14,
        padding: "18px 20px",
        flex: 1,
        minWidth: 170,
        boxShadow: "0 4px 20px -5px rgba(26, 48, 41, 0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span className="gl-body" style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </span>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: (accent || COLORS.steel) + "18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} color={accent || COLORS.steel} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div className="gl-display" style={{ fontSize: 30, fontWeight: 800, color: COLORS.ink, lineHeight: 1 }}>
          {value}
        </div>
        {trend && (
          <span className="text-[11px] font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <TrendingUp size={11} /> {trend}
          </span>
        )}
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
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    ...style,
  };
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: "linear-gradient(135deg, #F5B038 0%, #D48E1D 100%)", color: "#241804", borderColor: COLORS.signalDark, boxShadow: "0 4px 14px rgba(245, 176, 56, 0.35)" },
    dark: { background: "linear-gradient(145deg, #1A3029 0%, #11221D 100%)", color: "#F1EDE3", borderColor: "#1A3029", boxShadow: "0 4px 14px rgba(26, 48, 41, 0.25)" },
    outline: { background: "rgba(255,255,255,0.7)", color: COLORS.steel, borderColor: COLORS.line },
    ghost: { background: "transparent", color: COLORS.muted, borderColor: "transparent" },
  };
  return (
    <button className="gl-body hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md" onClick={onClick} style={{ ...base, ...styles[variant] }}>
      {Icon && <Icon size={16} />}
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
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11.5,
                  fontWeight: 800,
                  background: done ? COLORS.steel : active ? "linear-gradient(135deg, #F5B038, #D48E1D)" : "#fff",
                  color: done ? "#fff" : active ? "#241804" : COLORS.muted,
                  border: `2px solid ${done ? COLORS.steel : active ? COLORS.signalDark : COLORS.line}`,
                  boxShadow: active ? "0 0 12px rgba(245, 176, 56, 0.5)" : "none",
                }}
              >
                {done ? <CheckCircle2 size={15} /> : i + 1}
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
              <div style={{ width: 26, height: 2, background: done ? COLORS.steel : COLORS.line, marginTop: -18 }} />
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
          <div className="gl-body inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5B038]/15 border border-[#F5B038]/40 text-[#B97F22] font-bold text-xs mb-2">
            <ShieldCheck size={13} /> {eyebrow}
          </div>
        )}
        <h1 className="gl-display text-3xl sm:text-4xl font-extrabold text-[#1B1B18] tracking-tight margin-0 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="gl-body text-sm text-[#6B6A62] mt-1.5 max-w-xl leading-relaxed">
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
        eyebrow="GearLink Verified Marketplace"
        title="Find & Rent Equipment Near You"
        subtitle="Escrow-protected machinery sharing for agriculture, construction, boreholes & commercial transport."
      />

      {/* Search & Filter Bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div
          className="glass-panel"
          style={{
            flex: "1 1 280px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderRadius: 12,
            padding: "10px 16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          }}
        >
          <Search size={18} className="text-[#6B6A62]" />
          <input
            type="text"
            placeholder="Search tractors, borehole rigs, generators, trucks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="gl-body w-full text-sm bg-transparent border-none focus:outline-none text-[#1B1B18] font-medium"
          />
        </div>
        <Button variant="outline" icon={Filter} onClick={() => setSearchTerm("")}>
          {searchTerm ? "Clear Filters" : "Filter Options"}
        </Button>
      </div>

      {/* Sector Category Chips */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, marginBottom: 24 }} className="no-scrollbar">
        <button
          onClick={() => setActiveCat(null)}
          className="gl-body cursor-pointer transition-all duration-200"
          style={{
            flexShrink: 0,
            padding: "8px 16px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
            background: !activeCat ? "linear-gradient(145deg, #1A3029, #11221D)" : "#fff",
            color: !activeCat ? "#fff" : COLORS.ink,
            border: `1px solid ${!activeCat ? "#1A3029" : COLORS.line}`,
            boxShadow: !activeCat ? "0 4px 12px rgba(26,48,41,0.2)" : "none",
          }}
        >
          All Sectors ({equipmentList.length})
        </button>
        {CATEGORIES.map((c) => {
          const count = equipmentList.filter((e) => e.cat === c.name).length;
          const isActive = activeCat === c.name;
          return (
            <button
              key={c.name}
              onClick={() => setActiveCat(c.name)}
              className="gl-body flex items-center gap-2 cursor-pointer transition-all duration-200"
              style={{
                flexShrink: 0,
                padding: "8px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                background: isActive ? c.color : "#fff",
                color: isActive ? "#fff" : COLORS.ink,
                border: `1px solid ${isActive ? c.color : COLORS.line}`,
                boxShadow: isActive ? `0 4px 14px ${c.color}40` : "none",
              }}
            >
              <c.icon size={14} />
              {c.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Equipment Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
        {filtered.map((item) => {
          const c = catByName(item.cat);
          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveEquipment(item);
                setPage("detail");
              }}
              className="card-3d glass-panel-3d cursor-pointer group rounded-2xl overflow-hidden relative"
            >
              {/* Header Image / 3D Render Podium Area */}
              <div
                className="podium-3d"
                style={{
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  background: item.img3d 
                    ? `radial-gradient(circle at 50% 60%, ${c.color}40 0%, #11221D 90%)` 
                    : `linear-gradient(135deg, ${c.color}35 0%, #1A3029 100%)`,
                }}
              >
                {item.img3d ? (
                  <img
                    src={item.img3d}
                    alt={item.name}
                    className="h-28 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/60">
                    <c.icon size={36} color={c.color} />
                  </div>
                )}
                
                {/* 3D Status Badge */}
                <span
                  className="gl-body flex items-center gap-1.5 shadow-lg"
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: item.status === "Available" ? "rgba(16, 185, 129, 0.95)" : "rgba(239, 68, 68, 0.95)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255,255,255,0.4)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className={`w-2 h-2 rounded-full ${item.status === "Available" ? "bg-white animate-pulse" : "bg-white"}`} />
                  {item.status}
                </span>

                {/* 3D Rating Pill */}
                <span
                  className="gl-body flex items-center gap-1 shadow-md"
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    fontSize: 11.5,
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.92)",
                    color: COLORS.ink,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  <Star size={13} fill={COLORS.signal} color={COLORS.signal} /> {item.rating} ({item.reviews})
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: 18 }}>
                <CategoryChip name={item.cat} size="sm" />
                
                <h3 className="gl-body font-extrabold text-base text-[#1B1B18] mt-2 mb-1 line-clamp-1 group-hover:text-[#B97F22] transition-colors">
                  {item.name}
                </h3>
                
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: COLORS.muted, marginBottom: 14 }}>
                  <MapPin size={13} className="text-[#C6821F]" />
                  <span className="font-semibold text-[#1B1B18]">{item.loc}</span>
                  <span className="text-[#DAD4C4]">•</span>
                  <span className="truncate">{item.owner}</span>
                </div>

                <div className="pt-3 border-t border-[#DAD4C4]/60 flex items-center justify-between">
                  <div>
                    <span className="gl-display font-extrabold text-lg text-[#1B1B18]">
                      {money(item.price)}
                    </span>
                    <span className="gl-body text-xs font-semibold text-[#6B6A62]"> /day</span>
                  </div>
                  
                  <button className="btn-3d-gold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer">
                    Book 3D <ChevronRight size={14} />
                  </button>
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
  
  // 4 & 5. Purpose, Site Details & Enforcement State
  const [rentalPurpose, setRentalPurpose] = useState("Ploughing 5 acres of maize farm in Kicwamba");
  const [siteAddress, setSiteAddress] = useState("Kicwamba Village, Plot 4 Block B, Kabarole");
  const [gpsConsent, setGpsConsent] = useState(true);

  const eq = item || INITIAL_EQUIPMENT[0];
  const rentalFee = eq.price * 3;
  const securityDeposit = Math.round(eq.price * 0.8); // Refundable security deposit held in escrow
  const serviceFee = 25000;
  const total = rentalFee + securityDeposit + serviceFee;
  
  const heavy = ["Water & Boreholes", "Construction & Roads", "Transport & Logistics", "Government & Public Works"].includes(eq.cat);

  return (
    <div>
      <PageHeader eyebrow="Booking & Escrow Trust Stake" title="Book and deposit into escrow" subtitle="Your deposit & rental fees are safely held in escrow until physical return is verified." />
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: "18px 22px", marginBottom: 22 }}>
        <Stepper current={3} />
      </div>

      {paymentSuccess ? (
        <div style={{ background: COLORS.panel, border: `2px solid ${COLORS.steel}`, borderRadius: 16, padding: 32, textAlign: "center", maxWidth: 540, margin: "0 auto" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#E9F1E1", color: "#3E5E22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <CheckCircle2 size={32} />
          </div>
          <h2 className="gl-display" style={{ fontSize: 28, fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>
            Escrow Stake Secured!
          </h2>
          <p className="gl-body" style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.5, marginBottom: 16 }}>
            {money(total)} has been deposited into GearLink Escrow ({money(rentalFee)} rental fee + {money(securityDeposit)} refundable deposit).
          </p>
          <div className="p-3 bg-[#F1EDE3] rounded-xl border border-[#DAD4C4] text-xs text-left mb-6 space-y-1">
            <div><strong className="text-[#243B34]">Stated Purpose:</strong> {rentalPurpose}</div>
            <div><strong className="text-[#243B34]">Worksite Delivery:</strong> {siteAddress}</div>
            <div><strong className="text-[#243B34]">Youth Agent Assigned:</strong> Moses Byaruhanga (Fort Portal Region)</div>
          </div>
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
            {/* Booking Summary Card */}
            <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 20, marginBottom: 18 }}>
              <div className="gl-display" style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
                Booking & Stake Summary
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

              {/* Itemized Financial Escrow Breakdown */}
              <div style={{ marginTop: 14, fontSize: 13.5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${COLORS.line}` }}>
                  <span style={{ color: COLORS.muted }}>Rental duration</span>
                  <span>12 – 15 Sep 2026 (3 days)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${COLORS.line}` }}>
                  <span style={{ color: COLORS.muted }}>Rental fee (3 days × {money(eq.price)})</span>
                  <span>{money(rentalFee)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${COLORS.line}`, color: "#3E5E22", fontWeight: 600 }}>
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={14} /> 2. Refundable Security Deposit (Escrow Stake)
                  </span>
                  <span>{money(securityDeposit)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${COLORS.line}` }}>
                  <span style={{ color: COLORS.muted }}>Service & Insurance fee</span>
                  <span>{money(serviceFee)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: `1px solid ${COLORS.line}`, fontWeight: 700, fontSize: 15 }}>
                  <span>Total Escrow Deposit</span>
                  <span>{money(total)}</span>
                </div>
              </div>
            </div>

            {/* 4. Purpose & Logistics Input Form */}
            <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 20, marginBottom: 18 }}>
              <div className="gl-display flex items-center gap-2" style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
                <MapPin size={16} className="text-[#C6821F]" />
                <span>4. Stated Purpose & Worksite Logistics</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                    Stated Purpose of Rental
                  </label>
                  <input
                    type="text"
                    required
                    value={rentalPurpose}
                    onChange={(e) => setRentalPurpose(e.target.value)}
                    placeholder="e.g. Ploughing 5 acres in Kicwamba village"
                    className="w-full px-3 py-2 text-xs bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-lg"
                  />
                  <div className="text-[10px] text-[#6B6A62] mt-0.5">
                    Matches sector class: <span className="font-bold text-[#5C7A32]">{eq.cat}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                    Exact Worksite / Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                    placeholder="Physical location where equipment will operate"
                    className="w-full px-3 py-2 text-xs bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* 5. Enforcement & Tracking Consent */}
            <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 18, marginBottom: 18 }}>
              <div className="gl-display text-sm font-bold mb-2 flex items-center gap-1.5 text-[#243B34]">
                <ShieldCheck size={16} className="text-[#E2A33B]" />
                <span>5. Tracking & Inspection Agreements</span>
              </div>
              <div className="space-y-2 text-xs text-[#6B6A62]">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gpsConsent}
                    onChange={(e) => setGpsConsent(e.target.checked)}
                    className="mt-0.5 rounded border-[#DAD4C4]"
                  />
                  <span>
                    <strong>GPS Location Sharing:</strong> I agree to GPS tracking during the active rental window for machinery safety and return confirmation.
                  </span>
                </label>
                <div className="flex items-center gap-1.5 text-[11px] text-[#243B34] font-medium pt-1">
                  <CheckCircle2 size={13} className="text-[#5C7A32]" />
                  <span>Youth Agent physical hand-off & return condition photo reports enabled</span>
                </div>
              </div>
            </div>

            {heavy && (
              <div style={{ background: "#FBF3E4", border: `1px solid ${COLORS.signalDark}55`, borderRadius: 12, padding: 16, marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Truck size={16} color={COLORS.signalDark} />
                  <span className="gl-body" style={{ fontWeight: 700, fontSize: 14 }}>
                    Youth Agent Physical Check-in Required
                  </span>
                </div>
                <p className="gl-body" style={{ fontSize: 13, color: "#5A4520", margin: 0 }}>
                  Heavy equipment requires physical inspection. A Youth Agent will inspect delivery & handoff on site.
                </p>
              </div>
            )}

            {/* Payment Method Selector */}
            <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 20 }}>
              <div className="gl-display" style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
                Escrow Payment Method
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
                2-Way Escrow Protection
              </div>
              <p className="gl-body" style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.9, marginBottom: 14 }}>
                Your payment and security deposit ({money(securityDeposit)}) are locked in escrow. Rental fee is released to the owner upon delivery, and your deposit is automatically refunded upon confirmed equipment return.
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
  const [successMsg, setSuccessMsg] = useState("");

  // Equipment Form Fields
  const [eqName, setEqName] = useState("");
  const [eqCat, setEqCat] = useState("Agriculture");
  const [eqLoc, setEqLoc] = useState("Fort Portal");
  const [eqPrice, setEqPrice] = useState<number | string>(150000);
  const [eqDescription, setEqDescription] = useState("");
  const [eqImagePreview, setEqImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEqImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eqName) return;
    const newItem: EquipmentItem = {
      id: Date.now(),
      name: eqName,
      cat: eqCat,
      loc: eqLoc || "Fort Portal",
      price: Number(eqPrice) || 150000,
      owner: "Sekajigo Equipment Ltd",
      rating: 5.0,
      reviews: 0,
      status: "Available",
    };
    onAddEquipment(newItem);
    setShowAddModal(false);
    setSuccessMsg(`"${eqName}" has been successfully published to the GearLink Marketplace!`);
    
    // Reset Form
    setEqName("");
    setEqLoc("Fort Portal");
    setEqPrice(150000);
    setEqDescription("");
    setEqImagePreview(null);

    // Clear success message after 5s
    setTimeout(() => {
      setSuccessMsg("");
    }, 5000);
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

      {successMsg && (
        <div className="mb-6 p-4 bg-[#E9F1E1] border border-[#5C7A32]/40 rounded-xl text-[#3E5E22] flex items-center justify-between text-sm font-semibold shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#5C7A32]" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg("")} className="text-[#3E5E22] hover:opacity-75">
            <X size={16} />
          </button>
        </div>
      )}

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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] border border-[#DAD4C4] rounded-2xl p-6 max-w-lg w-full shadow-2xl my-8">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#DAD4C4]">
              <div>
                <h3 className="gl-display font-bold text-xl text-[#1B1B18]">List New Equipment</h3>
                <p className="gl-body text-xs text-[#6B6A62]">Upload details & photos to share your machinery on GearLink</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-[#6B6A62] hover:text-[#1B1B18]">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-4">
              {/* Equipment Photo Upload */}
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Equipment Image / Photo</label>
                <div className="border-2 border-dashed border-[#DAD4C4] rounded-xl p-4 text-center bg-[#F1EDE3]/40 hover:bg-[#F1EDE3]/80 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {eqImagePreview ? (
                    <div className="flex flex-col items-center">
                      <img src={eqImagePreview} alt="Equipment preview" className="h-32 object-cover rounded-lg mb-2 shadow-sm" />
                      <span className="text-xs text-[#5C7A32] font-semibold flex items-center gap-1">
                        <CheckCircle2 size={13} /> Photo uploaded. Click to change.
                      </span>
                    </div>
                  ) : (
                    <div className="py-2 flex flex-col items-center gap-1.5 text-[#6B6A62]">
                      <div className="w-10 h-10 rounded-full bg-[#E2A33B]/20 text-[#B97F22] flex items-center justify-center">
                        <Plus size={20} />
                      </div>
                      <span className="text-xs font-semibold text-[#1B1B18]">Click to upload machinery photo</span>
                      <span className="text-[11px] text-[#6B6A62]">Supports PNG, JPG, WEBP (Max 5MB)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Equipment Name */}
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Equipment Title / Model Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caterpillar D6 Dozer or John Deere 5075E"
                  value={eqName}
                  onChange={(e) => setEqName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DAD4C4] rounded-lg bg-[#F1EDE3]/30 focus:bg-white focus:outline-none focus:border-[#243B34] text-[#1B1B18]"
                />
              </div>

              {/* Grid: Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Sector Category *</label>
                  <select
                    value={eqCat}
                    onChange={(e) => setEqCat(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-[#DAD4C4] rounded-lg bg-white focus:outline-none focus:border-[#243B34] text-[#1B1B18]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Location / District *</label>
                  <select
                    value={eqLoc}
                    onChange={(e) => setEqLoc(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-[#DAD4C4] rounded-lg bg-white focus:outline-none focus:border-[#243B34] text-[#1B1B18]"
                  >
                    <option value="Fort Portal">Fort Portal</option>
                    <option value="Kabarole">Kabarole</option>
                    <option value="Kasese">Kasese</option>
                    <option value="Kyenjojo">Kyenjojo</option>
                    <option value="Bundibugyo">Bundibugyo</option>
                    <option value="Kamwenge">Kamwenge</option>
                  </select>
                </div>
              </div>

              {/* Price per day */}
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Daily Rental Rate (UGX) *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-[#6B6A62]">UGX</span>
                  <input
                    type="number"
                    required
                    min="10000"
                    step="5000"
                    placeholder="150000"
                    value={eqPrice}
                    onChange={(e) => setEqPrice(e.target.value)}
                    className="w-full pl-14 pr-3.5 py-2.5 text-sm border border-[#DAD4C4] rounded-lg bg-[#F1EDE3]/30 focus:bg-white focus:outline-none focus:border-[#243B34] text-[#1B1B18] font-bold"
                  />
                </div>
              </div>

              {/* Equipment Condition & Description */}
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Description & Specifications</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Excellent working condition, serviced weekly. Operator included upon request."
                  value={eqDescription}
                  onChange={(e) => setEqDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DAD4C4] rounded-lg bg-[#F1EDE3]/30 focus:bg-white focus:outline-none focus:border-[#243B34] text-[#1B1B18] resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 border border-[#DAD4C4] rounded-xl text-sm font-semibold text-[#6B6A62] hover:bg-[#F1EDE3]"
                >
                  Cancel
                </button>
                <Button variant="primary" style={{ flex: 2, justifyContent: "center", borderRadius: "12px" }}>
                  Publish Listing
                </Button>
              </div>
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
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
      <PageHeader eyebrow="Governance Officer dashboard" title="Equipment & Inspection Audit" subtitle="Rwenzori Region Inspection Log" />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <StatTile label="Total Inspections" value="48" icon={ShieldCheck} />
        <StatTile label="Pending Verification" value="3" icon={Clock} accent={COLORS.signalDark} />
        <StatTile label="Compliant Fleet" value="98.2%" icon={CheckCircle2} />
      </div>
    </div>
  );
}

/* ---------------- UNIVERSAL DASHBOARD COMMAND DRAWER ---------------- */
function DashboardDrawer({
  isOpen,
  onClose,
  user,
  role,
  setRole,
  setPage,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; role: string; phone: string; location: string } | null;
  role: string;
  setRole: (r: string) => void;
  setPage: (p: string) => void;
}) {
  const [tab, setTab] = useState<"activity" | "tools" | "radar">("activity");

  if (!isOpen) return null;

  const roleLabels: Record<string, string> = {
    owner: "Equipment Owner",
    renter: "Equipment Renter",
    agent: "Youth Logistics Agent",
    gov: "Governance Inspector",
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#1A3029] text-[#F1EDE3] h-full shadow-2xl flex flex-col z-10 border-l border-white/10 overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#11221D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5B038]/20 border border-[#F5B038]/40 flex items-center justify-center text-[#F5B038]">
              <SlidersHorizontal size={20} />
            </div>
            <div>
              <h2 className="gl-display font-extrabold text-lg text-white">Platform Command Drawer</h2>
              <p className="gl-body text-xs text-[#E2DCD0]/70">Universal Control & Real-time Operations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card & Role Switcher */}
        <div className="p-5 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#F5B038] text-[#241804] font-extrabold text-lg flex items-center justify-center border-2 border-white shadow-md">
              {(user?.name || "Sekajigo James").charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-white">{user?.name || "Sekajigo James"}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] font-extrabold border border-[#10B981]/40">
                  Verified
                </span>
              </div>
              <p className="text-xs text-[#E2DCD0]/70">{user?.location || "Fort Portal, Kabarole"} • {user?.phone || "+256 772 123456"}</p>
            </div>
          </div>

          {/* Quick Role Switcher */}
          <div className="mt-3">
            <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#E2DCD0]/60 mb-2">Switch Active Dashboard</div>
            <div className="grid grid-cols-2 gap-1.5 bg-[#11221D] p-1.5 rounded-xl border border-white/10">
              {(["owner", "renter", "agent", "gov"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setPage(getRoleDashboardPage(r));
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                    role === r
                      ? "bg-[#F5B038] text-[#241804] shadow-md"
                      : "text-[#E2DCD0]/80 hover:bg-white/10"
                  }`}
                >
                  {roleLabels[r]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 bg-[#11221D]">
          <button
            onClick={() => setTab("activity")}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              tab === "activity"
                ? "border-[#F5B038] text-[#F5B038] bg-white/5"
                : "border-transparent text-[#E2DCD0]/70 hover:text-white"
            }`}
          >
            <Activity size={15} /> Activity Feed
          </button>
          <button
            onClick={() => setTab("tools")}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              tab === "tools"
                ? "border-[#F5B038] text-[#F5B038] bg-white/5"
                : "border-transparent text-[#E2DCD0]/70 hover:text-white"
            }`}
          >
            <Sparkles size={15} /> Quick Tools
          </button>
          <button
            onClick={() => setTab("radar")}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              tab === "radar"
                ? "border-[#F5B038] text-[#F5B038] bg-white/5"
                : "border-transparent text-[#E2DCD0]/70 hover:text-white"
            }`}
          >
            <MapPin size={15} /> Field Radar
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {tab === "activity" && (
            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 text-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Escrow Payment Locked</div>
                  <p className="text-[11.5px] text-[#E2DCD0]/70 mt-0.5">UGX 180,000 held in Mobile Money Escrow for John Deere 5075E Tractor.</p>
                  <span className="text-[10px] text-[#F5B038] font-semibold mt-1 block">2 mins ago</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5B038]/20 text-[#F5B038] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Truck size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Youth Agent Dispatched</div>
                  <p className="text-[11.5px] text-[#E2DCD0]/70 mt-0.5">Agent Moses verified Borehole Rig DR-200 readiness in Fort Portal.</p>
                  <span className="text-[10px] text-[#F5B038] font-semibold mt-1 block">18 mins ago</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Governance Audit Complete</div>
                  <p className="text-[11.5px] text-[#E2DCD0]/70 mt-0.5">Grader CAT 120 safety certification validated by Kabarole District Officer.</p>
                  <span className="text-[10px] text-[#F5B038] font-semibold mt-1 block">1 hour ago</span>
                </div>
              </div>
            </div>
          )}

          {tab === "tools" && (
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setRole("owner");
                  setPage("owner");
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-[#F5B038] to-[#D48E1D] text-[#241804] font-extrabold p-3 rounded-xl flex items-center justify-between text-xs shadow-lg hover:opacity-95 transition-opacity"
              >
                <span className="flex items-center gap-2">
                  <Plus size={16} /> List New Equipment Item
                </span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => {
                  setPage("marketplace");
                  onClose();
                }}
                className="w-full bg-white/10 hover:bg-white/15 text-white font-bold p-3 rounded-xl flex items-center justify-between text-xs border border-white/10 transition-all"
              >
                <span className="flex items-center gap-2">
                  <LayoutGrid size={16} className="text-[#F5B038]" /> Explore Marketplace Fleet
                </span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => {
                  setRole("gov");
                  setPage("gov");
                  onClose();
                }}
                className="w-full bg-white/10 hover:bg-white/15 text-white font-bold p-3 rounded-xl flex items-center justify-between text-xs border border-white/10 transition-all"
              >
                <span className="flex items-center gap-2">
                  <ShieldAlert size={16} className="text-[#10B981]" /> Government Audit Portal
                </span>
                <ChevronRight size={16} />
              </button>

              <div className="pt-2 border-t border-white/10 mt-4">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#E2DCD0]/60 mb-2">Platform Support</div>
                <div className="bg-[#11221D] p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-white">
                    <Phone size={14} className="text-[#F5B038]" />
                    <span>24/7 Escrow Hotline</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#F5B038]">+256 800 555 999</span>
                </div>
              </div>
            </div>
          )}

          {tab === "radar" && (
            <div className="space-y-3">
              <div className="bg-[#11221D] p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#F5B038]" /> Rwenzori Region Operations
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold">100% Online</span>
                </div>
                <p className="text-[11.5px] text-[#E2DCD0]/70">Fort Portal • Kabarole • Kasese • Kyenjojo • Bundibugyo</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-[10px] text-[#E2DCD0]/60 font-bold uppercase">District Hubs</div>
                  <div className="text-base font-extrabold text-white mt-1">5 Districts</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-[10px] text-[#E2DCD0]/60 font-bold uppercase">Youth Agents</div>
                  <div className="text-base font-extrabold text-[#F5B038] mt-1">34 Active</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-white/10 bg-[#11221D] flex items-center justify-between text-xs text-[#E2DCD0]/70">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" /> Mobile Money Escrow v2.4
          </span>
          <button onClick={onClose} className="text-[#F5B038] font-bold hover:underline">
            Close Drawer
          </button>
        </div>
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
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <div className="flex-1 p-5 sm:p-8 lg:p-10 max-lg:pt-20 overflow-x-hidden min-h-screen">
        {/* Top Header & Investor Highlights Banner */}
        <div className="mb-6 bg-gradient-to-r from-[#1A3029] via-[#243B34] to-[#1A3029] rounded-2xl p-5 text-white shadow-xl border border-white/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-l from-[#F5B038]/15 to-transparent pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#F5B038]/20 border border-[#F5B038]/40 flex items-center justify-center text-[#F5B038] shadow-inner">
                <TrendingUp size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="gl-display font-extrabold text-xl text-white tracking-wide">GearLink Investor Metrics</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981] text-[10.5px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" /> Smart Escrow Active
                  </span>
                </div>
                <p className="gl-body text-xs text-[#E2DCD0]/80 mt-0.5">East Africa's decentralized rural machinery sharing platform backed by 2-way collateralized escrow.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[10px] text-[#E2DCD0]/70 uppercase font-bold tracking-wider">Escrow Volume</div>
                <div className="gl-display font-extrabold text-base text-[#F5B038]">UGX 48.5M</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[10px] text-[#E2DCD0]/70 uppercase font-bold tracking-wider">Monitored Fleet</div>
                <div className="gl-display font-extrabold text-base text-white">182 Items</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[10px] text-[#E2DCD0]/70 uppercase font-bold tracking-wider">Utilization</div>
                <div className="gl-display font-extrabold text-base text-[#10B981]">86.4%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[10px] text-[#E2DCD0]/70 uppercase font-bold tracking-wider">Default Rate</div>
                <div className="gl-display font-extrabold text-base text-[#F5B038]">0.00%</div>
              </div>
            </div>
          </div>
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

      {/* Persistent 3D Floating Command Drawer Trigger */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 btn-3d-gold flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl text-xs font-extrabold tracking-wide uppercase cursor-pointer hover:scale-105 transition-all"
        title="Open Universal Command Drawer"
      >
        <SlidersHorizontal size={18} />
        <span>Command Drawer</span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
      </button>

      {/* Render Universal Command Drawer */}
      <DashboardDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={user}
        role={role}
        setRole={setRole}
        setPage={setPage}
      />
    </div>
  );
}
