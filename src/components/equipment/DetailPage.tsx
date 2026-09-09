"use client";

import React, { useState } from "react";
import {
  ArrowLeft, MapPin, Star, ShieldCheck, Clock, User,
  ChevronRight, Minus, Plus, CheckCircle2, Info,
} from "lucide-react";
import { COLORS, catByName, money } from "@/lib/equipment-data";
import { CategoryChip, GearButton } from "@/components/ui/gear-primitives";
import type { EquipmentItem } from "@/lib/types";

interface DetailPageProps {
  item: EquipmentItem;
  setPage: (p: string) => void;
}

const MOCK_REVIEWS = [
  { name: "Aine Patrick",       role: "Renter", rating: 5, comment: "Machine arrived on time and worked well for two days of ploughing. Highly recommend." },
  { name: "Turyahikayo Grace",  role: "Renter", rating: 4, comment: "Good condition. Communication with the owner could be a bit faster but overall great service." },
  { name: "Mugisha Bernard",    role: "Renter", rating: 5, comment: "Excellent equipment — came with a skilled operator who was very professional on site." },
];

export function DetailPage({ item, setPage }: DetailPageProps) {
  const [days, setDays] = useState(3);
  if (!item) return null;

  const c = catByName(item.cat);
  const rentalFee = item.price * days;
  const serviceFee = 25000;
  const total = rentalFee + serviceFee;

  return (
    <div className="animate-fade-up max-w-6xl mx-auto">
      {/* Back */}
      <button
        onClick={() => setPage("marketplace")}
        className="gl-body inline-flex items-center gap-2 text-sm font-semibold text-[#6B6A62] hover:text-[#1B1B18] mb-6 transition-colors group"
      >
        <span className="w-7 h-7 rounded-lg border border-[#E2DCD0] bg-white flex items-center justify-center group-hover:border-[#1A3029] transition-colors shadow-sm">
          <ArrowLeft size={14} />
        </span>
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* ── Left column ────────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Hero image */}
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              height: 260,
              background: item.img3d
                ? `radial-gradient(ellipse at 50% 55%, ${c.color}55 0%, #0F1C18 85%)`
                : `linear-gradient(145deg, ${c.color}40 0%, #1A3029 100%)`,
            }}
          >
            {item.img3d ? (
              <img
                src={item.img3d}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-3xl bg-white/15 border border-white/30 flex items-center justify-center shadow-2xl">
                  <c.icon size={56} color="rgba(255,255,255,0.85)" />
                </div>
              </div>
            )}
            {/* Availability overlay */}
            <span
              className={`absolute top-4 right-4 gl-body text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg ${
                item.status === "Available"
                  ? "bg-emerald-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              <span className={`w-2 h-2 rounded-full bg-white ${item.status === "Available" ? "animate-pulse" : ""}`} />
              {item.status}
            </span>
          </div>

          {/* Title block */}
          <div>
            <CategoryChip name={item.cat} size="md" />
            <h1 className="gl-display text-3xl sm:text-4xl font-extrabold text-[#1B1B18] mt-3 mb-2 leading-tight">
              {item.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B6A62]">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#C6821F]" />
                <strong className="text-[#1B1B18]">{item.loc}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-[#6B6A62]" />
                {item.owner}
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={14} fill="#F5B038" color="#F5B038" />
                <strong className="text-[#1B1B18]">{item.rating}</strong>
                <span className="text-[#9B9A93]">({item.reviews} reviews)</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-[#E2DCD0] p-6 shadow-sm">
            <h2 className="gl-display font-bold text-lg text-[#1B1B18] mb-3">About this equipment</h2>
            <p className="gl-body text-sm text-[#4A4A44] leading-relaxed">
              Well-maintained {item.name.toLowerCase()}, serviced and inspected before every rental.
              Comes with a certified operator on request for heavy machinery. All fuel costs are billed
              separately unless explicitly stated in the booking agreement. Delivery available within
              the Rwenzori region for an additional logistics fee.
            </p>
          </div>

          {/* Specs grid */}
          <div className="bg-white rounded-2xl border border-[#E2DCD0] p-6 shadow-sm">
            <h2 className="gl-display font-bold text-lg text-[#1B1B18] mb-4">Equipment Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Condition",     value: "Excellent" },
                { label: "Category",      value: item.cat },
                { label: "Owner",         value: item.owner.split(" ").slice(0,2).join(" ") },
                { label: "Availability",  value: item.status },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-[#F7F4EF] rounded-xl p-3.5 border border-[#EAE5DB]"
                >
                  <div className="text-[10.5px] font-bold text-[#9B9A93] uppercase tracking-wide mb-1">
                    {label}
                  </div>
                  <div className="gl-body text-[13px] font-semibold text-[#1B1B18] leading-tight">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, title: "Escrow Protected",    desc: "Funds held until delivery confirmed" },
              { icon: Clock,       title: "24h Response",        desc: "Owner responds within one day" },
              { icon: CheckCircle2,title: "GearLink Verified",   desc: "Equipment inspected & certified" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 bg-white rounded-xl border border-[#E2DCD0] p-4 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#1A3029]/8 flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-[#1A3029]" />
                </div>
                <div>
                  <div className="gl-body text-xs font-bold text-[#1B1B18]">{title}</div>
                  <div className="text-[11px] text-[#9B9A93] mt-0.5 leading-snug">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl border border-[#E2DCD0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="gl-display font-bold text-lg text-[#1B1B18]">
                Reviews
              </h2>
              <div className="flex items-center gap-1.5">
                <Star size={16} fill="#F5B038" color="#F5B038" />
                <span className="gl-body font-bold text-[#1B1B18]">{item.rating}</span>
                <span className="text-sm text-[#9B9A93]">· {item.reviews} reviews</span>
              </div>
            </div>
            <div className="space-y-5">
              {MOCK_REVIEWS.map((rv) => (
                <div key={rv.name} className="pb-5 border-b border-[#F0EDE4] last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#E2DCD0] flex items-center justify-center text-xs font-extrabold text-[#4A4A44]">
                        {rv.name.charAt(0)}
                      </div>
                      <div>
                        <div className="gl-body text-sm font-bold text-[#1B1B18]">{rv.name}</div>
                        <div className="text-[11px] text-[#9B9A93]">{rv.role}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} fill={i < rv.rating ? "#F5B038" : "none"} color={i < rv.rating ? "#F5B038" : "#D5CEC3"} />
                      ))}
                    </div>
                  </div>
                  <p className="gl-body text-sm text-[#626159] leading-relaxed">{rv.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column: Booking card ──────────────────────────────── */}
        <div>
          <div className="sticky top-24 bg-white rounded-2xl border border-[#E2DCD0] shadow-lg overflow-hidden">
            {/* Price header */}
            <div className="bg-[#1A3029] px-6 py-5">
              <div className="gl-display text-3xl font-extrabold text-white">
                {money(item.price)}
              </div>
              <div className="gl-body text-sm text-white/60 mt-0.5">per day · escrow protected</div>
            </div>

            <div className="p-6 space-y-5">
              {/* Duration selector */}
              <div>
                <label className="gl-body text-xs font-bold text-[#6B6A62] uppercase tracking-wide block mb-2">
                  Rental Duration
                </label>
                <div className="flex items-center gap-4 bg-[#F7F4EF] rounded-xl px-4 py-3 border border-[#EAE5DB]">
                  <button
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-[#E2DCD0] flex items-center justify-center hover:border-[#1A3029] transition-colors shadow-sm"
                  >
                    <Minus size={14} className="text-[#1B1B18]" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="gl-display font-extrabold text-xl text-[#1B1B18]">{days}</span>
                    <span className="gl-body text-sm text-[#6B6A62] ml-1.5">{days === 1 ? "day" : "days"}</span>
                  </div>
                  <button
                    onClick={() => setDays(days + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-[#E2DCD0] flex items-center justify-center hover:border-[#1A3029] transition-colors shadow-sm"
                  >
                    <Plus size={14} className="text-[#1B1B18]" />
                  </button>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-[#6B6A62]">
                  <span className="gl-body">{money(item.price)} × {days} {days === 1 ? "day" : "days"}</span>
                  <span className="font-semibold text-[#1B1B18]">{money(rentalFee)}</span>
                </div>
                <div className="flex justify-between text-[#6B6A62]">
                  <span className="gl-body">Service & insurance fee</span>
                  <span className="font-semibold text-[#1B1B18]">{money(serviceFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#1B1B18] pt-3 border-t border-[#F0EDE4] text-base">
                  <span className="gl-body">Total</span>
                  <span className="gl-display text-lg">{money(total)}</span>
                </div>
              </div>

              {/* Escrow note */}
              <div className="flex items-start gap-2.5 bg-[#F0FDF8] border border-emerald-200 rounded-xl p-3.5">
                <ShieldCheck size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="gl-body text-xs text-emerald-800 leading-relaxed">
                  Full amount is held in <strong>GearLink Escrow</strong> and released to the owner only after successful delivery confirmation.
                </p>
              </div>

              {/* CTA */}
              <GearButton
                variant="primary"
                style={{ width: "100%", justifyContent: "center", padding: "14px 20px", fontSize: 15, borderRadius: 14 }}
                onClick={() => setPage("booking")}
              >
                Request Booking <ChevronRight size={16} />
              </GearButton>

              {/* Contact owner */}
              <button className="w-full py-3 rounded-2xl border border-[#E2DCD0] bg-white text-sm font-semibold text-[#1B1B18] hover:border-[#1A3029] hover:shadow-sm transition-all gl-body flex items-center justify-center gap-2">
                <Info size={14} className="text-[#6B6A62]" /> Contact Owner First
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
