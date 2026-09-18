"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, TrendingUp } from "lucide-react";
import { LIFECYCLE, catByName } from "@/lib/equipment-data";

/* ── CategoryChip ─────────────────────────────────────────────────────────── */
export function CategoryChip({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const c = catByName(name);
  const Icon = c.icon;
  return (
    <span
      className="gl-body inline-flex items-center gap-1.5 font-semibold rounded-full"
      style={{
        padding: size === "sm" ? "3px 10px" : "5px 13px",
        fontSize: size === "sm" ? 11 : 12.5,
        background: c.color + "18",
        color: c.color,
        border: `1px solid ${c.color}40`,
      }}
    >
      <Icon size={size === "sm" ? 11 : 13} />
      {name}
    </span>
  );
}

/* ── StatTile ─────────────────────────────────────────────────────────────── */
export function StatTile({
  label, value, icon: Icon, accent, trend, sub, variant = "default",
}: {
  label: string; value: string; icon: React.ElementType;
  accent?: string; trend?: string; sub?: string;
  variant?: "default" | "premium" | "gradient" | "executive";
}) {
  const color = accent || "var(--c-p)";
  
  const cardClass = variant === "premium" ? "premium-card" 
                  : variant === "gradient" ? "gradient-card"
                  : variant === "executive" ? "executive-card"
                  : "glow-card";

  return (
    <div className={`${cardClass} flex-1 min-w-[180px] p-6 animate-fade-up interactive-lift`}>
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden"
          style={{ background: accent ? accent + "12" : "rgba(255,107,53,0.12)", border: `1px solid ${accent ? accent + "25" : "rgba(255,107,53,0.25)"}` }}
        >
          <Icon size={24} style={{ color, position: "relative", zIndex: 1 }} />
        </div>
        {trend && (
          <span className="professional-badge badge-available flex items-center gap-1 text-xs font-semibold">
            <TrendingUp size={12} /> {trend}
          </span>
        )}
      </div>
      <div className="gl-display text-display-md font-bold leading-none mb-3 gradient-text" 
           style={{ fontSize: 32 }}>
        {value}
      </div>
      <div className="section-label mb-2">{label}</div>
      {sub && (
        <div className="text-body-sm text-gray-500 leading-relaxed">
          {sub}
        </div>
      )}
    </div>
  );
}

/* ── GearButton ───────────────────────────────────────────────────────────── */
export function GearButton({
  children, variant = "primary", icon: Icon, onClick, style, size = "md",
}: {
  children: React.ReactNode;
  variant?: "primary" | "dark" | "outline" | "ghost" | "teal" | "gradient" | "premium";
  icon?: React.ElementType;
  onClick?: () => void;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: 12, borderRadius: 12 },
    md: { padding: "12px 24px", fontSize: 14, borderRadius: 16 },
    lg: { padding: "16px 32px", fontSize: 16, borderRadius: 18 },
  };

  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    fontWeight: 700, cursor: "pointer",
    border: "none", 
    transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    position: "relative", overflow: "hidden",
    ...sizes[size],
    ...style,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg, #FF8C60 0%, #FF6B35 55%, #E85520 100%)",
      color: "#fff",
      boxShadow: "var(--s-p), inset 0 1px 0 rgba(255,255,255,0.25)",
    },
    teal: {
      background: "linear-gradient(135deg, #00D4FF 0%, #00A8CC 100%)",
      color: "#0B0F1E",
      boxShadow: "var(--s-a), inset 0 1px 0 rgba(255,255,255,0.25)",
    },
    dark: {
      background: "linear-gradient(145deg, #1E2744 0%, #0B0F1E 100%)",
      color: "#fff",
      boxShadow: "0 6px 24px rgba(13,17,23,0.45)",
      border: "1px solid rgba(255,255,255,0.12)",
    },
    outline: {
      background: "#FFFFFF",
      color: "var(--c-ink)",
      border: "2px solid var(--c-border)",
      boxShadow: "var(--s-xs)",
    },
    ghost: {
      background: "transparent",
      color: "#8892AA",
      border: "none",
    },
    gradient: {
      background: "linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(0,212,255,0.1) 50%, rgba(124,111,247,0.1) 100%)",
      backdropFilter: "blur(20px) saturate(180%)",
      color: "var(--c-ink)",
      border: "1px solid rgba(255,255,255,0.6)",
      boxShadow: "var(--s-sm)",
    },
    premium: {
      background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(244,245,255,0.98) 100%)",
      backdropFilter: "blur(20px) saturate(180%)",
      color: "var(--c-ink)",
      border: "1px solid rgba(255,255,255,0.8)",
      boxShadow: "var(--s-md), inset 0 1px 0 rgba(255,255,255,0.8)",
    },
  };

  return (
    <button
      className="gl-body hover:scale-[1.03] active:scale-[0.97] focus-ring"
      onClick={onClick}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={(e) => {
        if (variant === "primary" || variant === "teal") {
          e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
          e.currentTarget.style.boxShadow = variant === "primary" 
            ? "0 16px 48px rgba(255,107,53,0.6), inset 0 1px 0 rgba(255,255,255,0.4)"
            : "0 16px 48px rgba(0,212,255,0.5), inset 0 1px 0 rgba(255,255,255,0.4)";
        } else if (variant === "outline") {
          e.currentTarget.style.borderColor = "var(--c-p)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,53,0.15)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = variants[variant].boxShadow as string || "";
        if (variant === "outline") {
          e.currentTarget.style.borderColor = "var(--c-border)";
        }
      }}
    >
      {Icon && <Icon size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />}
      {children}
    </button>
  );
}

