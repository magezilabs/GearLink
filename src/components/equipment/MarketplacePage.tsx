"use client";

import React, { useState } from "react";
import { Search, MapPin, Star, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, catByName, money } from "@/lib/equipment-data";
import { CategoryChip, PageHeader } from "@/components/ui/gear-primitives";
import type { EquipmentItem } from "@/lib/types";

interface Props {
  setPage: (p:string) => void;
  setActiveEquipment: (e:EquipmentItem) => void;
  activeCat: string|null;
  setActiveCat: (c:string|null) => void;
  equipmentList: EquipmentItem[];
}

export function MarketplacePage({ setPage, setActiveEquipment, activeCat, setActiveCat, equipmentList }: Props) {
  const [q, setQ] = useState("");

  const filtered = equipmentList.filter(e => {
    const matchCat = activeCat ? e.cat === activeCat : true;
    const s = q.toLowerCase();
    return matchCat && (!s || e.name.toLowerCase().includes(s) || e.loc.toLowerCase().includes(s) || e.owner.toLowerCase().includes(s));
  });

  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="GearLink Verified Marketplace"
        title="Find & Rent Equipment"
        subtitle="Escrow-protected machinery sharing across the Rwenzori region — GPS-tracked, agent-verified."
      />

      {/* Search + filter */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <div className="flex-1 min-w-[300px] flex items-center gap-4 px-6 py-4 premium-card"
          style={{ minHeight: 56 }}>
          <Search size={18} style={{ color:"#9CA3AF", flexShrink:0 }} />
          <input type="text" placeholder="Search equipment, location, owner…" value={q}
            onChange={e=>setQ(e.target.value)}
            className="text-body-md w-full bg-transparent border-none focus:outline-none font-medium placeholder:text-gray-400"
            style={{ color:"#111827" }} />
          {q && (
            <button onClick={()=>setQ("")}
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all interactive-scale"
              style={{ background:"#F3F4F6", color:"#6B7280" }}>
              <X size={14}/>
            </button>
          )}
        </div>
        <button className="flex items-center gap-2 px-6 py-4 premium-card text-body-md font-semibold transition-all"
          style={{ color: "#374151" }}>
          <SlidersHorizontal size={16} style={{ color:"#9CA3AF" }} />
          Filters & Sort
        </button>
      </div>

      {/* Category strip */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-8">
        <button onClick={()=>setActiveCat(null)}
          className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all interactive-scale"
          style={{
            background: !activeCat ? "linear-gradient(135deg,#FF6B35,#E85520)" : "#FFFFFF",
            color: !activeCat ? "#FFFFFF" : "#374151",
            border: `2px solid ${!activeCat ? "#FF6B35" : "#E5E7EB"}`,
            boxShadow: !activeCat ? "0 4px 16px rgba(255,107,53,0.25)" : "0 2px 8px rgba(13,17,23,0.04)",
          }}>
          All Sectors
          <span className="px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ 
              background: !activeCat ? "rgba(255,255,255,0.25)" : "#F3F4F6", 
              color: !activeCat ? "#FFFFFF" : "#6B7280" 
            }}>
            {equipmentList.length}
          </span>
        </button>
        {CATEGORIES.map(c => {
          const count = equipmentList.filter(e=>e.cat===c.name).length;
          const active = activeCat === c.name;
          return (
            <button key={c.name} onClick={()=>setActiveCat(c.name)}
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all interactive-scale"
              style={{
                background: active ? c.color : "#FFFFFF",
                color: active ? "#FFFFFF" : "#374151",
                border: `2px solid ${active ? c.color : "#E5E7EB"}`,
                boxShadow: active ? `0 4px 16px ${c.color}30` : "0 2px 8px rgba(13,17,23,0.04)",
              }}>
              <c.icon size={14} />
              {c.name}
              <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                style={{ 
                  background: active ? "rgba(255,255,255,0.25)" : "#F3F4F6", 
                  color: active ? "#FFFFFF" : "#6B7280" 
                }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Count */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <p className="text-body-md font-medium text-gray-600">
            Showing <span className="font-bold gradient-text">{filtered.length}</span> of {equipmentList.length} listings
            {activeCat && <span> in <strong className="gradient-text">{activeCat}</strong></span>}
          </p>
          {filtered.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="text-body-sm font-semibold text-emerald-600">Live Results</span>
            </div>
          )}
        </div>
        {(activeCat||q) && (
          <button onClick={()=>{setActiveCat(null);setQ("");}}
            className="text-body-sm font-semibold flex items-center gap-1 transition-colors text-orange-600 hover:text-orange-700">
            <X size={16}/> Clear Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-32 text-center animate-bounce-in">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center executive-card">
            <Search size={36} style={{ color:"#9CA3AF" }}/>
          </div>
          <h3 className="gl-heading text-heading-lg font-bold mb-3 gradient-text">No equipment found</h3>
          <p className="text-body-lg text-gray-500 mb-6 text-balance max-w-md mx-auto">
            We couldn't find any equipment matching your criteria. Try adjusting your search or filters.
          </p>
          {(activeCat||q) && (
            <button onClick={()=>{setActiveCat(null);setQ("");}}
              className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold">
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger">
          {filtered.map(item => {
            const c = catByName(item.cat);
            const avail = item.status === "Available";
            return (
              <div key={item.id} onClick={()=>{setActiveEquipment(item);setPage("detail");}}
                className="card-3d cursor-pointer group animate-fade-up">

                {/* Image podium */}
                <div className="relative overflow-hidden rounded-t-[20px]" style={{
                  height: 200,
                  background: item.img3d
                    ? `radial-gradient(ellipse at 50% 60%, ${c.color}30 0%, #1F2937 90%)`
                    : `linear-gradient(145deg, ${c.color}25 0%, #374151 100%)`,
                }}>
                  {item.img3d ? (
                    <>
                      <img src={item.img3d} alt={item.name}
                        className="absolute inset-0 w-full h-full object-contain px-6 py-5 group-hover:scale-105 transition-all duration-500 ease-out"
                        style={{ zIndex:2, filter:"drop-shadow(0 12px 24px rgba(0,0,0,0.4))" }}/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" style={{ zIndex:1 }}/>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex:2 }}>
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center border group-hover:scale-105 group-hover:rotate-2 transition-all duration-400"
                        style={{ 
                          background:"rgba(255,255,255,0.15)", 
                          borderColor:"rgba(255,255,255,0.3)", 
                          backdropFilter:"blur(12px) saturate(140%)" 
                        }}>
                        <c.icon size={36} color="rgba(255,255,255,0.9)"/>
                      </div>
                    </div>
                  )}
                  {/* Status */}
                  <span className={`absolute top-4 right-4 professional-badge text-xs font-semibold ${avail ? 'badge-available' : 'badge-booked'}`}
                    style={{ zIndex:3, backdropFilter:"blur(16px) saturate(180%)" }}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-current ${avail?"animate-pulse":""}`}/>
                    {item.status}
                  </span>
                  {/* Rating */}
                  <span className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-full backdrop-blur-medium"
                    style={{ 
                      zIndex:3, 
                      background:"rgba(255,255,255,0.95)", 
                      color:"#111827", 
                      boxShadow:"0 2px 8px rgba(0,0,0,0.15)",
                    }}>
                    <Star size={14} fill="#FF6B35" color="#FF6B35"/>
                    {item.rating}
                    <span className="text-gray-500 font-medium">({item.reviews})</span>
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="mb-4">
                    <CategoryChip name={item.cat} size="sm"/>
                  </div>
                  <h3 className="gl-heading text-heading-md font-bold mb-3 line-clamp-2 leading-tight transition-colors duration-200 text-balance text-gray-900 group-hover:text-orange-600">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 text-body-sm mb-6 text-gray-500">
                    <MapPin size={14} style={{ color:"var(--c-p)", flexShrink:0 }}/>
                    <strong className="text-gray-900">{item.loc}</strong>
                    <span className="text-gray-300">·</span>
                    <span className="truncate">{item.owner}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4"
                    style={{ borderTop:"2px solid #F3F4F6" }}>
                    <div>
                      <span className="gl-display text-heading-lg font-bold gradient-text">
                        {money(item.price)}
                      </span>
                      <span className="text-body-sm font-medium ml-1 text-gray-500">/day</span>
                    </div>
                    <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold"
                      onClick={e=>{e.stopPropagation();setActiveEquipment(item);setPage("booking");}}>
                      Book Now
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
