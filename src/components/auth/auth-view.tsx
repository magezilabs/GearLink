"use client";

import React, { useState, useEffect } from "react";
import {
  HardHat, Sprout, Users, Landmark, Phone, Mail, Lock,
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck,
  Smartphone, RefreshCw, Eye, EyeOff, MapPin, Star,
} from "lucide-react";
import { GearLinkLogo } from "@/components/ui/gearlink-logo";

interface AuthViewProps {
  initialState?: "splash"|"login"|"register"|"forgot";
  onLoginSuccess: (u:{name:string;role:string;phone:string;location:string}) => void;
}

const INPUT = "gl-body w-full pl-10 pr-4 py-3 text-sm rounded-2xl font-medium focus:outline-none transition-all"
            + " bg-[#F4F5FF] border border-[#E4E6F0] text-[#0D1117] placeholder-[#8892AA]";

function Field({ label, icon: Icon, children }: { label:string; icon:React.ElementType; children:React.ReactNode }) {
  return (
    <div>
      <label className="gl-body block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:"#8892AA" }}>
        {label}
      </label>
      <div className="relative flex items-center">
        <Icon size={15} className="absolute left-3.5 pointer-events-none z-10" style={{ color:"#8892AA" }} />
        {children}
      </div>
    </div>
  );
}

const DEMO_ROLES = [
  { role:"owner",  name:"Sekajigo James",    label:"Owner",      icon:HardHat,  border:"border-orange-200 hover:border-orange-400", bg:"bg-orange-50", ic:"text-orange-500" },
  { role:"renter", name:"Turyahikayo Grace", label:"Renter",     icon:Sprout,   border:"border-emerald-200 hover:border-emerald-400",bg:"bg-emerald-50",ic:"text-emerald-600"},
  { role:"agent",  name:"Byaruhanga Moses",  label:"Agent",      icon:Users,    border:"border-cyan-200 hover:border-cyan-400",      bg:"bg-cyan-50",   ic:"text-cyan-600"  },
  { role:"gov",    name:"District Engineer", label:"Governance", icon:Landmark, border:"border-violet-200 hover:border-violet-400",  bg:"bg-violet-50", ic:"text-violet-600"},
];

const ROLES = [
  { key:"owner",  title:"Equipment Owner",      desc:"List machinery & earn from idle equipment.",    icon:HardHat,  color:"#FF6B35" },
  { key:"renter", title:"Renter / Farmer",      desc:"Rent equipment for your project or farm.",      icon:Sprout,   color:"#00C896" },
  { key:"agent",  title:"Youth Logistics Agent",desc:"Onboard owners & coordinate deliveries.",       icon:Users,    color:"#00D4FF" },
  { key:"gov",    title:"Governance Officer",   desc:"Oversee, audit, and certify listed equipment.", icon:Landmark, color:"#7C6FF7" },
];

const FEATURES = [
  { emoji:"🔒", label:"2-Way Escrow" },
  { emoji:"📍", label:"GPS Verified" },
  { emoji:"💳", label:"Mobile Money" },
  { emoji:"🤝", label:"Youth Agents" },
  { emoji:"⭐", label:"Rated Owners" },
];

