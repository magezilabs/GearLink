"use client";

import React, { useState } from "react";
import {
  HardHat, Sprout, Users, Landmark, Search, CreditCard,
  LayoutGrid, Lock, Menu, X, LogOut, Bell, ChevronRight,
  ShieldCheck, Banknote, Activity, TrendingUp, Zap,
} from "lucide-react";

import { GearLinkLogo }       from "@/components/ui/gearlink-logo";
import { AuthView }           from "@/components/auth/auth-view";
import { MarketplacePage }    from "@/components/equipment/MarketplacePage";
import { DetailPage }         from "@/components/equipment/DetailPage";
import { BookingPage }        from "@/components/booking/BookingPage";
import { OwnerDashboard }     from "@/components/dashboard/OwnerDashboard";
import { RenterDashboard }    from "@/components/dashboard/RenterDashboard";
import { AgentDashboard }     from "@/components/dashboard/AgentDashboard";
import { GovernanceDashboard } from "@/components/dashboard/GovernanceDashboard";
import { GearButton }         from "@/components/ui/gear-primitives";

import { INITIAL_EQUIPMENT }                         from "@/lib/equipment-data";
import { canAccessPage, getRoleDashboardPage, getRoleLabel } from "@/lib/permissions";
import type { EquipmentItem, BookingRequest }         from "@/lib/types";

/* ── Role config ──────────────────────────────────────────────────────────── */
const ROLE_LABELS: Record<string, string> = {
  owner:  "Equipment Owner",
  renter: "Equipment Renter",
  agent:  "Youth Agent",
  gov:    "Governance Officer",
};

const ROLE_STYLE: Record<string, { pill: string; dot: string; icon: React.ElementType }> = {
  owner:  { pill: "bg-orange-500/15 text-orange-400",  dot: "bg-orange-400",  icon: HardHat  },
  renter: { pill: "bg-emerald-500/15 text-emerald-400",dot: "bg-emerald-400", icon: Sprout   },
  agent:  { pill: "bg-cyan-500/15 text-cyan-400",      dot: "bg-cyan-400",    icon: Users    },
  gov:    { pill: "bg-violet-500/15 text-violet-400",  dot: "bg-violet-400",  icon: Landmark },
};

const KPI = [
  { label: "Escrow Volume",  value: "UGX 48.5M", icon: Banknote,   cls: "text-orange-400"  },
  { label: "Active Fleet",   value: "182 Items",  icon: Activity,   cls: "text-white"        },
  { label: "Utilization",    value: "86.4%",      icon: TrendingUp, cls: "text-emerald-400" },
  { label: "Default Rate",   value: "0.00%",      icon: ShieldCheck,cls: "text-cyan-400"    },
];

const PAGE_TITLES: Record<string, string> = {
  marketplace: "Equipment Marketplace",
  detail:      "Equipment Detail",
  booking:     "Booking & Escrow",
  owner:       "Owner Dashboard",
  renter:      "Renter Dashboard",
  agent:       "Agent Dashboard",
  gov:         "Governance & Audit",
};

