"use client";

import React, { useState } from "react";
import { LayoutGrid, ClipboardList, TrendingUp, Star, Plus, CheckCircle2, X, LogOut } from "lucide-react";
import { COLORS, CATEGORIES, catByName, money } from "@/lib/equipment-data";
import { StatTile, PageHeader, GearButton } from "@/components/ui/gear-primitives";
import type { EquipmentItem } from "@/lib/types";

interface OwnerDashboardProps {
  equipmentList: EquipmentItem[];
  onAddEquipment: (e: EquipmentItem) => void;
  onSignOut?: () => void;
}

export function OwnerDashboard({ equipmentList, onAddEquipment, onSignOut }: OwnerDashboardProps) {
  const [tab, setTab] = useState("listings");
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Form state
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
      reader.onloadend = () => setEqImagePreview(reader.result as string);
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
    // Reset form
    setEqName("");
    setEqLoc("Fort Portal");
    setEqPrice(150000);
    setEqDescription("");
    setEqImagePreview(null);
    setTimeout(() => setSuccessMsg(""), 5000);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Owner dashboard"
        title="Manage your equipment"
        subtitle="Sekajigo Equipment Ltd · Fort Portal"
        action={
          <div className="flex items-center gap-2">
            <GearButton variant="primary" icon={Plus} onClick={() => setShowAddModal(true)}>
              List New Equipment
            </GearButton>
            <button
              onClick={onSignOut}
              title="Sign Out"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E2DCD0] bg-white text-sm font-semibold text-[#6B6A62] hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all shadow-sm gl-body"
            >
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        }
      />

      {successMsg && (
        <div className="mb-6 p-4 bg-[#E9F1E1] border border-[#5C7A32]/40 rounded-xl text-[#3E5E22] flex items-center justify-between text-sm font-semibold shadow-sm">
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

      {/* Tabs */}
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
        <div
          style={{
            background: COLORS.panel,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {equipmentList.map((e, i) => {
            const c = catByName(e.cat);
            return (
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
                      background: c.color + "22",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <c.icon size={16} color={c.color} />
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
            );
          })}
        </div>
      )}

      {tab === "requests" && (
        <div className="p-8 text-center text-[#6B6A62] gl-body text-sm">
          No new booking requests at this time.
        </div>
      )}

      {tab === "earnings" && (
        <div className="p-8 text-center text-[#6B6A62] gl-body text-sm">
          Earnings breakdown coming soon.
        </div>
      )}

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#DAD4C4] rounded-2xl p-6 max-w-lg w-full shadow-2xl my-8">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#DAD4C4]">
              <div>
                <h3 className="gl-display font-bold text-xl text-[#1B1B18]">List New Equipment</h3>
                <p className="gl-body text-xs text-[#6B6A62]">
                  Upload details & photos to share your machinery on GearLink
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#6B6A62] hover:text-[#1B1B18]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              {/* Photo Upload */}
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                  Equipment Image / Photo
                </label>
                <div className="border-2 border-dashed border-[#DAD4C4] rounded-xl p-4 text-center bg-[#F1EDE3]/40 hover:bg-[#F1EDE3]/80 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {eqImagePreview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={eqImagePreview}
                        alt="Equipment preview"
                        className="h-32 object-cover rounded-lg mb-2 shadow-sm"
                      />
                      <span className="text-xs text-[#5C7A32] font-semibold flex items-center gap-1">
                        <CheckCircle2 size={13} /> Photo uploaded. Click to change.
                      </span>
                    </div>
                  ) : (
                    <div className="py-2 flex flex-col items-center gap-1.5 text-[#6B6A62]">
                      <div className="w-10 h-10 rounded-full bg-[#E2A33B]/20 text-[#B97F22] flex items-center justify-center">
                        <Plus size={20} />
                      </div>
                      <span className="text-xs font-semibold text-[#1B1B18]">
                        Click to upload machinery photo
                      </span>
                      <span className="text-[11px] text-[#6B6A62]">
                        Supports PNG, JPG, WEBP (Max 5MB)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Equipment Name */}
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                  Equipment Title / Model Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caterpillar D6 Dozer or John Deere 5075E"
                  value={eqName}
                  onChange={(e) => setEqName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DAD4C4] rounded-lg bg-[#F1EDE3]/30 focus:bg-white focus:outline-none focus:border-[#243B34] text-[#1B1B18]"
                />
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                    Sector Category *
                  </label>
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
                  <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                    Location / District *
                  </label>
                  <select
                    value={eqLoc}
                    onChange={(e) => setEqLoc(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-[#DAD4C4] rounded-lg bg-white focus:outline-none focus:border-[#243B34] text-[#1B1B18]"
                  >
                    {["Fort Portal", "Kabarole", "Kasese", "Kyenjojo", "Bundibugyo", "Kamwenge"].map(
                      (d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Daily Rate */}
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                  Daily Rental Rate (UGX) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-[#6B6A62]">
                    UGX
                  </span>
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

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                  Description & Specifications
                </label>
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
                <GearButton variant="primary" style={{ flex: 2, justifyContent: "center", borderRadius: 12 }}>
                  Publish Listing
                </GearButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