/* ── Stepper ──────────────────────────────────────────────────────────────── */
export function Stepper({ current }: { current: number }) {
  return (
    <div className="flex overflow-x-auto no-scrollbar py-2">
      {LIFECYCLE.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center" style={{ width: 80 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800,
                background: done ? "var(--c-p)" : active
                  ? "linear-gradient(135deg, #FF8C60, #FF6B35)"
                  : "#F0F1F5",
                color: done || active ? "#fff" : "#8892AA",
                border: `2px solid ${done ? "var(--c-p-dark)" : active ? "var(--c-p)" : "var(--c-border)"}`,
                boxShadow: active ? "var(--s-p)" : "none",
              }}>
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span className="gl-body mt-1.5 text-center leading-tight" style={{
                fontSize: 10, maxWidth: 70,
                color: active ? "var(--c-ink)" : done ? "var(--c-p)" : "#8892AA",
                fontWeight: active ? 700 : 500,
              }}>{step}</span>
            </div>
            {i < LIFECYCLE.length - 1 && (
              <div style={{
                width: 18, height: 2, marginBottom: 18,
                background: done ? "var(--c-p)" : "var(--c-border)",
                borderRadius: 2,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── PageHeader ───────────────────────────────────────────────────────────── */
export function PageHeader({
  eyebrow, title, subtitle, action, animated = true,
}: {
  eyebrow?: string; title: string; subtitle?: string; action?: React.ReactNode; animated?: boolean;
}) {
  return (
    <div className={`flex justify-between items-start mb-10 flex-wrap gap-6 ${animated ? 'animate-fade-up' : ''}`}>
      <div className="max-w-4xl">
        {eyebrow && (
          <div className="professional-badge inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs uppercase tracking-wider mb-4 interactive-scale"
            style={{ 
              background: "rgba(255,107,53,0.1)", 
              color: "var(--c-p)", 
              border: "1px solid rgba(255,107,53,0.2)",
            }}>
            <ShieldCheck size={14} /> 
            {eyebrow}
          </div>
        )}
        <h1 className="gl-display text-display-lg font-bold leading-tight tracking-tight text-balance gradient-text-warm mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-body-lg text-gray-600 max-w-3xl leading-relaxed text-balance"> 
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0 animate-slide-left">{action}</div>}
    </div>
  );
}