/* ── Component ────────────────────────────────────────────────────────────── */
export default function GearLinkUI() {
  const [viewMode, setViewMode]       = useState<"auth"|"workspace">("auth");
  const [authState, setAuthState]     = useState<"splash"|"login"|"register"|"forgot">("splash");
  const [user, setUser]               = useState<{name:string;role:string;phone:string;location:string}|null>(null);
  const [page, setPage]               = useState("marketplace");
  const [role, setRole]               = useState("owner");
  const [equipmentList, setEquipmentList]     = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [activeEquipment, setActiveEquipment] = useState<EquipmentItem>(INITIAL_EQUIPMENT[0]);
  const [activeCat, setActiveCat]     = useState<string|null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);

  const signOut = () => { setAuthState("splash"); setViewMode("auth"); };

  const handleLoginSuccess = (u: {name:string;role:string;phone:string;location:string}) => {
    setUser(u); setRole(u.role); setViewMode("workspace"); setPage("marketplace");
  };

  const handleBookingSubmit = (req: BookingRequest) => {
    setBookingRequests(prev => [req, ...prev]);
    setRole("owner"); setPage("owner");
  };

  const roleNav: Record<string, {key:string;label:string;icon:React.ElementType;page:string}[]> = {
    owner:  [{key:"owner-dash",  label:"Owner Dashboard",  icon:HardHat,  page:"owner"  }],
    renter: [{key:"renter-dash", label:"My Bookings",      icon:Sprout,   page:"renter" }],
    agent:  [{key:"agent-dash",  label:"Agent Dashboard",  icon:Users,    page:"agent"  }],
    gov:    [{key:"gov-dash",    label:"Audit & Oversight",icon:Landmark, page:"gov"    }],
  };
  const commonNav = [
    {key:"marketplace",label:"Marketplace",     icon:LayoutGrid,page:"marketplace"},
    {key:"detail",     label:"Equipment Detail",icon:Search,    page:"detail"     },
    {key:"booking",    label:"Book & Pay",       icon:CreditCard,page:"booking"   },
  ];

  if (viewMode === "auth") {
    return <AuthView initialState={authState} onLoginSuccess={handleLoginSuccess} />;
  }

  const rs = ROLE_STYLE[role] ?? ROLE_STYLE.owner;
  const initials = user ? user.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase() : "SJ";

  return (
    <div className="gl-body min-h-screen flex" style={{ background:"var(--c-paper)" }}>

      {/* ── Mobile top bar ──────────────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 flex items-center justify-between px-4 z-40 shadow-lg"
        style={{ background:"var(--c-side)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <GearLinkLogo size="sm" showText />
        <div className="flex items-center gap-1.5">
          <button className="relative p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/8">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-400" />
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-white rounded-xl hover:bg-white/8">
            {sidebarOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>

      {/* ── Mobile backdrop ─────────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ════════════════════════════════════════════════════════════════
          SIDEBAR
      ════════════════════════════════════════════════════════════════ */}
      <aside className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-72 flex flex-col h-screen transition-transform duration-300 ease-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "var(--c-side)" }}>

        {/* Logo bar */}
        <div className="px-6 py-5 flex items-center justify-between"
          style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <GearLinkLogo size="md" showText animated />
          <button className="lg:hidden p-1.5 rounded-xl text-white/40 hover:text-white hover:bg-white/8"
            onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* User card */}
        <div className="mx-4 mt-6 mb-3 p-5 rounded-2xl premium-card animate-slide-right">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-extrabold text-base text-white interactive-scale animate-glow-pulse"
              style={{ background:"linear-gradient(135deg, #FF8C60, #FF6B35, #E85520)", boxShadow:"var(--s-p)" }}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white truncate">{user?.name ?? "Sekajigo James"}</div>
              <div className="text-[11px] truncate mt-1" style={{ color:"rgba(255,255,255,0.50)" }}>
                {user?.location ?? "Fort Portal, Kabarole"}
              </div>
            </div>
            <button onClick={signOut} title="Sign Out"
              className="p-2 rounded-xl transition-all interactive-scale text-white/40 hover:text-red-400 hover:bg-red-500/15 flex-shrink-0">
              <LogOut size={16} />
            </button>
          </div>
          {/* Role badge */}
          <div className="mt-4 flex items-center gap-2.5 px-4 py-2 rounded-xl backdrop-blur-medium"
            style={{ background:"rgba(255,107,53,0.15)", border:"1px solid rgba(255,107,53,0.25)" }}>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 animate-pulse`} style={{ background:"var(--c-p)" }} />
            <span className="text-[12px] font-bold gradient-text-warm">
              {ROLE_LABELS[role] ?? getRoleLabel(role)}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6 no-scrollbar">

          <div>
            <div className="section-label px-3 mb-3" style={{ color:"rgba(255,255,255,0.30)" }}>Explore</div>
            <div className="space-y-1">
              {commonNav.map(n => {
                const active = page === n.page;
                return (
                  <button key={n.key} onClick={() => { setPage(n.page); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-200 interactive-lift ${
                      active ? "" : "text-white/60 hover:text-white hover:bg-white/8"
                    }`}
                    style={active ? {
                      background: "linear-gradient(135deg, rgba(255,107,53,0.25), rgba(255,107,53,0.15))",
                      color: "#FF8C60",
                      border: "2px solid rgba(255,107,53,0.3)",
                      boxShadow: "0 4px 20px rgba(255,107,53,0.2)",
                    } : {}}>
                    <n.icon size={18} style={active ? { color:"var(--c-p)" } : {}} />
                    <span className="flex-1 text-left">{n.label}</span>
                    {active && (
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background:"var(--c-p)" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="section-label px-3 mb-3" style={{ color:"rgba(255,255,255,0.30)" }}>My Workspace</div>
            <div className="space-y-1">
              {(roleNav[role] ?? []).map(n => {
                const active = page === n.page;
                return (
                  <button key={n.key} onClick={() => { setPage(n.page); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-200 interactive-lift ${
                      active ? "" : "text-white/60 hover:text-white hover:bg-white/8"
                    }`}
                    style={active ? {
                      background: "linear-gradient(135deg, rgba(0,212,255,0.20), rgba(0,212,255,0.12))",
                      color: "#00D4FF",
                      border: "2px solid rgba(0,212,255,0.25)",
                      boxShadow: "0 4px 20px rgba(0,212,255,0.2)",
                    } : {}}>
                    <n.icon size={18} style={active ? { color:"var(--c-a)" } : {}} />
                    <span className="flex-1 text-left">{n.label}</span>
                    {active && (
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background:"var(--c-a)" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Auth screen shortcuts */}
          <div>
            <div className="section-label px-3 mb-2" style={{ color:"rgba(255,255,255,0.15)" }}>Auth Screens</div>
            <div className="grid grid-cols-2 gap-1.5">
              {([["splash","Splash"],["login","Login"],["register","Register"],["forgot","OTP"]] as const).map(([s,l]) => (
                <button key={s} onClick={() => { setAuthState(s); setViewMode("auth"); }}
                  className="py-1.5 px-2 rounded-xl text-[11px] font-medium text-left transition-colors"
                  style={{ background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.40)" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-5 py-4" style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between" style={{ fontSize:11, color:"rgba(255,255,255,0.28)" }}>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Escrow Network Online
            </div>
            <span className="font-mono">v1.0</span>
          </div>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">

        {/* Desktop header */}
        <header className="gl-header hidden lg:flex sticky top-0 z-30 items-center justify-between px-8 py-4 backdrop-blur-heavy">
          <div className="animate-slide-right">
            <div className="section-label mb-1 flex items-center gap-2" style={{ color:"var(--c-p)" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              GearLink Platform
            </div>
            <h1 className="gl-display font-extrabold text-2xl gradient-text-warm">
              {PAGE_TITLES[page] ?? ""}
            </h1>
          </div>
          <div className="flex items-center gap-4 animate-slide-left">
            <button className="relative w-11 h-11 rounded-2xl border flex items-center justify-center transition-all interactive-lift premium-card">
              <Bell size={18} style={{ color:"#8892AA" }} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2 bg-orange-400 animate-glow-pulse"
                style={{ borderColor:"var(--c-paper)" }} />
            </button>
            <div className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl premium-card interactive-scale">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs text-white animate-glow-pulse"
                style={{ background:"linear-gradient(135deg,#FF8C60,#FF6B35)" }}>
                {initials}
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold text-gray-800 truncate max-w-[120px]">{user?.name ?? "Sekajigo James"}</div>
                <div className="text-[11px] font-semibold gradient-text">
                  {ROLE_LABELS[role] ?? getRoleLabel(role)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* KPI strip */}
        <div className="hidden lg:flex items-stretch overflow-x-auto no-scrollbar"
          style={{ background:"var(--c-side-2)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          {KPI.map(s => (
            <div key={s.label} className="flex items-center gap-3 px-7 py-3.5 flex-shrink-0"
              style={{ borderRight:"1px solid rgba(255,255,255,0.06)" }}>
              <s.icon size={15} className={s.cls} />
              <div>
                <div className="section-label" style={{ color:"rgba(255,255,255,0.30)", marginBottom:1 }}>{s.label}</div>
                <div className={`gl-display font-extrabold text-sm ${s.cls}`}>{s.value}</div>
              </div>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5 px-7 text-[11px] flex-shrink-0"
            style={{ color:"rgba(255,255,255,0.30)" }}>
            <Zap size={13} className="text-orange-400" />
            Smart Escrow Active
          </div>
        </div>

        {/* Page */}
        <main className="flex-1 p-6 sm:p-8 max-lg:pt-20">
          {!canAccessPage(role, page) ? (
            <div className="gl-card p-10 text-center max-w-md mx-auto mt-12">
              <div className="w-16 h-16 rounded-3xl mx-auto mb-5 flex items-center justify-center"
                style={{ background:"var(--c-p-bg)", border:"1px solid rgba(255,107,53,0.25)" }}>
                <Lock size={28} style={{ color:"var(--c-p)" }} />
              </div>
              <h2 className="gl-display font-extrabold text-2xl mb-3" style={{ color:"var(--c-ink)" }}>
                Access Restricted
              </h2>
              <p className="gl-body text-sm mb-7 leading-relaxed" style={{ color:"#8892AA" }}>
                Your account is registered as{" "}
                <strong style={{ color:"var(--c-ink)" }}>{getRoleLabel(role)}</strong>.
                You can only access your designated workspace.
              </p>
              <GearButton variant="primary" style={{ width:"100%", justifyContent:"center" }}
                onClick={() => setPage(getRoleDashboardPage(role))}>
                Go to {getRoleLabel(role)} Dashboard
              </GearButton>
            </div>
          ) : (
            <>
              {page === "marketplace" && (
                <MarketplacePage setPage={setPage} setActiveEquipment={setActiveEquipment}
                  activeCat={activeCat} setActiveCat={setActiveCat} equipmentList={equipmentList} />
              )}
              {page === "detail"  && <DetailPage item={activeEquipment} setPage={setPage} />}
              {page === "booking" && <BookingPage item={activeEquipment} setPage={setPage} userRole={role} onBookingSubmit={handleBookingSubmit} />}
              {page === "owner"   && <OwnerDashboard equipmentList={equipmentList}
                onAddEquipment={e => setEquipmentList(p=>[e,...p])}
                bookingRequests={bookingRequests}
                onSignOut={signOut} />}
              {page === "renter"  && <RenterDashboard onSignOut={signOut} />}
              {page === "agent"   && <AgentDashboard  onSignOut={signOut} />}
              {page === "gov"     && <GovernanceDashboard onSignOut={signOut} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
