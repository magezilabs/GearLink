"use client";

import React, { useState } from "react";
import {
  HardHat,
  Sprout,
  Users,
  Landmark,
  Search,
  CreditCard,
  LayoutGrid,
  TrendingUp,
  Lock,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronRight,
  ShieldCheck,
  Banknote,
  Activity,
} from "lucide-react";

import { GearLinkLogo } from "@/components/ui/gearlink-logo";
import { AuthView } from "@/components/auth/auth-view";
import { MarketplacePage } from "@/components/equipment/MarketplacePage";
import { DetailPage } from "@/components/equipment/DetailPage";
import { BookingPage } from "@/components/booking/BookingPage";
import { OwnerDashboard } from "@/components/dashboard/OwnerDashboard";
import { RenterDashboard } from "@/components/dashboard/RenterDashboard";
import { AgentDashboard } from "@/components/dashboard/AgentDashboard";
import { GovernanceDashboard } from "@/components/dashboard/GovernanceDashboard";
import { GearButton } from "@/components/ui/gear-primitives";

import { INITIAL_EQUIPMENT } from "@/lib/equipment-data";
import { canAccessPage, getRoleDashboardPage, getRoleLabel } from "@/lib/permissions";
import type { EquipmentItem, BookingRequest } from "@/lib/types";

const ROLE_LABELS: Record<string, string> = {
  owner: "Equipment Owner",
  renter: "Equipment Renter",
  agent: "Youth Agent",
  gov: "Governance Officer",
};

const ROLE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  owner:  { bg: "bg-amber-500/15",   text: "text-amber-400",   dot: "bg-amber-400" },
  renter: { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" },
  agent:  { bg: "bg-sky-500/15",     text: "text-sky-400",     dot: "bg-sky-400" },
  gov:    { bg: "bg-violet-500/15",  text: "text-violet-400",  dot: "bg-violet-400" },
};

const PLATFORM_STATS = [
  { label: "Escrow Volume",   value: "UGX 48.5M", icon: Banknote,   color: "text-amber-400" },
  { label: "Active Fleet",    value: "182 Items",  icon: Activity,   color: "text-white" },
  { label: "Utilization",     value: "86.4%",      icon: TrendingUp, color: "text-emerald-400" },
  { label: "Default Rate",    value: "0.00%",      icon: ShieldCheck, color: "text-amber-400" },
];