export const AuthView: React.FC<AuthViewProps> = ({ initialState="splash", onLoginSuccess }) => {
  const [authState, setAuthState]   = useState<"splash"|"login"|"register"|"forgot">(initialState);
  const [loginMethod, setLoginMethod] = useState<"phone"|"email">("phone");
  const [showPwd, setShowPwd]       = useState(false);

  const [phone,    setPhone]    = useState("+256 772 100 200");
  const [email,    setEmail]    = useState("james@sekajigo.co.ug");
  const [password, setPassword] = useState("password123");
  const [fullName, setFullName] = useState("Sekajigo James");
  const [location, setLocation] = useState("Fort Portal, Kabarole");
  const [role, setRole]         = useState<"owner"|"renter"|"agent"|"gov">("owner");

  const [otpSent, setOtpSent]   = useState(false);
  const [otpCode, setOtpCode]   = useState(["","","","","",""]);
  const [timer,   setTimer]     = useState(30);

  const [ninNumber, setNinNumber]   = useState("CM98012345678A");
  const [villageLC1, setVillageLC1] = useState("Kicwamba Village, LC1 Zone 3");

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (authState !== "splash") return;
    setProgress(0);
    const iv = setInterval(() => setProgress(p => { if(p>=100){clearInterval(iv);return 100;} return p+1.5; }), 20);
    return () => clearInterval(iv);
  }, [authState]);

  useEffect(() => {
    if (!otpSent || timer<=0) return;
    const iv = setInterval(() => setTimer(t=>t-1), 1000);
    return () => clearInterval(iv);
  }, [otpSent, timer]);

  const login    = (e:React.FormEvent) => { e.preventDefault(); onLoginSuccess({name:fullName,role,phone,location}); };
  const register = (e:React.FormEvent) => { e.preventDefault(); onLoginSuccess({name:fullName,role,phone,location}); };

  /* ── SPLASH ─────────────────────────────────────────────────────────────── */
  if (authState === "splash") {
    return (
      <div className="min-h-screen flex select-none overflow-hidden relative"
        style={{ 
          background: `
            linear-gradient(135deg, #0B0F1E 0%, #151B30 25%, #1E2744 75%, #0B0F1E 100%),
            radial-gradient(ellipse at 20% 50%, rgba(255,107,53,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 90%, rgba(124,111,247,0.03) 0%, transparent 50%)
          `
        }}>

        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-20 animate-float"
            style={{ background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)", filter:"blur(60px)" }} />
          <div className="absolute bottom-32 right-16 w-80 h-80 rounded-full opacity-15 animate-float"
            style={{ background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)", filter:"blur(50px)", animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-10 w-64 h-64 rounded-full opacity-10 animate-float"
            style={{ background: "radial-gradient(circle, rgba(124,111,247,0.15) 0%, transparent 70%)", filter:"blur(40px)", animationDelay: "2s" }} />
        </div>

        {/* Subtle grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{ 
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", 
            backgroundSize: "50px 50px" 
          }} 
        />

        {/* Header */}
        <header className="absolute top-0 inset-x-0 flex items-center justify-between px-8 py-6 z-20">
          <div className="flex items-center gap-2 text-xs font-semibold backdrop-blur-light px-3 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-glow-pulse" />
            Uganda Network • Live
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs px-3 py-2 rounded-full backdrop-blur-light"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}>
              v1.0 Beta
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-8 py-24 gap-20 relative z-10">

          {/* Left Side - Hero Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl animate-slide-right">
            
            {/* Logo Section */}
            <div className="mb-12 flex flex-col items-center lg:items-start">
              <div className="cursor-pointer mb-8 relative inline-flex group" onClick={() => setAuthState("login")}>
                <div className="w-32 h-32 rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 interactive-lift"
                  style={{ 
                    background: "linear-gradient(145deg, #1E2744 0%, #0B0F1E 50%, #151B30 100%)", 
                    border: "2px solid rgba(255,107,53,0.4)", 
                    boxShadow: "0 0 50px rgba(255,107,53,0.25), inset 0 2px 0 rgba(255,255,255,0.1)" 
                  }}>
                  <GearLinkLogo size="xl" showText={false} animated />
                </div>
                <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 font-extrabold text-xs px-3 py-1.5 rounded-full animate-bounce-in"
                  style={{ 
                    background: "linear-gradient(135deg, #FF8C60, #FF6B35)", 
                    color: "#fff", 
                    boxShadow: "var(--s-p)", 
                    animationDelay: "0.5s" 
                  }}>
                  <ShieldCheck size={10} /> 
                  Verified
                </div>
              </div>
              
              {/* Main Heading */}
              <div className="mb-8">
                <h1 className="gl-display font-black text-white mb-4 animate-fade-up" 
                    style={{ 
                      fontSize: "clamp(48px, 8vw, 88px)", 
                      lineHeight: 0.95, 
                      letterSpacing: "-0.03em" 
                    }}>
                  Gear<span className="gradient-text-warm">Link</span>
                </h1>
                <div className="h-1 w-24 rounded-full mx-auto lg:mx-0 mb-6 animate-fade-up"
                  style={{ 
                    background: "linear-gradient(90deg, var(--c-p), var(--c-a))", 
                    animationDelay: "0.2s" 
                  }} 
                />
                <p className="gl-body text-lg leading-relaxed-plus max-w-lg text-balance animate-fade-up"
                   style={{ 
                     color: "rgba(255,255,255,0.7)", 
                     animationDelay: "0.4s" 
                   }}>
                  Uganda's first <strong className="text-white">escrow-protected</strong> machinery sharing platform. 
                  <br/>GPS-tracked equipment, agent-verified owners.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col items-center lg:items-start gap-6 mb-10">
                {/* Ratings */}
                <div className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={18} fill="#FF6B35" color="#FF6B35" 
                           className={`animate-bounce-in`} 
                           style={{ animationDelay: `${0.8 + i * 0.1}s` }} />
                    ))}
                  </div>
                  <span className="gl-body text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Trusted by <strong className="text-white">500+ operators</strong>
                  </span>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.8s" }}>
                  {FEATURES.map((f, i) => (
                    <span key={f.label} 
                          className={`gl-body text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-medium interactive-scale animate-slide-right`}
                          style={{ 
                            background: "rgba(255,255,255,0.08)", 
                            border: "1px solid rgba(255,255,255,0.15)", 
                            color: "rgba(255,255,255,0.8)",
                            animationDelay: `${1 + i * 0.1}s`
                          }}>
                      <span className="mr-2">{f.emoji}</span>
                      {f.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <div className="w-full max-w-md animate-slide-left">
            <div className="premium-card p-8 space-y-6 interactive-lift"
                 style={{ 
                   background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)", 
                   backdropFilter: "blur(24px) saturate(180%)",
                   border: "1px solid rgba(255,255,255,0.2)" 
                 }}>
              
              {/* Card Header */}
              <div className="text-center space-y-3">
                <h2 className="gl-display font-extrabold text-3xl text-white">Get Started</h2>
                <p className="gl-body text-base leading-relaxed text-balance" 
                   style={{ color: "rgba(255,255,255,0.6)" }}>
                  Join thousands connecting equipment owners with farmers, contractors & logistics agents across Uganda.
                </p>
              </div>

              {/* Loading Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span>Platform Status</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden backdrop-blur-light"
                     style={{ background: "rgba(255,255,255,0.1)" }}>
                  <div className="h-full rounded-full transition-all duration-100 shimmer-gold"
                       style={{ 
                         width: `${progress}%`, 
                         background: "linear-gradient(90deg, #FF8C60, #FF6B35)" 
                       }} 
                  />
                </div>
              </div>

              {/* Primary Actions */}
              <div className="space-y-4">
                <button onClick={() => setAuthState("login")}
                        className="btn-primary w-full flex items-center justify-center gap-3 text-base font-extrabold py-4 px-8 rounded-2xl transition-all">
                  Sign In to GearLink
                  <ArrowRight size={18} />
                </button>
                
                <button onClick={() => setAuthState("register")}
                        className="w-full flex items-center justify-center gap-2 text-base font-semibold py-4 px-8 rounded-2xl transition-all premium-card"
                        style={{ 
                          background: "rgba(255,255,255,0.1)", 
                          border: "1px solid rgba(255,255,255,0.2)", 
                          color: "rgba(255,255,255,0.9)" 
                        }}>
                  Create New Account
                </button>
              </div>

              {/* Demo Section */}
              <div className="space-y-4">
                <div className="divider-label" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <span>Quick Demo Access</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {DEMO_ROLES.map(d => (
                    <button key={d.role} 
                            onClick={() => onLoginSuccess({name:d.name, role:d.role, phone, location:"Fort Portal, Kabarole"})}
                            className={`flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border-2 text-center transition-all interactive-lift ${d.border} ${d.bg}`}
                            style={{ minHeight: "80px" }}>
                      <d.icon size={20} className={d.ic} />
                      <div>
                        <div className="text-xs font-bold text-gray-800">{d.label}</div>
                        <div className="text-[10px] text-gray-600 font-medium">{d.name.split(" ")[0]}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 inset-x-0 px-8 py-6 z-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="gl-body text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span className="hidden sm:inline">© 2024 </span>
              GearLink Uganda Ltd
              <span className="mx-2 hidden sm:inline">·</span>
              <span className="block sm:inline">Fort Portal • Kasese • Kampala</span>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Support</button>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  /* ── LOGIN ──────────────────────────────────────────────────────────────── */
  if (authState === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ background:"var(--c-paper)" }}>
        <div className="w-full max-w-md animate-scale-in">
          <div className="gl-card overflow-hidden">

            {/* Header */}
            <div className="p-8 pb-7" style={{ background:"linear-gradient(145deg,#1E2744,#0B0F1E)" }}>
              <GearLinkLogo size="md" showText />
              <h2 className="gl-display font-extrabold text-2xl text-white mt-5 mb-1">Welcome back</h2>
              <p className="gl-body text-sm" style={{ color:"rgba(255,255,255,0.45)" }}>
                Sign in to manage rentals, bookings & escrow.
              </p>
            </div>

            <div className="p-8 space-y-5">
              {/* Method toggle */}
              <div className="flex p-1 rounded-2xl gap-1" style={{ background:"var(--c-paper)", border:"1px solid var(--c-border)" }}>
                {(["phone","email"] as const).map(m => (
                  <button key={m} onClick={() => setLoginMethod(m)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      loginMethod===m ? "text-white shadow-md" : "text-[#8892AA] hover:text-[#0D1117]"
                    }`}
                    style={loginMethod===m ? { background:"var(--c-side)" } : {}}>
                    {m==="phone" ? <Smartphone size={13}/> : <Mail size={13}/>}
                    {m==="phone" ? "Phone" : "Email"}
                  </button>
                ))}
              </div>

              <form onSubmit={login} className="space-y-4">
                {loginMethod==="phone" ? (
                  <Field label="Mobile Money Phone" icon={Phone}>
                    <input type="text" required value={phone} onChange={e=>setPhone(e.target.value)}
                      placeholder="+256 772 000 000" className={INPUT} />
                  </Field>
                ) : (
                  <Field label="Email Address" icon={Mail}>
                    <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                      placeholder="name@example.co.ug" className={INPUT} />
                  </Field>
                )}

                <Field label="Password" icon={Lock}>
                  <input type={showPwd?"text":"password"} required value={password}
                    onChange={e=>setPassword(e.target.value)} className={INPUT+" pr-11"} />
                  <button type="button" onClick={()=>setShowPwd(!showPwd)}
                    className="absolute right-3.5 transition-colors" style={{ color:"#8892AA" }}>
                    {showPwd ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                </Field>

                <div className="flex justify-end">
                  <button type="button" onClick={()=>setAuthState("forgot")}
                    className="gl-body text-xs font-bold transition-colors" style={{ color:"var(--c-p)" }}>
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm">
                  Sign In to GearLink <ArrowRight size={15}/>
                </button>
              </form>

              {/* Demo */}
              <div>
                <div className="divider-label">Quick Demo</div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {DEMO_ROLES.map(d => (
                    <button key={d.role} onClick={() => onLoginSuccess({name:d.name,role:d.role,phone,location:"Fort Portal, Kabarole"})}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border text-xs font-semibold transition-all ${d.border} ${d.bg}`}>
                      <d.icon size={13} className={d.ic}/>
                      <span className="text-[#0D1117]">{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="gl-body text-center text-xs" style={{ color:"#8892AA" }}>
                No account?{" "}
                <button onClick={()=>setAuthState("register")} className="font-bold transition-colors" style={{ color:"var(--c-p)" }}>
                  Create one free
                </button>
              </p>
            </div>
          </div>

          <button onClick={()=>setAuthState("splash")}
            className="gl-body mt-4 mx-auto flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color:"#8892AA" }}>
            <ArrowLeft size={13}/> Back to home
          </button>
        </div>
      </div>
    );
  }

  /* ── REGISTER ───────────────────────────────────────────────────────────── */
  if (authState === "register") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 py-10"
        style={{ background:"var(--c-paper)" }}>
        <div className="w-full max-w-xl animate-scale-in">
          <div className="gl-card overflow-hidden">

            <div className="p-8 pb-7" style={{ background:"linear-gradient(145deg,#1E2744,#0B0F1E)" }}>
              <GearLinkLogo size="md" showText />
              <h2 className="gl-display font-extrabold text-2xl text-white mt-5 mb-1">Join GearLink</h2>
              <p className="gl-body text-sm" style={{ color:"rgba(255,255,255,0.45)" }}>
                Select your role and create your account in minutes.
              </p>
            </div>

            <div className="p-8 space-y-6">
              {/* Role grid */}
              <div>
                <div className="section-label mb-3">Select your role</div>
                <div className="grid grid-cols-2 gap-3">
                  {ROLES.map(r => {
                    const active = role === r.key;
                    return (
                      <button key={r.key} type="button" onClick={()=>setRole(r.key as typeof role)}
                        className="text-left p-4 rounded-2xl border-2 transition-all"
                        style={{
                          borderColor: active ? r.color : "var(--c-border)",
                          background: active ? r.color+"10" : "#fff",
                          boxShadow: active ? `0 0 0 3px ${r.color}20` : "none",
                        }}>
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: r.color+"18" }}>
                            <r.icon size={17} style={{ color:r.color }}/>
                          </div>
                          {active && <CheckCircle2 size={16} style={{ color:r.color }}/>}
                        </div>
                        <div className="gl-display font-bold text-[13px]" style={{ color:"var(--c-ink)" }}>{r.title}</div>
                        <div className="gl-body text-[11px] mt-0.5 leading-snug" style={{ color:"#8892AA" }}>{r.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={register} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Full Name" icon={Users}>
                    <input type="text" required value={fullName} onChange={e=>setFullName(e.target.value)}
                      placeholder="Byaruhanga Moses" className={INPUT}/>
                  </Field>
                  <Field label="Mobile Money Phone" icon={Phone}>
                    <input type="text" required value={phone} onChange={e=>setPhone(e.target.value)}
                      placeholder="+256 772 000 000" className={INPUT}/>
                  </Field>
                  <Field label="Email Address" icon={Mail}>
                    <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                      placeholder="you@example.co.ug" className={INPUT}/>
                  </Field>
                  <Field label="Location / District" icon={MapPin}>
                    <input type="text" required value={location} onChange={e=>setLocation(e.target.value)}
                      placeholder="Fort Portal, Kabarole" className={INPUT}/>
                  </Field>
                </div>

                {/* Renter verification */}
                {role === "renter" && (
                  <div className="rounded-2xl p-5 space-y-4"
                    style={{ background:"rgba(255,107,53,0.06)", border:"1px solid rgba(255,107,53,0.20)" }}>
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck size={16} style={{ color:"var(--c-p)" }} />
                      <div className="gl-body text-xs font-extrabold uppercase tracking-wider" style={{ color:"var(--c-p)" }}>
                        Identity Verification Required
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="gl-body text-[11px] font-bold block mb-1.5 uppercase tracking-wide" style={{ color:"#8892AA" }}>
                          National ID (NIN)
                        </label>
                        <input type="text" required value={ninNumber} onChange={e=>setNinNumber(e.target.value)}
                          placeholder="CM98012345678A"
                          className="gl-body w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border focus:outline-none"
                          style={{ background:"#fff", borderColor:"rgba(255,107,53,0.25)", color:"var(--c-ink)" }}/>
                      </div>
                      <div>
                        <label className="gl-body text-[11px] font-bold block mb-1.5 uppercase tracking-wide" style={{ color:"#8892AA" }}>
                          Village / LC1 Zone
                        </label>
                        <input type="text" required value={villageLC1} onChange={e=>setVillageLC1(e.target.value)}
                          placeholder="Kicwamba Village, LC1 Zone 3"
                          className="gl-body w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none"
                          style={{ background:"#fff", borderColor:"rgba(255,107,53,0.25)", color:"var(--c-ink)" }}/>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[["ID Front","✓ Uploaded"],["ID Back","✓ Uploaded"],["Selfie","✓ Matched"]].map(([t,s]) => (
                        <div key={t} className="rounded-xl p-2.5 text-center"
                          style={{ background:"#fff", border:"1px solid rgba(255,107,53,0.20)" }}>
                          <div className="text-[10px] font-bold mb-1" style={{ color:"#8892AA" }}>{t}</div>
                          <div className="text-[11px] font-bold" style={{ color:"var(--c-ok)" }}>{s}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Field label="Create Password" icon={Lock}>
                  <input type={showPwd?"text":"password"} required value={password}
                    onChange={e=>setPassword(e.target.value)} className={INPUT+" pr-11"}/>
                  <button type="button" onClick={()=>setShowPwd(!showPwd)}
                    className="absolute right-3.5 transition-colors" style={{ color:"#8892AA" }}>
                    {showPwd ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                </Field>

                <button type="submit" className="btn-3d-dark w-full flex items-center justify-center gap-2 py-3.5 text-sm">
                  Create Account & Enter GearLink <ArrowRight size={15}/>
                </button>
              </form>

              <p className="gl-body text-center text-xs" style={{ color:"#8892AA" }}>
                Already registered?{" "}
                <button onClick={()=>setAuthState("login")} className="font-bold" style={{ color:"var(--c-p)" }}>
                  Sign in
                </button>
              </p>
            </div>
          </div>
          <button onClick={()=>setAuthState("splash")}
            className="gl-body mt-4 mx-auto flex items-center gap-1.5 text-xs font-semibold"
            style={{ color:"#8892AA" }}>
            <ArrowLeft size={13}/> Back to home
          </button>
        </div>
      </div>
    );
  }

  /* ── OTP / FORGOT ───────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background:"var(--c-paper)" }}>
      <div className="w-full max-w-md animate-scale-in">
        <div className="gl-card overflow-hidden">
          <div className="p-8 pb-7" style={{ background:"linear-gradient(145deg,#1E2744,#0B0F1E)" }}>
            <GearLinkLogo size="md" showText />
            <h2 className="gl-display font-extrabold text-2xl text-white mt-5 mb-1">
              {otpSent ? "Verify & Reset" : "Reset Password"}
            </h2>
            <p className="gl-body text-sm" style={{ color:"rgba(255,255,255,0.45)" }}>
              {otpSent ? `6-digit code sent to ${phone}.` : "Enter your phone to receive a reset code."}
            </p>
          </div>
          <div className="p-8 space-y-5">
            {!otpSent ? (
              <form onSubmit={e=>{e.preventDefault();setOtpSent(true);setTimer(30);}} className="space-y-4">
                <Field label="Mobile Money Phone" icon={Phone}>
                  <input type="text" required value={phone} onChange={e=>setPhone(e.target.value)}
                    placeholder="+256 772 000 000" className={INPUT}/>
                </Field>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm">
                  Send Verification Code <ArrowRight size={15}/>
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="section-label mb-3">Enter 6-digit OTP</div>
                  <div className="flex justify-between gap-2">
                    {[0,1,2,3,4,5].map(idx => (
                      <input key={idx} type="text" maxLength={1} value={otpCode[idx]}
                        onChange={e=>{
                          const n=[...otpCode]; n[idx]=e.target.value; setOtpCode(n);
                          if(e.target.value&&idx<5){
                            const inputs=e.target.parentElement?.querySelectorAll("input");
                            (inputs?.[idx+1] as HTMLElement)?.focus();
                          }
                        }}
                        className="gl-body flex-1 text-center font-extrabold text-xl rounded-2xl border-2 transition-colors focus:outline-none"
                        style={{ height:52, background:"var(--c-paper)", borderColor:"var(--c-border)", color:"var(--c-ink)" }}/>
                    ))}
                  </div>
                </div>
                <Field label="New Password" icon={Lock}>
                  <input type={showPwd?"text":"password"} required placeholder="Enter new password"
                    className={INPUT+" pr-11"}/>
                  <button type="button" onClick={()=>setShowPwd(!showPwd)}
                    className="absolute right-3.5" style={{ color:"#8892AA" }}>
                    {showPwd?<EyeOff size={15}/>:<Eye size={15}/>}
                  </button>
                </Field>
                <button onClick={()=>setAuthState("login")}
                  className="btn-3d-dark w-full flex items-center justify-center gap-2 py-3.5 text-sm">
                  Verify & Reset Password <ArrowRight size={15}/>
                </button>
                <div className="text-center text-xs gl-body" style={{ color:"#8892AA" }}>
                  {timer>0 ? <span>Resend in <strong style={{color:"var(--c-ink)"}}>{timer}s</strong></span>
                    : <button onClick={()=>setTimer(30)} className="font-bold flex items-center justify-center gap-1 mx-auto" style={{color:"var(--c-p)"}}>
                        <RefreshCw size={12}/> Resend OTP
                      </button>}
                </div>
              </div>
            )}
            <p className="gl-body text-center text-xs" style={{ color:"#8892AA" }}>
              Remember it?{" "}
              <button onClick={()=>setAuthState("login")} className="font-bold" style={{ color:"var(--c-p)" }}>
                Sign in
              </button>
            </p>
          </div>
        </div>
        <button onClick={()=>setAuthState("splash")}
          className="gl-body mt-4 mx-auto flex items-center gap-1.5 text-xs font-semibold"
          style={{ color:"#8892AA" }}>
          <ArrowLeft size={13}/> Back to home
        </button>
      </div>
    </div>
  );
};
