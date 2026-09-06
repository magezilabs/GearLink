"use client";

import React, { useState, useEffect } from "react";
import {
  HardHat,
  Sprout,
  Users,
  Landmark,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  RefreshCw,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { GearLinkLogo } from "@/components/ui/gearlink-logo";

interface AuthViewProps {
  initialState?: "splash" | "login" | "register" | "forgot";
  onLoginSuccess: (userData: { name: string; role: string; phone: string; location: string }) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialState = "splash",
  onLoginSuccess,
}) => {
  const [authState, setAuthState] = useState<"splash" | "login" | "register" | "forgot">(initialState);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");

  // Splash Loading Progress
  const [splashProgress, setSplashProgress] = useState(0);

  // Form Fields
  const [phone, setPhone] = useState("+256 772 100 200");
  const [email, setEmail] = useState("james@sekajigo.co.ug");
  const [password, setPassword] = useState("••••••••");
  const [fullName, setFullName] = useState("Sekajigo James");
  const [location, setLocation] = useState("Fort Portal, Kabarole");
  const [selectedRole, setSelectedRole] = useState<"owner" | "renter" | "agent" | "gov">("owner");

  // OTP Verification
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  // 1 & 3. Renter Identity, NIN & Guarantor Verification Fields
  const [ninNumber, setNinNumber] = useState("CM98012345678A");
  const [villageLC1, setVillageLC1] = useState("Kicwamba Village, LC1 Zone 3");
  const [idFrontUploaded, setIdFrontUploaded] = useState(true);
  const [idBackUploaded, setIdBackUploaded] = useState(true);
  const [selfieVerified, setSelfieVerified] = useState(true);
  const [nextOfKinName, setNextOfKinName] = useState("Kembabazi Florence");
  const [nextOfKinPhone, setNextOfKinPhone] = useState("+256 774 333 444");
  const [lc1Name, setLc1Name] = useState("Chairman Mwesigwa Paul");
  const [lc1Phone, setLc1Phone] = useState("+256 782 999 888");

  // Splash screen auto timer
  useEffect(() => {
    if (authState === "splash") {
      const interval = setInterval(() => {
        setSplashProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [authState]);

  // OTP Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: fullName || "Sekajigo James",
      role: selectedRole,
      phone: phone || "+256 772 100 200",
      location: location || "Fort Portal, Kabarole",
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: fullName,
      role: selectedRole,
      phone,
      location,
    });
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
    setTimer(30);
  };

  const roles = [
    {
      key: "owner",
      title: "Equipment Owner",
      desc: "List your tractor, generator, truck or machinery and earn from idle time.",
      icon: HardHat,
    },
    {
      key: "renter",
      title: "Renter",
      desc: "Farmers, contractors and event planners who need equipment for a job.",
      icon: Sprout,
    },
    {
      key: "agent",
      title: "Youth Agent",
      desc: "Onboard offline owners in your region and coordinate logistics for commission.",
      icon: Users,
    },
    {
      key: "gov",
      title: "Governance Officer",
      desc: "Agricultural officers, engineers and community leaders overseeing listings.",
      icon: Landmark,
    },
  ];

  /* ---------------- 1. SPLASH SCREEN ---------------- */
  if (authState === "splash") {
    return (
      <div className="min-h-screen bg-[#243B34] text-[#F1EDE3] flex flex-col items-center justify-between p-8 relative overflow-hidden select-none">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E2A33B]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header info */}
        <div className="w-full max-w-md flex justify-between items-center text-xs font-medium text-[#9AAAA3]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E2A33B] animate-pulse" />
            Uganda Platform Active
          </span>
          <span>v1.0 MVP</span>
        </div>

        {/* Center Brand Identity */}
        <div className="flex flex-col items-center text-center my-auto space-y-6 max-w-md">
          {/* Logo with uploaded gear icon */}
          <div className="relative group cursor-pointer" onClick={() => setAuthState("login")}>
            <div className="p-4 bg-[#1E322C] border-2 border-[#E2A33B]/60 rounded-3xl shadow-2xl shadow-[#13211D]">
              <GearLinkLogo size="xl" showText={false} animated={true} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#E2A33B] text-[#3A2A0D] text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
              Official
            </div>
          </div>

          <div>
            <h1 className="gl-display text-4xl font-extrabold tracking-wide text-white">
              Gear<span className="text-[#E2A33B]">Link</span>
            </h1>
            <p className="gl-body text-sm text-[#9AAAA3] mt-2 leading-relaxed">
              Uganda's Rural & Commercial Equipment Sharing & Escrow Governance Network
            </p>
          </div>

          {/* Loading Progress Bar */}
          <div className="w-full bg-[#1E322C] h-2 rounded-full overflow-hidden border border-[#E2A33B]/20">
            <div
              className="bg-[#E2A33B] h-full transition-all duration-300 ease-out"
              style={{ width: `${splashProgress}%` }}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-[#9AAAA3]">
            <ShieldCheck size={14} className="text-[#E2A33B]" />
            <span>Secured with Escrow & Mobile Money Integration</span>
          </div>

          {/* Splash Actions */}
          <div className="pt-4 w-full space-y-3">
            <button
              onClick={() => setAuthState("login")}
              className="w-full bg-[#E2A33B] hover:bg-[#b97f22] text-[#3A2A0D] font-extrabold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setAuthState("register")}
              className="w-full bg-transparent hover:bg-white/5 border border-[#F1EDE3]/20 text-[#F1EDE3] font-semibold py-3 px-6 rounded-xl text-sm transition-all cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[#9AAAA3]">
          Powered by GearLink Uganda Ltd · Fort Portal, Kasese & Kampala
        </div>
      </div>
    );
  }

  /* ---------------- 2. LOGIN PAGE ---------------- */
  if (authState === "login") {
    return (
      <div className="min-h-screen bg-[#F1EDE3] text-[#1B1B18] flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white border border-[#DAD4C4] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <GearLinkLogo size="md" showText={true} darkText={true} />
            <button
              onClick={() => setAuthState("splash")}
              className="text-xs text-[#6B6A62] hover:text-[#1B1B18] flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </button>
          </div>

          <h2 className="gl-display text-2xl font-bold text-[#1B1B18]">Welcome Back</h2>
          <p className="gl-body text-xs text-[#6B6A62] mt-1 mb-6">
            Log in to manage equipment rentals, check bookings, or access escrow payments.
          </p>

          {/* Login Method Toggle Tabs */}
          <div className="flex bg-[#F1EDE3] p-1 rounded-xl mb-5 border border-[#DAD4C4]">
            <button
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                loginMethod === "phone"
                  ? "bg-[#243B34] text-white shadow-sm"
                  : "text-[#6B6A62] hover:text-[#1B1B18]"
              }`}
            >
              <Smartphone size={14} /> Mobile Money Phone
            </button>
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                loginMethod === "email"
                  ? "bg-[#243B34] text-white shadow-sm"
                  : "text-[#6B6A62] hover:text-[#1B1B18]"
              }`}
            >
              <Mail size={14} /> Email Address
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {loginMethod === "phone" ? (
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                  Mobile Money Phone Number (Uganda)
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6A62]" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+256 772 000 000"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-xl focus:outline-none focus:border-[#243B34]"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6A62]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.co.ug"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-xl focus:outline-none focus:border-[#243B34]"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-[#6B6A62]">Password</label>
                <button
                  type="button"
                  onClick={() => setAuthState("forgot")}
                  className="text-xs font-semibold text-[#B97F22] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6A62]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-xl focus:outline-none focus:border-[#243B34]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E2A33B] hover:bg-[#b97f22] text-[#3A2A0D] font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer mt-2"
            >
              Sign In to GearLink
            </button>
          </form>

          {/* Quick Demo Login Shortcuts */}
          <div className="mt-6 pt-5 border-t border-[#DAD4C4]">
            <p className="text-[11px] font-semibold text-[#6B6A62] text-center mb-2.5">
              QUICK DEMO ACCESSS (ONE-CLICK LOGIN):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("owner");
                  setFullName("Sekajigo James (Owner)");
                  onLoginSuccess({ name: "Sekajigo James", role: "owner", phone, location });
                }}
                className="text-xs p-2 bg-[#F1EDE3] border border-[#DAD4C4] rounded-lg hover:border-[#243B34] font-medium text-left flex items-center gap-1.5 cursor-pointer"
              >
                <HardHat size={14} className="text-[#C6821F]" />
                <span>Owner Portal</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("renter");
                  setFullName("Turyahikayo Grace (Renter)");
                  onLoginSuccess({ name: "Turyahikayo Grace", role: "renter", phone, location });
                }}
                className="text-xs p-2 bg-[#F1EDE3] border border-[#DAD4C4] rounded-lg hover:border-[#243B34] font-medium text-left flex items-center gap-1.5 cursor-pointer"
              >
                <Sprout size={14} className="text-[#5C7A32]" />
                <span>Renter Portal</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("agent");
                  setFullName("Byaruhanga Moses (Agent)");
                  onLoginSuccess({ name: "Byaruhanga Moses", role: "agent", phone, location });
                }}
                className="text-xs p-2 bg-[#F1EDE3] border border-[#DAD4C4] rounded-lg hover:border-[#243B34] font-medium text-left flex items-center gap-1.5 cursor-pointer"
              >
                <Users size={14} className="text-[#2A6E85]" />
                <span>Youth Agent</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("gov");
                  setFullName("District Engineer (Gov)");
                  onLoginSuccess({ name: "District Governance", role: "gov", phone, location });
                }}
                className="text-xs p-2 bg-[#F1EDE3] border border-[#DAD4C4] rounded-lg hover:border-[#243B34] font-medium text-left flex items-center gap-1.5 cursor-pointer"
              >
                <Landmark size={14} className="text-[#4D5087]" />
                <span>Governance</span>
              </button>
            </div>
          </div>

          {/* Footer Register Link */}
          <div className="mt-6 text-center text-xs text-[#6B6A62]">
            Don't have a GearLink account yet?{" "}
            <button
              onClick={() => setAuthState("register")}
              className="font-bold text-[#243B34] hover:underline cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- 3. REGISTER & ROLE SELECTION ---------------- */
  if (authState === "register") {
    return (
      <div className="min-h-screen bg-[#F1EDE3] text-[#1B1B18] flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white border border-[#DAD4C4] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <GearLinkLogo size="md" showText={true} darkText={true} />
            <button
              onClick={() => setAuthState("login")}
              className="text-xs text-[#6B6A62] hover:text-[#1B1B18] flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Login
            </button>
          </div>

          <h2 className="gl-display text-2xl font-bold text-[#1B1B18]">Join GearLink</h2>
          <p className="gl-body text-xs text-[#6B6A62] mt-1 mb-5">
            Select your primary role. Note: A single account can own, rent, or manage logistics!
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Role Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {roles.map((r) => {
                const active = selectedRole === r.key;
                const Icon = r.icon;
                return (
                  <div
                    key={r.key}
                    onClick={() => setSelectedRole(r.key as any)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      active
                        ? "border-[#E2A33B] bg-[#F1EDE3]/70 ring-2 ring-[#E2A33B]/40 shadow-sm"
                        : "border-[#DAD4C4] bg-white hover:border-[#243B34]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#243B34] flex items-center justify-center text-white">
                        <Icon size={16} />
                      </div>
                      {active && <CheckCircle2 size={16} className="text-[#E2A33B]" />}
                    </div>
                    <div className="gl-display font-bold text-sm text-[#1B1B18]">{r.title}</div>
                    <div className="text-[11px] text-[#6B6A62] leading-tight mt-1">{r.desc}</div>
                  </div>
                );
              })}
            </div>

            {/* Registration Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Byaruhanga Moses"
                  className="w-full px-3 py-2 text-sm bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-xl focus:outline-none focus:border-[#243B34]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                  Mobile Money Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+256 772 000 000"
                  className="w-full px-3 py-2 text-sm bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-xl focus:outline-none focus:border-[#243B34]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="moses@gearlink.ug"
                  className="w-full px-3 py-2 text-sm bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-xl focus:outline-none focus:border-[#243B34]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                  Location / District
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Fort Portal, Kabarole"
                  className="w-full px-3 py-2 text-sm bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-xl focus:outline-none focus:border-[#243B34]"
                />
              </div>
            </div>

            {/* Renter Trust Verification Section (Only shown when selectedRole === 'renter') */}
            {selectedRole === "renter" && (
              <div className="p-4 bg-[#F1EDE3]/70 border border-[#E2A33B]/40 rounded-2xl space-y-3.5 my-3">
                <div className="flex items-center justify-between border-b border-[#DAD4C4] pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#3A2A0D]">
                    <ShieldCheck size={16} className="text-[#B97F22]" />
                    <span>1. Renter Identity & Social Accountability Verification</span>
                  </div>
                  <span className="text-[10px] bg-[#E2A33B] text-[#3A2A0D] px-2 py-0.5 rounded-full font-bold">
                    Escrow Stake Protection
                  </span>
                </div>

                {/* NIN & Village LC1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                      National ID Number (NIN)
                    </label>
                    <input
                      type="text"
                      required
                      value={ninNumber}
                      onChange={(e) => setNinNumber(e.target.value)}
                      placeholder="e.g. CM98012345678A"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#DAD4C4] rounded-xl focus:outline-none focus:border-[#243B34] font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                      Village / LC1 Location
                    </label>
                    <input
                      type="text"
                      required
                      value={villageLC1}
                      onChange={(e) => setVillageLC1(e.target.value)}
                      placeholder="e.g. Kicwamba Village, LC1 Zone 3"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#DAD4C4] rounded-xl focus:outline-none focus:border-[#243B34]"
                    />
                  </div>
                </div>

                {/* ID Photo Uploads & Selfie Simulation */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="p-2 bg-white border border-[#DAD4C4] rounded-xl text-center">
                    <div className="text-[10px] font-bold text-[#6B6A62] mb-1">National ID Front</div>
                    <span className="text-xs font-semibold text-[#5C7A32] flex items-center justify-center gap-1">
                      <CheckCircle2 size={12} /> Front Uploaded
                    </span>
                  </div>
                  <div className="p-2 bg-white border border-[#DAD4C4] rounded-xl text-center">
                    <div className="text-[10px] font-bold text-[#6B6A62] mb-1">National ID Back</div>
                    <span className="text-xs font-semibold text-[#5C7A32] flex items-center justify-center gap-1">
                      <CheckCircle2 size={12} /> Back Uploaded
                    </span>
                  </div>
                  <div className="p-2 bg-white border border-[#DAD4C4] rounded-xl text-center">
                    <div className="text-[10px] font-bold text-[#6B6A62] mb-1">Selfie Match</div>
                    <span className="text-xs font-semibold text-[#5C7A32] flex items-center justify-center gap-1">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  </div>
                </div>

                {/* Next of Kin & LC1 Reference */}
                <div className="border-t border-[#DAD4C4] pt-2">
                  <div className="text-[11px] font-bold text-[#243B34] mb-2 flex items-center gap-1.5">
                    <Users size={13} />
                    <span>3. Social Accountability & Guarantor Contact</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B6A62] block mb-0.5">
                        Next of Kin / Guarantor Name & Phone
                      </label>
                      <input
                        type="text"
                        required
                        value={nextOfKinName + " (" + nextOfKinPhone + ")"}
                        onChange={(e) => setNextOfKinName(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#DAD4C4] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B6A62] block mb-0.5">
                        LC1 Chairperson Reference
                      </label>
                      <input
                        type="text"
                        required
                        value={lc1Name + " (" + lc1Phone + ")"}
                        onChange={(e) => setLc1Name(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#DAD4C4] rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-[#6B6A62] block mb-1">Create Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-xl focus:outline-none focus:border-[#243B34]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#243B34] hover:bg-[#1E322C] text-[#F1EDE3] font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer mt-3"
            >
              Complete Registration & Enter GearLink
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-[#6B6A62]">
            Already registered?{" "}
            <button
              onClick={() => setAuthState("login")}
              className="font-bold text-[#243B34] hover:underline cursor-pointer"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- 4. FORGOT PASSWORD / OTP ---------------- */
  return (
    <div className="min-h-screen bg-[#F1EDE3] text-[#1B1B18] flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white border border-[#DAD4C4] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <GearLinkLogo size="md" showText={true} darkText={true} />
          <button
            onClick={() => setAuthState("login")}
            className="text-xs text-[#6B6A62] hover:text-[#1B1B18] flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        <h2 className="gl-display text-2xl font-bold text-[#1B1B18]">Reset Password</h2>
        <p className="gl-body text-xs text-[#6B6A62] mt-1 mb-6">
          {!otpSent
            ? "Enter your registered phone number to receive an SMS OTP code."
            : `We sent a 6-digit SMS verification code to ${phone}.`}
        </p>

        {!otpSent ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#6B6A62] block mb-1">
                Phone Number (Mobile Money)
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6A62]" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+256 772 000 000"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F1EDE3]/50 border border-[#DAD4C4] rounded-xl focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#E2A33B] hover:bg-[#b97f22] text-[#3A2A0D] font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              Send SMS Verification Code
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-[#6B6A62] block mb-2 text-center">
                Enter 6-digit OTP Code
              </label>
              <div className="flex justify-between gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={otpCode[idx]}
                    onChange={(e) => {
                      const next = [...otpCode];
                      next[idx] = e.target.value;
                      setOtpCode(next);
                    }}
                    className="w-11 h-12 text-center font-extrabold text-lg border border-[#DAD4C4] rounded-xl bg-[#F1EDE3]/50 focus:border-[#243B34] focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B6A62] block mb-1">New Password</label>
              <input
                type="password"
                required
                placeholder="Enter new password"
                className="w-full px-3 py-2.5 text-sm border border-[#DAD4C4] rounded-xl bg-[#F1EDE3]/50"
              />
            </div>

            <button
              onClick={() => {
                setAuthState("login");
              }}
              className="w-full bg-[#243B34] hover:bg-[#1E322C] text-[#F1EDE3] font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              Verify OTP & Reset Password
            </button>

            <div className="text-center text-xs text-[#6B6A62] pt-2">
              {timer > 0 ? (
                <span>Resend OTP code in {timer}s</span>
              ) : (
                <button
                  onClick={() => setTimer(30)}
                  className="text-[#B97F22] font-bold hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <RefreshCw size={12} /> Resend OTP Code
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