export default function GearLinkUI() {
  const [viewMode, setViewMode]           = useState<"auth" | "workspace">("auth");
  const [authInitialState, setAuthInitialState] = useState<"splash" | "login" | "register" | "forgot">("splash");
  const [user, setUser]                   = useState<{ name: string; role: string; phone: string; location: string } | null>(null);
  const [page, setPage]                   = useState("marketplace");
  const [role, setRole]                   = useState("owner");
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [activeEquipment, setActiveEquipment] = useState<EquipmentItem>(INITIAL_EQUIPMENT[0]);
  const [activeCat, setActiveCat]         = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);

  const handleLoginSuccess = (userData: { name: string; role: string; phone: string; location: string }) => {
    setUser(userData);
    setRole(userData.role);
    setViewMode("workspace");
    setPage("marketplace");
  };

  const handleAddEquipment = (newItem: EquipmentItem) => {
    setEquipmentList((prev) => [newItem, ...prev]);
  };

  const handleBookingSubmit = (req: BookingRequest) => {
    setBookingRequests((prev) => [req, ...prev]);
    // Switch to owner dashboard on the requests tab so owner sees it
    setRole("owner");
    setPage("owner");
  };

  const roleNav: Record<string, { key: string; label: string; icon: React.ElementType; page: string }[]> = {
    owner:  [{ key: "owner-dash",  label: "Owner Dashboard",  icon: HardHat,  page: "owner"  }],
    renter: [{ key: "renter-dash", label: "My Bookings",      icon: Sprout,   page: "renter" }],
    agent:  [{ key: "agent-dash",  label: "Agent Dashboard",  icon: Users,    page: "agent"  }],
    gov:    [{ key: "gov-dash",    label: "Audit & Oversight",icon: Landmark, page: "gov"    }],
  };

  const commonNav = [
    { key: "marketplace", label: "Marketplace",      icon: LayoutGrid, page: "marketplace" },
    { key: "detail",      label: "Equipment Detail", icon: Search,     page: "detail"      },
    { key: "booking",     label: "Book & Pay",       icon: CreditCard, page: "booking"     },
  ];

  if (viewMode === "auth") {
    return <AuthView initialState={authInitialState} onLoginSuccess={handleLoginSuccess} />;
  }

  const rc = ROLE_COLORS[role] ?? ROLE_COLORS.owner;
  const userInitials = user ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "SJ";

  return (
    <div className="gl-body min-h-screen flex bg-[#F0EDE4] text-[#1B1B18]">

      {/* ── Mobile top bar ────────────────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-[#1A3029] text-[#F1EDE3] flex items-center justify-between px-4 z-40 shadow-lg border-b border-white/10">
        <GearLinkLogo size="sm" showText={true} />
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-white/70 hover:text-white">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-white">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Sidebar backdrop (mobile) ─────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-72 bg-[#1A3029] text-[#F1EDE3] flex flex-col transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } h-screen`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/8 flex items-center justify-between">
          <GearLinkLogo size="md" showText={true} animated={true} />
          <button
            className="lg:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* User Profile Card */}
        <div className="mx-4 mt-4 mb-2 p-4 rounded-2xl bg-white/8 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-[#241804] font-extrabold text-base flex items-center justify-center shadow-lg flex-shrink-0">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white truncate">
                {user?.name ?? "Sekajigo James"}
              </div>
              <div className="text-[11px] text-white/50 truncate mt-0.5">
                {user?.location ?? "Fort Portal, Kabarole"}
              </div>
            </div>
            <button
              onClick={() => { setAuthInitialState("splash"); setViewMode("auth"); }}
              title="Sign Out"
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <LogOut size={15} />
            </button>
          </div>

          {/* Role Badge */}
          <div className={`mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg ${rc.bg}`}>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${rc.dot}`} />
            <span className={`text-[11px] font-bold ${rc.text}`}>
              {ROLE_LABELS[role] ?? getRoleLabel(role)}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">

          {/* Explore section */}
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-white/30 px-2 mb-2">
              Explore
            </div>
            <div className="space-y-0.5">
              {commonNav.map((n) => {
                const active = page === n.page;
                return (
                  <button
                    key={n.key}
                    onClick={() => { setPage(n.page); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      active
                        ? "bg-amber-500/20 text-amber-300 shadow-sm"
                        : "text-white/65 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    <n.icon size={16} className={active ? "text-amber-400" : ""} />
                    <span className="flex-1 text-left">{n.label}</span>
                    {active && <ChevronRight size={14} className="text-amber-400/60" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workspace section */}
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-white/30 px-2 mb-2">
              My Workspace
            </div>
            <div className="space-y-0.5">
              {(roleNav[role] ?? []).map((n) => {
                const active = page === n.page;
                return (
                  <button
                    key={n.key}
                    onClick={() => { setPage(n.page); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      active
                        ? "bg-amber-500/20 text-amber-300 shadow-sm"
                        : "text-white/65 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    <n.icon size={16} className={active ? "text-amber-400" : ""} />
                    <span className="flex-1 text-left">{n.label}</span>
                    {active && <ChevronRight size={14} className="text-amber-400/60" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Auth quick access (dev helper) */}
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-white/20 px-2 mb-2">
              Auth Screens
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {([["splash","Splash"],["login","Login"],["register","Register"],["forgot","OTP Reset"]] as const).map(([state, label]) => (
                <button
                  key={state}
                  onClick={() => { setAuthInitialState(state); setViewMode("auth"); }}
                  className="py-1.5 px-2 rounded-lg bg-white/6 hover:bg-white/12 text-white/50 hover:text-white/80 text-[11px] font-medium text-left transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Platform status footer */}
        <div className="px-4 pb-4 pt-3 border-t border-white/8">
          <div className="flex items-center justify-between text-[11px] text-white/40">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Escrow Network Online</span>
            </div>
            <span className="font-mono">v1.0 MVP</span>
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden min-h-screen">

        {/* Top header bar (desktop) */}
        <header className="hidden lg:flex sticky top-0 z-30 items-center justify-between px-8 py-4 bg-[#F0EDE4]/90 backdrop-blur-md border-b border-[#DAD4C4]/60">
          {/* Page title breadcrumb */}
          <div>
            <div className="text-[11px] font-bold text-[#6B6A62] uppercase tracking-wider">
              GearLink Platform
            </div>
            <h1 className="gl-display text-xl font-extrabold text-[#1B1B18] leading-tight">
              {page === "marketplace" && "Equipment Marketplace"}
              {page === "detail"      && "Equipment Detail"}
              {page === "booking"     && "Booking & Escrow"}
              {page === "owner"       && "Owner Dashboard"}
              {page === "renter"      && "Renter Dashboard"}
              {page === "agent"       && "Agent Dashboard"}
              {page === "gov"         && "Governance & Audit"}
            </h1>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative w-10 h-10 rounded-xl border border-[#DAD4C4] bg-white flex items-center justify-center text-[#6B6A62] hover:text-[#1B1B18] hover:border-[#B97F22] transition-all shadow-sm">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 border-2 border-[#F0EDE4]" />
            </button>
            {/* User pill */}
            <div className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-xl bg-[#1A3029] text-white shadow-md">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-[#241804] font-extrabold text-xs flex items-center justify-center">
                {userInitials}
              </div>
              <div className="leading-tight">
                <div className="text-xs font-bold truncate max-w-[120px]">
                  {user?.name ?? "Sekajigo James"}
                </div>
                <div className={`text-[10px] font-semibold ${rc.text}`}>
                  {ROLE_LABELS[role] ?? getRoleLabel(role)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Platform KPI strip */}
        <div className="hidden lg:flex items-center gap-px bg-[#1A3029] px-8 overflow-x-auto">
          {PLATFORM_STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-6 py-3 border-r border-white/10 last:border-r-0 flex-shrink-0">
              <s.icon size={15} className={s.color} />
              <div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                  {s.label}
                </div>
                <div className={`gl-display font-extrabold text-sm ${s.color}`}>
                  {s.value}
                </div>
              </div>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5 px-6 text-[11px] text-white/40 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Smart Escrow Active
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 sm:p-8 max-lg:pt-20">
          {!canAccessPage(role, page) ? (
            <div className="bg-white rounded-2xl p-10 text-center max-w-md mx-auto mt-12 shadow-xl border border-[#DAD4C4]">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5">
                <Lock size={28} className="text-amber-600" />
              </div>
              <h2 className="gl-display font-bold text-2xl text-[#1B1B18] mb-3">
                Access Restricted
              </h2>
              <p className="gl-body text-sm text-[#6B6A62] mb-7 leading-relaxed">
                Your account is registered as{" "}
                <strong className="text-[#1B1B18]">{getRoleLabel(role)}</strong>. You are only
                authorized to access your designated workspace dashboard.
              </p>
              <GearButton
                variant="primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setPage(getRoleDashboardPage(role))}
              >
                Go to {getRoleLabel(role)} Dashboard
              </GearButton>
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
              {page === "detail"  && <DetailPage item={activeEquipment} setPage={setPage} />}
              {page === "booking" && <BookingPage item={activeEquipment} setPage={setPage} userRole={role} />}
              {page === "owner"   && <OwnerDashboard equipmentList={equipmentList} onAddEquipment={handleAddEquipment} />}
              {page === "renter"  && <RenterDashboard />}
              {page === "agent"   && <AgentDashboard />}
              {page === "gov"     && <GovernanceDashboard />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
