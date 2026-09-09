"use client";

import React, { useState, useEffect } from "react";
import {
  HardHat, Sprout, Users, Landmark,
  Phone, Mail, Lock, ArrowRight, ArrowLeft,
  CheckCircle2, ShieldCheck, Smartphone,
  RefreshCw, Eye, EyeOff, MapPin,
} from "lucide-react";
import { GearLinkLogo } from "@/components/ui/gearlink-logo";

interface AuthViewProps {
  initialState?: "splash" | "login" | "register" | "forgot";
  onLoginSuccess: (userData: { name: string; role: string; phone: string; location: string }) => void;
}

/* ── Shared input wrapper ──────────────────────────────────────────────────── */
function Field({
  label, icon: Icon, children,
}: { label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div>
      <label className="gl-body block text-xs font-semibold text-[#6B6A62] mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative flex items-center">
        <Icon size={15} className="absolute left-3.5 text-[#9B9A93] pointer-events-none z-10" />
        {children}
      </div>
    </div>
  );
}

const INPUT = "gl-body w-full pl-10 pr-4 py-3 text-sm bg-[#F7F4EF] border border-[#E2DCD0] rounded-xl text-[#1B1B18] placeholder-[#B5B2AB] font-medium focus:outline-none focus:bg-white focus:border-[#1A3029] focus:shadow-[0_0_0_3px_rgba(26,48,41,0.08)] transition-all";

