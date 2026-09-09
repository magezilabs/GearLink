"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, TrendingUp, ArrowUpRight } from "lucide-react";
import { COLORS, LIFECYCLE, catByName } from "@/lib/equipment-data";

/* ── CategoryChip ─────────────────────────────────────────────────────────── */
export function CategoryChip({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const c = catByName(name);
  const Icon = c.icon;
  return (
    <span
      className="gl-body inline-flex items-center gap-1.5 font-semibold transition-colors"
      style={{
        padding: size === "sm" ? "3px 10px" : "5px 13px",
        borderRadius: 999,
        fontSize: size === "sm" ? 11.5 : 12.5,
        fontWeight: 600,
        background: c.color + "18",
        color: c.color,
        border: `1px solid ${c.color}44`,
      }}
    >
      <Icon size={size === "sm" ? 12 : 14} />
      {name}
    </span>
  );
}

/* ── StatTile ────────────────────────────────────────────────────────────── */
export function StatTile({
  label, value, icon: Icon, accent, trend, sub,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  accent?: string;
  trend?: string;
  sub?: string;
}) {
  const color = accent || COLORS.steel;
  return (
    <div className="glow-card flex-1 min-w-[160px] p-5">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: color + "14" }}
        >
          <Icon size={19} color={color} />
        </div>
        {trend && (
          <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <ArrowUpRight size={10} /> {trend}
          </span>
        )}
      </div>
      <div className="gl-display font-extrabold text-[28px] text-[#1B1B18] leading-none mb-1">
        {value}
      </div>
      <div className="gl-body text-xs font-semibold text-[#9B9A93] uppercase tracking-wide">
        {label}
      </div>
      {sub && (
        <div className="gl-body text-[11px] text-[#9B9A93] mt-1">{sub}</div>
      )}
    </div>
  );
}

/* ── GearButton ─────────────────────────────────────────────────────────── */
export function GearButton({
  children, variant = "primary", icon: Icon, onClick, style,
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
    padding: "10px 20px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    ...style,
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg, #F5B038 0%, #D48E1D 100%)",
      color: "#241804",
      borderColor: "#C4821A",
      boxShadow: "0 4px 16px rgba(245,176,56,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
    },
    dark: {
      background: "linear-gradient(145deg, #1A3029 0%, #0F1C18 100%)",
      color: "#F1EDE3",
      borderColor: "#1A3029",
      boxShadow: "0 4px 14px rgba(26,48,41,0.30)",
    },
    outline: {
      background: "#FFFFFF",
      color: COLORS.steel,
      borderColor: "#E2DCD0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    },
    ghost: {
      background: "transparent",
      color: COLORS.muted,
      borderColor: "transparent",
    },
  };
  return (
    <button
      className="gl-body hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
      onClick={onClick}
      style={{ ...base, ...variants[variant] }}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

/* ── Stepper ─────────────────────────────────────────────────────────────── */
export function Stepper({ current }: { current: number }) {
  return (
    <div className="flex overflow-x-auto gap-0 py-1 no-scrollbar">
      {LIFECYCLE.map((step, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={step} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center w-20">
              <div
                style={{
                  width: 28, height: 28,
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800,
                  background: done ? COLORS.steel : active ? "linear-gradient(135deg,#F5B038,#D48E1D)" : "#F7F4EF",
                  color: done ? "#fff" : active ? "#241804" : COLORS.muted,
                  border: `2px solid ${done ? COLORS.steel : active ? "#D48E1D" : "#E2DCD0"}`,
                  boxShadow: active ? "0 0 0 4px rgba(245,176,56,0.2)" : "none",
                }}
              >
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span
                className="gl-body mt-1.5 text-center leading-tight"
                style={{
                  fontSize: 10.5,
                  color: active ? COLORS.ink : done ? COLORS.steel : COLORS.muted,
                  fontWeight: active ? 700 : done ? 600 : 500,
                  maxWidth: 72,
                }}
              >
                {step}
              </span>
            </div>
            {i < LIFECYCLE.length - 1 && (
              <div
                style={{
                  width: 20, height: 2, marginTop: -18,
                  background: done ? COLORS.steel : "#E2DCD0",
                  borderRadius: 2,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── PageHeader ──────────────────────────────────────────────────────────── */
export function PageHeader({
  eyebrow, title, subtitle, action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-start mb-7 flex-wrap gap-4">
      <div>
        {eyebrow && (
          <div className="gl-body inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/12 border border-amber-500/25 text-amber-700 font-bold text-[11px] uppercase tracking-wide mb-2.5">
            <ShieldCheck size={12} /> {eyebrow}
          </div>
        )}
        <h1 className="gl-display text-3xl sm:text-4xl font-extrabold text-[#1B1B18] leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="gl-body text-sm text-[#6B6A62] mt-2 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export { COLORS, catByName, LIFECYCLE };
