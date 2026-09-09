"use client";

import React, { useState } from "react";
import { Search, MapPin, Star, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { COLORS, CATEGORIES, catByName, money } from "@/lib/equipment-data";
import { CategoryChip, PageHeader } from "@/components/ui/gear-primitives";
import type { EquipmentItem } from "@/lib/types";

interface MarketplacePageProps {
  setPage: (p: string) => void;
  setActiveEquipment: (e: EquipmentItem) => void;
  activeCat: string | null;
  setActiveCat: (c: string | null) => void;
  equipmentList: EquipmentItem[];
}

export function MarketplacePage({
  setPage,
  setActiveEquipment,
  activeCat,
  setActiveCat,
  equipmentList,
}: MarketplacePageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = equipmentList.filter((e) => {
    const matchesCat = activeCat ? e.cat === activeCat : true;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q ||
      e.name.toLowerCase().includes(q) ||
      e.loc.toLowerCase().includes(q) ||
      e.owner.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="GearLink Verified Marketplace"
        title="Find & Rent Equipment"
        subtitle="Escrow-protected machinery sharing for agriculture, construction, boreholes & transport across the Rwenzori region."
      />

      {/* ── Search + Filter row ─────────────────────────────────────── */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {/* Search input */}
        <div className="flex-1 min-w-[260px] flex items-center gap-3 bg-white border border-[#E2DCD0] rounded-2xl px-4 py-3 shadow-sm focus-within:border-[#1A3029] focus-within:shadow-[0_0_0_3px_rgba(26,48,41,0.08)] transition-all">
          <Search size={17} className="text-[#9B9A93] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search equipment, location, owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="gl-body w-full text-sm bg-transparent border-none focus:outline-none text-[#1B1B18] placeholder-[#B5B2AB] font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E2DCD0] text-[#6B6A62] flex items-center justify-center hover:bg-[#D0C9BC] transition-colors"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Filter button */}
        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-[#E2DCD0] bg-white text-sm font-semibold text-[#1B1B18] shadow-sm hover:border-[#1A3029] hover:shadow-md transition-all gl-body">
          <SlidersHorizontal size={16} className="text-[#6B6A62]" />
          Filters
        </button>
      </div>

      {/* ── Category strip ──────────────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-7 no-scrollbar">
        {/* All */}
        <button
          onClick={() => setActiveCat(null)}
          className={`gl-body flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
            !activeCat
              ? "bg-[#1A3029] text-white shadow-md"
              : "bg-white text-[#1B1B18] border border-[#E2DCD0] hover:border-[#1A3029]"
          }`}
        >
          All Sectors
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${!activeCat ? "bg-white/20 text-white" : "bg-[#F0EDE4] text-[#6B6A62]"}`}>
            {equipmentList.length}
          </span>
        </button>

        {CATEGORIES.map((c) => {
          const count = equipmentList.filter((e) => e.cat === c.name).length;
          const isActive = activeCat === c.name;
          return (
            <button
              key={c.name}
              onClick={() => setActiveCat(c.name)}
              className="gl-body flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
              style={{
                background: isActive ? c.color : "#FFFFFF",
                color: isActive ? "#fff" : COLORS.ink,
                border: `1px solid ${isActive ? c.color : "#E2DCD0"}`,
                boxShadow: isActive ? `0 4px 14px ${c.color}40` : "none",
              }}
            >
              <c.icon size={12} />
              {c.name}
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full font-extrabold"
                style={{
                  background: isActive ? "rgba(255,255,255,0.25)" : "#F0EDE4",
                  color: isActive ? "#fff" : "#6B6A62",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="gl-body text-sm text-[#6B6A62]">
          Showing <strong className="text-[#1B1B18]">{filtered.length}</strong> of {equipmentList.length} listings
          {activeCat && <span> in <strong className="text-[#1B1B18]">{activeCat}</strong></span>}
        </p>
        {(activeCat || searchTerm) && (
          <button
            onClick={() => { setActiveCat(null); setSearchTerm(""); }}
            className="gl-body text-xs font-semibold text-[#B97F22] hover:text-[#8E5F12] flex items-center gap-1"
          >
            <X size={12} /> Clear filters
          </button>
        )}
      </div>

      {/* ── Equipment grid ───────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#E2DCD0] flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-[#9B9A93]" />
          </div>
          <p className="gl-display text-xl font-bold text-[#1B1B18] mb-1">No equipment found</p>
          <p className="gl-body text-sm text-[#6B6A62]">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger">
          {filtered.map((item) => {
            const c = catByName(item.cat);
            const isAvailable = item.status === "Available";
            return (
              <div
                key={item.id}
                onClick={() => { setActiveEquipment(item); setPage("detail"); }}
                className="card-3d cursor-pointer group overflow-hidden animate-fade-up"
              >
                {/* ── Image area ─────────────────────────────────── */}
                <div
                  className="podium-3d relative"
                  style={{
                    height: 160,
                    background: item.img3d
                      ? `radial-gradient(ellipse at 50% 60%, ${c.color}55 0%, #0F1C18 85%)`
                      : `linear-gradient(145deg, ${c.color}40 0%, #1A3029 100%)`,
                  }}
                >
                  {item.img3d ? (
                    <img
                      src={item.img3d}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-contain px-4 py-3 drop-shadow-[0_16px_24px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform duration-500 ease-out"
                      style={{ zIndex: 1 }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ zIndex: 1 }}
                    >
                      <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-xl">
                        <c.icon size={40} color="rgba(255,255,255,0.85)" />
                      </div>
                    </div>
                  )}

                  {/* Status badge */}
                  <span
                    className="absolute top-3 right-3 z-10 gl-body flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-1 rounded-full"
                    style={{
                      background: isAvailable ? "rgba(16,185,129,0.92)" : "rgba(239,68,68,0.92)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-white ${isAvailable ? "animate-pulse" : ""}`} />
                    {item.status}
                  </span>

                  {/* Rating pill */}
                  <span
                    className="absolute bottom-3 left-3 z-10 gl-body flex items-center gap-1 text-[11.5px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-[#1B1B18]"
                    style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.25)" }}
                  >
                    <Star size={12} fill="#F5B038" color="#F5B038" />
                    {item.rating}
                    <span className="text-[#9B9A93] font-normal">({item.reviews})</span>
                  </span>
                </div>

                {/* ── Card body ──────────────────────────────────── */}
                <div className="p-4">
                  <CategoryChip name={item.cat} size="sm" />

                  <h3 className="gl-body font-extrabold text-[15px] text-[#1B1B18] mt-2.5 mb-1 line-clamp-2 leading-snug group-hover:text-[#B97F22] transition-colors duration-200">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#6B6A62] mb-4">
                    <MapPin size={12} className="text-[#C6821F] flex-shrink-0" />
                    <span className="font-semibold text-[#1B1B18]">{item.loc}</span>
                    <span className="text-[#D5CEC3]">·</span>
                    <span className="truncate">{item.owner}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3.5 border-t border-[#F0EDE4]">
                    <div>
                      <span className="gl-display font-extrabold text-[17px] text-[#1B1B18]">
                        {money(item.price)}
                      </span>
                      <span className="gl-body text-[11px] font-semibold text-[#9B9A93]"> /day</span>
                    </div>
                    <button
                      className="btn-3d-gold flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[12px] font-extrabold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveEquipment(item);
                        setPage("booking");
                      }}
                    >
                      Book <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
