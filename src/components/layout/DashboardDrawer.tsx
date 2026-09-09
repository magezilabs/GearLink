"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  X,
  MapPin,
  Activity,
  Sparkles,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ChevronRight,
  LayoutGrid,
  ShieldAlert,
  Plus,
  Phone,
} from "lucide-react";
import { getRoleDashboardPage } from "@/lib/permissions";

interface DashboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; role: string; phone: string; location: string } | null;
  role: string;
  setRole: (r: string) => void;
  setPage: (p: string) => void;
}

const ROLE_LABELS: Record<string, string> = {
  owner: "Equipment Owner",
  renter: "Equipment Renter",
  agent: "Youth Logistics Agent",
  gov: "Governance Inspector",
};

export function DashboardDrawer({
  isOpen,
  onClose,
  user,
  role,
  setRole,
  setPage,
}: DashboardDrawerProps) {
  const [tab, setTab] = useState<"activity" | "tools" | "radar">("activity");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#1A3029] text-[#F1EDE3] h-full shadow-2xl flex flex-col z-10 border-l border-white/10 overflow-hidden">

        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#11221D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5B038]/20 border border-[#F5B038]/40 flex items-center justify-center text-[#F5B038]">
              <SlidersHorizontal size={20} />
            </div>
            <div>
              <h2 className="gl-display font-extrabold text-lg text-white">
                Platform Command Drawer
              </h2>
              <p className="gl-body text-xs text-[#E2DCD0]/70">
                Universal Control & Real-time Operations
              </p>
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
              {(user?.name ?? "S").charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-white">
                  {user?.name ?? "Sekajigo James"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] font-extrabold border border-[#10B981]/40">
                  Verified
                </span>
              </div>
              <p className="text-xs text-[#E2DCD0]/70">
                {user?.location ?? "Fort Portal, Kabarole"} · {user?.phone ?? "+256 772 123456"}
              </p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="mt-3">
            <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#E2DCD0]/60 mb-2">
              Switch Active Dashboard
            </div>
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
                  {ROLE_LABELS[r]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#11221D]">
          {(["activity", "tools", "radar"] as const).map((t) => {
            const icons = {
              activity: <Activity size={15} />,
              tools: <Sparkles size={15} />,
              radar: <MapPin size={15} />,
            };
            const labels = { activity: "Activity Feed", tools: "Quick Tools", radar: "Field Radar" };
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                  tab === t
                    ? "border-[#F5B038] text-[#F5B038] bg-white/5"
                    : "border-transparent text-[#E2DCD0]/70 hover:text-white"
                }`}
              >
                {icons[t]} {labels[t]}
              </button>
            );
          })}
        </div>

        {/* Drawer Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {tab === "activity" && (
            <div className="space-y-3">
              {[
                {
                  icon: <CheckCircle2 size={16} />,
                  color: "#10B981",
                  title: "Escrow Payment Locked",
                  body: "UGX 180,000 held in Mobile Money Escrow for John Deere 5075E Tractor.",
                  time: "2 mins ago",
                },
                {
                  icon: <Truck size={16} />,
                  color: "#F5B038",
                  title: "Youth Agent Dispatched",
                  body: "Agent Moses verified Borehole Rig DR-200 readiness in Fort Portal.",
                  time: "18 mins ago",
                },
                {
                  icon: <ShieldCheck size={16} />,
                  color: "#3B82F6",
                  title: "Governance Audit Complete",
                  body: "Grader CAT 120 safety certification validated by Kabarole District Officer.",
                  time: "1 hour ago",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-start gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: item.color + "33", color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <p className="text-[11.5px] text-[#E2DCD0]/70 mt-0.5">{item.body}</p>
                    <span className="text-[10px] text-[#F5B038] font-semibold mt-1 block">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
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
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#E2DCD0]/60 mb-2">
                  Platform Support
                </div>
                <div className="bg-[#11221D] p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-white">
                    <Phone size={14} className="text-[#F5B038]" />
                    <span>24/7 Escrow Hotline</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#F5B038]">
                    +256 800 555 999
                  </span>
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
                  <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold">
                    100% Online
                  </span>
                </div>
                <p className="text-[11.5px] text-[#E2DCD0]/70">
                  Fort Portal • Kabarole • Kasese • Kyenjojo • Bundibugyo
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-[10px] text-[#E2DCD0]/60 font-bold uppercase">
                    District Hubs
                  </div>
                  <div className="text-base font-extrabold text-white mt-1">5 Districts</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-[10px] text-[#E2DCD0]/60 font-bold uppercase">
                    Youth Agents
                  </div>
                  <div className="text-base font-extrabold text-[#F5B038] mt-1">34 Active</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#11221D] flex items-center justify-between text-xs text-[#E2DCD0]/70">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" /> Mobile Money
            Escrow v2.4
          </span>
          <button onClick={onClose} className="text-[#F5B038] font-bold hover:underline">
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
