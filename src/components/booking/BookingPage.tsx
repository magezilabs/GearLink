"use client";

import React, { useState } from "react";
import {
  ShieldCheck, MapPin, Truck, Phone, ClipboardList,
  CheckCircle2, Wallet, ArrowLeft, ChevronRight, Lock,
} from "lucide-react";
import { COLORS, catByName, money, INITIAL_EQUIPMENT } from "@/lib/equipment-data";
import { PageHeader, Stepper, GearButton } from "@/components/ui/gear-primitives";
import { getRoleDashboardPage } from "@/lib/permissions";
import type { EquipmentItem } from "@/lib/types";

interface BookingPageProps {
  item: EquipmentItem;
  setPage: (p: string) => void;
  userRole: string;
}

const PAYMENT_METHODS = [
  { name: "MTN Mobile Money",                   icon: Phone,        sub: "Dial *165# to confirm" },
  { name: "Airtel Money",                        icon: Phone,        sub: "Dial *185# to confirm" },
  { name: "Invoice (Government / Institution)", icon: ClipboardList, sub: "Net-30 institutional billing" },
];

export function BookingPage({ item, setPage, userRole }: BookingPageProps) {
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [paymentSuccess, setPaymentSuccess]   = useState(false);
  const [rentalPurpose, setRentalPurpose]      = useState("Ploughing 5 acres of maize farm in Kicwamba");
  const [siteAddress, setSiteAddress]          = useState("Kicwamba Village, Plot 4 Block B, Kabarole");
  const [gpsConsent, setGpsConsent]            = useState(true);

  const eq = item ?? INITIAL_EQUIPMENT[0];
  const rentalFee      = eq.price * 3;
  const securityDeposit = Math.round(eq.price * 0.8);
  const serviceFee     = 25000;
  const total          = rentalFee + securityDeposit + serviceFee;
  const heavy          = ["Water & Boreholes","Construction & Roads","Transport & Logistics","Government & Public Works"].includes(eq.cat);
  const c              = catByName(eq.cat);

  /* ── Success screen ────────────────────────────────────────────────────── */
  if (paymentSuccess) {
    return (
      <div className="animate-scale-in max-w-lg mx-auto mt-8">
        <div className="bg-white rounded-3xl border border-[#E2DCD0] shadow-xl overflow-hidden">
          <div className="bg-[#1A3029] px-8 py-10 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>
            <h2 className="gl-display font-extrabold text-3xl text-white mb-2">
              Escrow Secured!
            </h2>
            <p className="gl-body text-sm text-white/60 leading-relaxed">
              Your rental has been confirmed and funds are safely locked in escrow.
            </p>
          </div>

          <div className="p-8 space-y-4">
            <div className="space-y-3 text-sm">
              {[
                ["Total Deposited",   money(total)],
                ["Rental Fee",        money(rentalFee)],
                ["Security Deposit",  money(securityDeposit) + " (refundable)"],
                ["Stated Purpose",    rentalPurpose],
                ["Delivery Address",  siteAddress],
                ["Agent Assigned",    "Moses Byaruhanga · Fort Portal Region"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 py-2.5 border-b border-[#F0EDE4] last:border-0">
                  <span className="gl-body text-[#9B9A93] w-36 flex-shrink-0">{k}</span>
                  <span className="gl-body font-semibold text-[#1B1B18] flex-1">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <GearButton
                variant="dark"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => setPage(getRoleDashboardPage(userRole))}
              >
                Go to Dashboard
              </GearButton>
              <GearButton
                variant="outline"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => setPage("marketplace")}
              >
                Back to Market
              </GearButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Checkout form ─────────────────────────────────────────────────────── */
  return (
    <div className="animate-fade-up max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => setPage("detail")}
        className="gl-body inline-flex items-center gap-2 text-sm font-semibold text-[#6B6A62] hover:text-[#1B1B18] mb-6 transition-colors group"
      >
        <span className="w-7 h-7 rounded-lg border border-[#E2DCD0] bg-white flex items-center justify-center group-hover:border-[#1A3029] transition-colors shadow-sm">
          <ArrowLeft size={14} />
        </span>
        Back to Equipment Detail
      </button>

      <PageHeader
        eyebrow="Booking & Escrow"
        title="Confirm your booking"
        subtitle="Your deposit is held safely in escrow until the equipment is delivered and verified."
      />

      {/* Stepper */}
      <div className="bg-white rounded-2xl border border-[#E2DCD0] px-6 py-4 mb-6 shadow-sm overflow-hidden">
        <Stepper current={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* ── Left: forms ──────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Equipment summary */}
          <div className="bg-white rounded-2xl border border-[#E2DCD0] p-5 shadow-sm">
            <h3 className="gl-display font-bold text-base text-[#1B1B18] mb-4">Booking Summary</h3>
            <div className="flex gap-4 items-center mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: c.color + "18" }}
              >
                <c.icon size={26} color={c.color} />
              </div>
              <div>
                <div className="gl-body font-bold text-sm text-[#1B1B18]">{eq.name}</div>
                <div className="text-xs text-[#9B9A93] mt-0.5">{eq.owner} · {eq.loc}</div>
              </div>
            </div>
            <div className="space-y-2 text-sm border-t border-[#F0EDE4] pt-4">
              {[
                ["Rental period",             "12 – 15 Sep 2026 (3 days)"],
                [`3 days × ${money(eq.price)}`, money(rentalFee)],
                ["Security deposit (escrow)", money(securityDeposit)],
                ["Service & insurance fee",   money(serviceFee)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="gl-body text-[#6B6A62]">{k}</span>
                  <span className="gl-body font-semibold text-[#1B1B18]">{v}</span>
                </div>
              ))}
              <div className="flex justify-between font-extrabold text-[15px] pt-3 border-t border-[#F0EDE4]">
                <span className="gl-body text-[#1B1B18]">Total Escrow Deposit</span>
                <span className="gl-display text-[#1A3029]">{money(total)}</span>
              </div>
            </div>
          </div>

          {/* Purpose & logistics */}
          <div className="bg-white rounded-2xl border border-[#E2DCD0] p-5 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#C6821F]/12 flex items-center justify-center">
                <MapPin size={15} className="text-[#C6821F]" />
              </div>
              <h3 className="gl-display font-bold text-base text-[#1B1B18]">
                Purpose & Worksite Logistics
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="gl-body text-xs font-bold text-[#6B6A62] uppercase tracking-wide block mb-1.5">
                  Stated Purpose of Rental
                </label>
                <input
                  type="text"
                  required
                  value={rentalPurpose}
                  onChange={(e) => setRentalPurpose(e.target.value)}
                  placeholder="e.g. Ploughing 5 acres in Kicwamba village"
                  className="gl-body w-full px-4 py-2.5 text-sm bg-[#F7F4EF] border border-[#E2DCD0] rounded-xl text-[#1B1B18]"
                />
                <div className="text-[11px] text-[#9B9A93] mt-1 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-500" />
                  Sector matched: <strong className="text-[#1A3029]">{eq.cat}</strong>
                </div>
              </div>
              <div>
                <label className="gl-body text-xs font-bold text-[#6B6A62] uppercase tracking-wide block mb-1.5">
                  Worksite / Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  placeholder="Physical location where equipment will be used"
                  className="gl-body w-full px-4 py-2.5 text-sm bg-[#F7F4EF] border border-[#E2DCD0] rounded-xl text-[#1B1B18]"
                />
              </div>
            </div>
          </div>

          {/* Agreements */}
          <div className="bg-white rounded-2xl border border-[#E2DCD0] p-5 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#E2A33B]/12 flex items-center justify-center">
                <ShieldCheck size={15} className="text-[#D48E1D]" />
              </div>
              <h3 className="gl-display font-bold text-base text-[#1B1B18]">
                Tracking & Inspection Agreements
              </h3>
            </div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${gpsConsent ? "bg-[#1A3029] border-[#1A3029]" : "border-[#D5CEC3] bg-white"}`}
                onClick={() => setGpsConsent(!gpsConsent)}
              >
                {gpsConsent && <CheckCircle2 size={13} className="text-white" />}
              </div>
              <span className="gl-body text-sm text-[#4A4A44] leading-relaxed">
                <strong className="text-[#1B1B18]">GPS Location Sharing:</strong> I agree to GPS
                tracking during the active rental window for machinery safety and return confirmation.
              </span>
            </label>
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
              Youth Agent physical hand-off & return condition photo reports are enabled by default.
            </div>
          </div>

          {/* Heavy equipment notice */}
          {heavy && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <Truck size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="gl-body font-bold text-sm text-amber-900">
                  Youth Agent Inspection Required
                </div>
                <p className="gl-body text-xs text-amber-700 mt-0.5 leading-relaxed">
                  This heavy equipment category requires an on-site Youth Agent to verify delivery
                  and handoff condition before escrow funds are released.
                </p>
              </div>
            </div>
          )}

          {/* Payment method */}
          <div className="bg-white rounded-2xl border border-[#E2DCD0] p-5 shadow-sm">
            <h3 className="gl-display font-bold text-base text-[#1B1B18] mb-4">
              Escrow Payment Method
            </h3>
            <div className="space-y-2.5">
              {PAYMENT_METHODS.map((m, i) => (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setSelectedPayment(i)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedPayment === i
                      ? "border-[#1A3029] bg-[#F0EDE4]"
                      : "border-[#E2DCD0] bg-white hover:border-[#B0A898]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedPayment === i ? "border-[#1A3029]" : "border-[#D5CEC3]"}`}>
                    {selectedPayment === i && <div className="w-2.5 h-2.5 rounded-full bg-[#1A3029]" />}
                  </div>
                  <m.icon size={17} className={selectedPayment === i ? "text-[#1A3029]" : "text-[#9B9A93]"} />
                  <div>
                    <div className={`gl-body text-sm font-bold ${selectedPayment === i ? "text-[#1B1B18]" : "text-[#4A4A44]"}`}>
                      {m.name}
                    </div>
                    <div className="text-[11px] text-[#9B9A93] mt-0.5">{m.sub}</div>
                  </div>
                  {selectedPayment === i && <ChevronRight size={14} className="text-[#1A3029] ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Summary + CTA ─────────────────────────────────────── */}
        <div>
          <div className="sticky top-24 space-y-4">
            {/* Escrow trust card */}
            <div className="bg-[#1A3029] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Lock size={18} className="text-amber-400" />
                </div>
                <div>
                  <div className="gl-display font-bold text-base">2-Way Escrow</div>
                  <div className="text-xs text-white/50">GearLink Protected</div>
                </div>
              </div>
              <p className="gl-body text-xs text-white/70 leading-relaxed mb-4">
                Your <strong className="text-amber-400">{money(securityDeposit)}</strong> security
                deposit and rental fee are locked in escrow. The rental fee releases to the owner
                on delivery; your deposit refunds on confirmed return.
              </p>
              <div className="space-y-2">
                {["Owner receives rental fee on delivery", "Deposit refunded on return", "Agent verified hand-off & condition"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-[11.5px] text-white/60">
                    <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Total + Pay CTA */}
            <div className="bg-white rounded-2xl border border-[#E2DCD0] p-5 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <span className="gl-body text-sm text-[#6B6A62]">Total to escrow</span>
                <span className="gl-display font-extrabold text-2xl text-[#1B1B18]">
                  {money(total)}
                </span>
              </div>
              <GearButton
                variant="primary"
                icon={Wallet}
                style={{ width: "100%", justifyContent: "center", padding: "14px 20px", fontSize: 15, borderRadius: 14 }}
                onClick={() => setPaymentSuccess(true)}
              >
                Pay {money(total)} into Escrow
              </GearButton>
              <p className="gl-body text-[11px] text-[#9B9A93] text-center leading-relaxed">
                By continuing you agree to GearLink's Rental Terms & Escrow Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