/* ── Demo login buttons ────────────────────────────────────────────────────── */
const DEMO_ROLES = [
  { role: "owner",  name: "Sekajigo James",     label: "Owner",      icon: HardHat,  color: "text-amber-600",   bg: "bg-amber-50 border-amber-200 hover:border-amber-400" },
  { role: "renter", name: "Turyahikayo Grace",  label: "Renter",     icon: Sprout,   color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200 hover:border-emerald-400" },
  { role: "agent",  name: "Byaruhanga Moses",   label: "Agent",      icon: Users,    color: "text-sky-600",     bg: "bg-sky-50 border-sky-200 hover:border-sky-400" },
  { role: "gov",    name: "District Engineer",  label: "Governance", icon: Landmark, color: "text-violet-600",  bg: "bg-violet-50 border-violet-200 hover:border-violet-400" },
];

const ROLES = [
  { key: "owner",  title: "Equipment Owner",     desc: "List machinery & earn from idle equipment.",    icon: HardHat,  color: "#D48E1D" },
  { key: "renter", title: "Renter / Farmer",     desc: "Rent equipment for your project or farm.",      icon: Sprout,   color: "#2E7D32" },
  { key: "agent",  title: "Youth Logistics Agent",desc: "Onboard owners & coordinate deliveries.",      icon: Users,    color: "#0277BD" },
  { key: "gov",    title: "Governance Officer",  desc: "Oversee, audit, and certify listed equipment.", icon: Landmark, color: "#5E35B1" },
];

/* ─────────────────────────────────────────────────────────────────────────── */
export const AuthView: React.FC<AuthViewProps> = ({ initialState = "splash", onLoginSuccess }) => {
  const [authState, setAuthState]   = useState<"splash" | "login" | "register" | "forgot">(initialState);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [showPwd, setShowPwd]       = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  // Form fields
  const [phone,    setPhone]    = useState("+256 772 100 200");
  const [email,    setEmail]    = useState("james@sekajigo.co.ug");
  const [password, setPassword] = useState("password123");
  const [fullName, setFullName] = useState("Sekajigo James");
  const [location, setLocation] = useState("Fort Portal, Kabarole");
  const [selectedRole, setSelectedRole] = useState<"owner" | "renter" | "agent" | "gov">("owner");

  // OTP
  const [otpSent, setOtpSent]   = useState(false);
  const [otpCode, setOtpCode]   = useState(["", "", "", "", "", ""]);
  const [timer,   setTimer]     = useState(30);

  // Renter fields
  const [ninNumber, setNinNumber]   = useState("CM98012345678A");
  const [villageLC1, setVillageLC1] = useState("Kicwamba Village, LC1 Zone 3");
  const [nokName, setNokName]       = useState("Kembabazi Florence");
  const [nokPhone, setNokPhone]     = useState("+256 774 333 444");
  const [lc1Name, setLc1Name]       = useState("Chairman Mwesigwa Paul");
  const [lc1Phone, setLc1Phone]     = useState("+256 782 999 888");

  // Splash auto-progress
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (authState !== "splash") return;
    setProgress(0);
    setSplashDone(false);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(iv); setSplashDone(true); return 100; }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(iv);
  }, [authState]);

  // OTP countdown
  useEffect(() => {
    if (!otpSent || timer <= 0) return;
    const iv = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(iv);
  }, [otpSent, timer]);

  const login    = (e: React.FormEvent) => { e.preventDefault(); onLoginSuccess({ name: fullName, role: selectedRole, phone, location }); };
  const register = (e: React.FormEvent) => { e.preventDefault(); onLoginSuccess({ name: fullName, role: selectedRole, phone, location }); };

  /* ──────────────────────────────────────────────────────────────────────────
     1. SPLASH SCREEN
  ────────────────────────────────────────────────────────────────────────── */
  if (authState === "splash") {
    return (
      <div className="min-h-screen bg-[#0E1F18] flex flex-col select-none overflow-hidden relative">

        {/* Deep background radial glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#1A3029] opacity-60 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#F5B038]/8 blur-[100px]" />
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-[#F5B038]/5 blur-[80px]" />
        </div>

        {/* Top status bar */}
        <div className="relative z-10 flex items-center justify-between px-8 pt-8 text-[11px] font-semibold text-white/30">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Uganda Network Online
          </div>
          <span className="font-mono">v1.0 MVP</span>
        </div>

        {/* Centre hero */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">

          {/* Logo card */}
          <div
            className="cursor-pointer mb-8 group"
            onClick={() => setAuthState("login")}
          >
            <div className="relative inline-flex">
              <div className="w-28 h-28 rounded-[28px] bg-[#1A3029] border border-[#F5B038]/30 shadow-[0_0_60px_rgba(245,176,56,0.15)] flex items-center justify-center group-hover:border-[#F5B038]/60 group-hover:shadow-[0_0_80px_rgba(245,176,56,0.25)] transition-all duration-500">
                <GearLinkLogo size="xl" showText={false} animated={false} />
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-[28px] ring-2 ring-[#F5B038]/0 group-hover:ring-[#F5B038]/20 transition-all duration-500" />
              {/* Verified badge */}
              <div className="absolute -bottom-2 -right-2 flex items-center gap-1 bg-[#F5B038] text-[#241804] text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg">
                <CheckCircle2 size={10} />
                Verified
              </div>
            </div>
          </div>

          {/* Brand name */}
          <h1 className="gl-display text-6xl font-black text-white tracking-tight mb-1">
            Gear<span className="text-[#F5B038]">Link</span>
          </h1>
          <p className="gl-body text-sm text-white/40 max-w-xs leading-relaxed mt-2 mb-10">
            Uganda's rural machinery sharing platform — escrow-protected, agent-verified.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              "🔒 2-Way Escrow",
              "📍 GPS Verified",
              "💳 Mobile Money",
              "🤝 Youth Agents",
            ].map((f) => (
              <span
                key={f}
                className="gl-body text-[11px] font-semibold text-white/50 bg-white/6 border border-white/10 px-3 py-1.5 rounded-full"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs mb-8">
            <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F5B038]/60 to-[#F5B038] rounded-full transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="w-full max-w-xs space-y-3">
            <button
              onClick={() => setAuthState("login")}
              className="gl-body w-full flex items-center justify-center gap-2.5 bg-[#F5B038] hover:bg-[#E2A33B] text-[#241804] font-extrabold py-4 px-6 rounded-2xl text-sm transition-all shadow-[0_8px_30px_rgba(245,176,56,0.35)] hover:shadow-[0_12px_40px_rgba(245,176,56,0.45)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setAuthState("register")}
              className="gl-body w-full flex items-center justify-center gap-2 bg-white/6 hover:bg-white/10 border border-white/12 hover:border-white/20 text-white/70 hover:text-white font-semibold py-3.5 px-6 rounded-2xl text-sm transition-all"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pb-8 text-center text-[11px] text-white/20 gl-body">
          GearLink Uganda Ltd · Fort Portal · Kasese · Kampala
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────────────────
     2. LOGIN
  ────────────────────────────────────────────────────────────────────────── */
  if (authState === "login") {
    return (
      <div className="min-h-screen bg-[#F0EDE4] flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-scale-in">

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#E2DCD0] overflow-hidden">

            {/* Dark header */}
            <div className="bg-[#1A3029] px-8 py-7">
              <GearLinkLogo size="md" showText={true} />
              <h2 className="gl-display font-extrabold text-2xl text-white mt-5 mb-1">
                Welcome back
              </h2>
              <p className="gl-body text-sm text-white/50">
                Sign in to manage rentals, bookings & escrow.
              </p>
            </div>

            <div className="px-8 py-7 space-y-5">
              {/* Login method toggle */}
              <div className="flex bg-[#F7F4EF] p-1 rounded-xl border border-[#E2DCD0]">
                {(["phone","email"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setLoginMethod(m)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      loginMethod === m
                        ? "bg-[#1A3029] text-white shadow-sm"
                        : "text-[#9B9A93] hover:text-[#1B1B18]"
                    }`}
                  >
                    {m === "phone" ? <Smartphone size={13} /> : <Mail size={13} />}
                    {m === "phone" ? "Phone" : "Email"}
                  </button>
                ))}
              </div>

              <form onSubmit={login} className="space-y-4">
                {loginMethod === "phone" ? (
                  <Field label="Mobile Money Phone" icon={Phone}>
                    <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="+256 772 000 000" className={INPUT} />
                  </Field>
                ) : (
                  <Field label="Email Address" icon={Mail}>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.co.ug" className={INPUT} />
                  </Field>
                )}

                <Field label="Password" icon={Lock}>
                  <input
                    type={showPwd ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={INPUT + " pr-11"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3.5 text-[#9B9A93] hover:text-[#1B1B18] transition-colors"
                  >
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </Field>

                <div className="flex justify-end">
                  <button type="button" onClick={() => setAuthState("forgot")}
                    className="gl-body text-xs font-semibold text-[#B97F22] hover:text-[#8E5F12] transition-colors">
                    Forgot password?
                  </button>
                </div>

                <button type="submit"
                  className="gl-body w-full bg-[#F5B038] hover:bg-[#E2A33B] text-[#241804] font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-[0_4px_16px_rgba(245,176,56,0.30)] hover:shadow-[0_6px_24px_rgba(245,176,56,0.40)] flex items-center justify-center gap-2">
                  Sign In to GearLink <ArrowRight size={15} />
                </button>
              </form>

              {/* Demo quick access */}
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-px bg-[#E2DCD0]" />
                  <span className="gl-body text-[11px] font-semibold text-[#9B9A93] uppercase tracking-wide">
                    Quick Demo
                  </span>
                  <div className="flex-1 h-px bg-[#E2DCD0]" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {DEMO_ROLES.map((d) => (
                    <button
                      key={d.role}
                      type="button"
                      onClick={() => onLoginSuccess({ name: d.name, role: d.role, phone, location })}
                      className={`gl-body flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${d.bg}`}
                    >
                      <d.icon size={14} className={d.color} />
                      <span className="text-[#1B1B18]">{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <p className="gl-body text-center text-xs text-[#9B9A93]">
                No account?{" "}
                <button onClick={() => setAuthState("register")}
                  className="font-bold text-[#1A3029] hover:text-[#B97F22] transition-colors">
                  Create one free
                </button>
              </p>
            </div>
          </div>

          {/* Back to splash */}
          <button
            onClick={() => setAuthState("splash")}
            className="gl-body mt-4 mx-auto flex items-center gap-1.5 text-xs font-semibold text-[#9B9A93] hover:text-[#1B1B18] transition-colors"
          >
            <ArrowLeft size={13} /> Back to home
          </button>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────────────────
     3. REGISTER
  ────────────────────────────────────────────────────────────────────────── */
  if (authState === "register") {
    return (
      <div className="min-h-screen bg-[#F0EDE4] flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-xl animate-scale-in">
          <div className="bg-white rounded-3xl shadow-xl border border-[#E2DCD0] overflow-hidden">

            {/* Dark header */}
            <div className="bg-[#1A3029] px-8 py-7">
              <GearLinkLogo size="md" showText={true} />
              <h2 className="gl-display font-extrabold text-2xl text-white mt-5 mb-1">
                Join GearLink
              </h2>
              <p className="gl-body text-sm text-white/50">
                Select your role and create your account in minutes.
              </p>
            </div>

            <div className="px-8 py-7 space-y-6">
              {/* Role selector */}
              <div>
                <div className="section-label mb-3">Select your role</div>
                <div className="grid grid-cols-2 gap-2.5">
                  {ROLES.map((r) => {
                    const active = selectedRole === r.key;
                    return (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => setSelectedRole(r.key as typeof selectedRole)}
                        className={`text-left p-4 rounded-2xl border-2 transition-all ${
                          active
                            ? "border-[#1A3029] bg-[#F0EDE4]"
                            : "border-[#E2DCD0] bg-white hover:border-[#B0A898]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: r.color + "18" }}
                          >
                            <r.icon size={17} style={{ color: r.color }} />
                          </div>
                          {active && <CheckCircle2 size={16} className="text-[#1A3029]" />}
                        </div>
                        <div className="gl-display font-bold text-[13px] text-[#1B1B18]">{r.title}</div>
                        <div className="gl-body text-[11px] text-[#9B9A93] mt-0.5 leading-snug">{r.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={register} className="space-y-4">
                {/* Basic info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Full Name" icon={Users}>
                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Byaruhanga Moses" className={INPUT} />
                  </Field>
                  <Field label="Mobile Money Phone" icon={Phone}>
                    <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="+256 772 000 000" className={INPUT} />
                  </Field>
                  <Field label="Email Address" icon={Mail}>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.co.ug" className={INPUT} />
                  </Field>
                  <Field label="Location / District" icon={MapPin}>
                    <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)}
                      placeholder="Fort Portal, Kabarole" className={INPUT} />
                  </Field>
                </div>

                {/* Renter identity verification */}
                {selectedRole === "renter" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2.5 mb-1">
                      <ShieldCheck size={16} className="text-amber-600 flex-shrink-0" />
                      <div>
                        <div className="gl-body text-xs font-extrabold text-amber-900 uppercase tracking-wide">
                          Identity Verification Required
                        </div>
                        <div className="text-[11px] text-amber-700 mt-0.5">
                          Escrow protection requires verified renters.
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="gl-body text-[11px] font-bold text-[#6B6A62] block mb-1 uppercase tracking-wide">National ID (NIN)</label>
                        <input type="text" required value={ninNumber} onChange={(e) => setNinNumber(e.target.value)}
                          placeholder="CM98012345678A"
                          className="gl-body w-full px-3.5 py-2.5 text-xs bg-white border border-amber-200 rounded-xl font-mono text-[#1B1B18] focus:outline-none focus:border-[#1A3029]" />
                      </div>
                      <div>
                        <label className="gl-body text-[11px] font-bold text-[#6B6A62] block mb-1 uppercase tracking-wide">Village / LC1 Zone</label>
                        <input type="text" required value={villageLC1} onChange={(e) => setVillageLC1(e.target.value)}
                          placeholder="Kicwamba Village, LC1 Zone 3"
                          className="gl-body w-full px-3.5 py-2.5 text-xs bg-white border border-amber-200 rounded-xl text-[#1B1B18] focus:outline-none focus:border-[#1A3029]" />
                      </div>
                    </div>
                    {/* ID upload simulation */}
                    <div className="grid grid-cols-3 gap-2">
                      {[["ID Front","✓ Uploaded"],["ID Back","✓ Uploaded"],["Selfie","✓ Matched"]].map(([t,s]) => (
                        <div key={t} className="bg-white border border-amber-200 rounded-xl p-2.5 text-center">
                          <div className="text-[10px] font-bold text-[#6B6A62] mb-1">{t}</div>
                          <div className="text-[11px] font-semibold text-emerald-600">{s}</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-amber-200">
                      <div>
                        <label className="gl-body text-[11px] font-bold text-[#6B6A62] block mb-1">Guarantor Name & Phone</label>
                        <input type="text" required value={`${nokName} (${nokPhone})`}
                          onChange={(e) => setNokName(e.target.value)}
                          className="gl-body w-full px-3 py-2 text-xs bg-white border border-amber-200 rounded-xl text-[#1B1B18] focus:outline-none" />
                      </div>
                      <div>
                        <label className="gl-body text-[11px] font-bold text-[#6B6A62] block mb-1">LC1 Chairperson Reference</label>
                        <input type="text" required value={`${lc1Name} (${lc1Phone})`}
                          onChange={(e) => setLc1Name(e.target.value)}
                          className="gl-body w-full px-3 py-2 text-xs bg-white border border-amber-200 rounded-xl text-[#1B1B18] focus:outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                <Field label="Create Password" icon={Lock}>
                  <input type={showPwd ? "text" : "password"} required value={password}
                    onChange={(e) => setPassword(e.target.value)} className={INPUT + " pr-11"} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3.5 text-[#9B9A93] hover:text-[#1B1B18] transition-colors">
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </Field>

                <button type="submit"
                  className="gl-body w-full bg-[#1A3029] hover:bg-[#243B34] text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2">
                  Create Account & Enter GearLink <ArrowRight size={15} />
                </button>
              </form>

              <p className="gl-body text-center text-xs text-[#9B9A93]">
                Already registered?{" "}
                <button onClick={() => setAuthState("login")}
                  className="font-bold text-[#1A3029] hover:text-[#B97F22] transition-colors">
                  Sign in
                </button>
              </p>
            </div>
          </div>

          <button onClick={() => setAuthState("splash")}
            className="gl-body mt-4 mx-auto flex items-center gap-1.5 text-xs font-semibold text-[#9B9A93] hover:text-[#1B1B18] transition-colors">
            <ArrowLeft size={13} /> Back to home
          </button>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────────────────
     4. FORGOT PASSWORD / OTP
  ────────────────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#F0EDE4] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="bg-white rounded-3xl shadow-xl border border-[#E2DCD0] overflow-hidden">

          <div className="bg-[#1A3029] px-8 py-7">
            <GearLinkLogo size="md" showText={true} />
            <h2 className="gl-display font-extrabold text-2xl text-white mt-5 mb-1">
              {otpSent ? "Verify & Reset" : "Reset Password"}
            </h2>
            <p className="gl-body text-sm text-white/50">
              {otpSent
                ? `A 6-digit SMS code was sent to ${phone}.`
                : "Enter your phone number to receive a reset code."}
            </p>
          </div>

          <div className="px-8 py-7 space-y-5">
            {!otpSent ? (
              <form onSubmit={(e) => { e.preventDefault(); setOtpSent(true); setTimer(30); }} className="space-y-4">
                <Field label="Mobile Money Phone" icon={Phone}>
                  <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="+256 772 000 000" className={INPUT} />
                </Field>
                <button type="submit"
                  className="gl-body w-full bg-[#F5B038] hover:bg-[#E2A33B] text-[#241804] font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2">
                  Send Verification Code <ArrowRight size={15} />
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                {/* OTP boxes */}
                <div>
                  <div className="gl-body text-xs font-bold text-[#6B6A62] uppercase tracking-wide mb-3">
                    Enter 6-digit OTP
                  </div>
                  <div className="flex justify-between gap-2">
                    {[0,1,2,3,4,5].map((idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={otpCode[idx]}
                        onChange={(e) => {
                          const next = [...otpCode];
                          next[idx] = e.target.value;
                          setOtpCode(next);
                          // auto-focus next
                          if (e.target.value && idx < 5) {
                            const inputs = e.target.parentElement?.querySelectorAll("input");
                            inputs?.[idx + 1]?.focus();
                          }
                        }}
                        className="gl-body flex-1 h-13 text-center font-extrabold text-xl bg-[#F7F4EF] border-2 border-[#E2DCD0] rounded-xl focus:border-[#1A3029] focus:outline-none transition-colors"
                        style={{ height: 52 }}
                      />
                    ))}
                  </div>
                </div>

                <Field label="New Password" icon={Lock}>
                  <input type={showPwd ? "text" : "password"} required placeholder="Enter new password"
                    className={INPUT + " pr-11"} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3.5 text-[#9B9A93] hover:text-[#1B1B18] transition-colors">
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </Field>

                <button
                  onClick={() => setAuthState("login")}
                  className="gl-body w-full bg-[#1A3029] hover:bg-[#243B34] text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2">
                  Verify & Reset Password <ArrowRight size={15} />
                </button>

                <div className="text-center text-xs text-[#9B9A93] gl-body">
                  {timer > 0 ? (
                    <span>Resend code in <strong className="text-[#1B1B18]">{timer}s</strong></span>
                  ) : (
                    <button onClick={() => { setTimer(30); }}
                      className="font-bold text-[#B97F22] hover:text-[#8E5F12] flex items-center justify-center gap-1 mx-auto transition-colors">
                      <RefreshCw size={12} /> Resend OTP
                    </button>
                  )}
                </div>
              </div>
            )}

            <p className="gl-body text-center text-xs text-[#9B9A93] pt-1">
              Remember your password?{" "}
              <button onClick={() => setAuthState("login")}
                className="font-bold text-[#1A3029] hover:text-[#B97F22] transition-colors">
                Sign in
              </button>
            </p>
          </div>
        </div>

        <button onClick={() => setAuthState("splash")}
          className="gl-body mt-4 mx-auto flex items-center gap-1.5 text-xs font-semibold text-[#9B9A93] hover:text-[#1B1B18] transition-colors">
          <ArrowLeft size={13} /> Back to home
        </button>
      </div>
    </div>
  );
};
