"use client";

import React, { useState } from "react";
import { ArrowLeft, ShieldCheck, MapPin, Truck, Phone, ClipboardList, CheckCircle2, Wallet, Lock, ChevronRight } from "lucide-react";
import { catByName, money, INITIAL_EQUIPMENT } from "@/lib/equipment-data";
import { PageHeader, Stepper, GearButton } from "@/components/ui/gear-primitives";
import { getRoleDashboardPage } from "@/lib/permissions";
import type { EquipmentItem, BookingRequest } from "@/lib/types";

interface Props {
  item: EquipmentItem; setPage:(p:string)=>void; userRole:string;
  onBookingSubmit?: (req:BookingRequest) => void;
}

const PAYMENT_METHODS = [
  { name:"MTN Mobile Money",                   icon:Phone,        sub:"Dial *165# to confirm" },
  { name:"Airtel Money",                        icon:Phone,        sub:"Dial *185# to confirm" },
  { name:"Invoice (Government / Institution)", icon:ClipboardList,sub:"Net-30 institutional billing" },
];

export function BookingPage({ item, setPage, userRole, onBookingSubmit }: Props) {
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [paymentSuccess,  setPaymentSuccess]  = useState(false);
  const [purpose,  setPurpose]  = useState("Ploughing 5 acres of maize farm in Kicwamba");
  const [address,  setAddress]  = useState("Kicwamba Village, Plot 4 Block B, Kabarole");
  const [gps,      setGps]      = useState(true);

  const eq = item ?? INITIAL_EQUIPMENT[0];
  const rentalFee       = eq.price * 3;
  const securityDeposit = Math.round(eq.price * 0.8);
  const serviceFee      = 25000;
  const total           = rentalFee + securityDeposit + serviceFee;
  const heavy = ["Water & Boreholes","Construction & Roads","Transport & Logistics","Government & Public Works"].includes(eq.cat);
  const c = catByName(eq.cat);

  const handlePay = () => {
    const req: BookingRequest = {
      id: `BK-${Date.now()}`,
      equipmentId: eq.id,
      equipmentName: eq.name,
      renterName: "Turyahikayo Grace",
      renterPhone: "+256 772 100 200",
      purpose,
      siteAddress: address,
      totalAmount: total,
      rentalDays: 3,
      submittedAt: new Date().toLocaleString("en-UG", { dateStyle:"medium", timeStyle:"short" }),
      status: "Pending",
    };
    onBookingSubmit?.(req);
    setPaymentSuccess(true);
  };

  /* ── Success ─────────────────────────────────────────────────────────── */
  if (paymentSuccess) return (
    <div className="animate-scale-in max-w-lg mx-auto mt-8">
      <div className="gl-card overflow-hidden">
        <div className="p-10 text-center" style={{ background:"linear-gradient(145deg,#1E2744,#0B0F1E)" }}>
          <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{ background:"rgba(0,200,150,0.20)", border:"2px solid rgba(0,200,150,0.50)" }}>
            <CheckCircle2 size={40} style={{ color:"var(--c-ok)" }}/>
          </div>
          <h2 className="gl-display font-extrabold text-3xl text-white mb-2">Escrow Secured!</h2>
          <p className="gl-body text-sm" style={{ color:"rgba(255,255,255,0.50)" }}>
            Funds locked · Owner notified · Agent assigned
          </p>
        </div>
        <div className="p-7 space-y-4">
          {[["Total Deposited",money(total)],["Rental Fee",money(rentalFee)],
            ["Security Deposit",money(securityDeposit)+" (refundable)"],
            ["Purpose",purpose],["Delivery",address],
            ["Agent","Moses Byaruhanga · Fort Portal Region"]
          ].map(([k,v])=>(
            <div key={k} className="flex gap-3 py-2.5" style={{ borderBottom:"1px solid var(--c-border)" }}>
              <span className="gl-body text-xs w-36 flex-shrink-0" style={{ color:"#8892AA" }}>{k}</span>
              <span className="gl-body text-xs font-semibold" style={{ color:"var(--c-ink)" }}>{v}</span>
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <GearButton variant="dark" style={{ flex:1, justifyContent:"center" }}
              onClick={()=>setPage(getRoleDashboardPage(userRole))}>
              Go to Dashboard
            </GearButton>
            <GearButton variant="outline" style={{ flex:1, justifyContent:"center" }}
              onClick={()=>setPage("marketplace")}>
              Browse More
            </GearButton>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── Checkout ─────────────────────────────────────────────────────────── */
  return (
    <div className="animate-fade-up max-w-5xl mx-auto">
      <button onClick={()=>setPage("detail")}
        className="gl-body inline-flex items-center gap-2 text-sm font-semibold mb-7 transition-colors group"
        style={{ color:"#8892AA" }}>
        <span className="w-8 h-8 rounded-xl border flex items-center justify-center transition-all group-hover:border-orange-400 group-hover:bg-orange-50"
          style={{ background:"#fff", borderColor:"var(--c-border)", boxShadow:"var(--s-xs)" }}>
          <ArrowLeft size={14}/>
        </span>
        Back to Equipment Detail
      </button>

      <PageHeader eyebrow="Booking & Escrow" title="Confirm your booking"
        subtitle="Your payment is held safely in escrow until delivery is verified by a Youth Agent." />

      {/* Stepper */}
      <div className="gl-card px-6 py-4 mb-6 overflow-x-auto"><Stepper current={3}/></div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Left forms */}
        <div className="space-y-5">

          {/* Summary */}
          <div className="gl-card p-5">
            <h3 className="gl-display font-bold text-base mb-4" style={{ color:"var(--c-ink)" }}>Booking Summary</h3>
            <div className="flex gap-4 items-center mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: c.color+"18" }}>
                <c.icon size={26} style={{ color:c.color }}/>
              </div>
              <div>
                <div className="gl-body font-bold text-sm" style={{ color:"var(--c-ink)" }}>{eq.name}</div>
                <div className="text-xs mt-0.5" style={{ color:"#8892AA" }}>{eq.owner} · {eq.loc}</div>
              </div>
            </div>
            <div className="space-y-2 text-sm" style={{ borderTop:"1px solid var(--c-border)", paddingTop:16 }}>
              {[["Rental period","12 – 15 Sep 2026 (3 days)"],
                [`3 days × ${money(eq.price)}`,money(rentalFee)],
                ["Security deposit (escrow)",money(securityDeposit)],
                ["Service & insurance",money(serviceFee)]
              ].map(([k,v])=>(
                <div key={k} className="flex justify-between">
                  <span className="gl-body" style={{ color:"#8892AA" }}>{k}</span>
                  <span className="gl-body font-semibold" style={{ color:"var(--c-ink)" }}>{v}</span>
                </div>
              ))}
              <div className="flex justify-between font-extrabold pt-3" style={{ borderTop:"1px solid var(--c-border)", color:"var(--c-ink)", fontSize:16 }}>
                <span className="gl-body">Total Escrow Deposit</span>
                <span className="gl-display text-lg" style={{ color:"var(--c-p)" }}>{money(total)}</span>
              </div>
            </div>
          </div>

          {/* Purpose */}
          <div className="gl-card p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background:"rgba(255,107,53,0.12)" }}>
                <MapPin size={15} style={{ color:"var(--c-p)" }}/>
              </div>
              <h3 className="gl-display font-bold text-base" style={{ color:"var(--c-ink)" }}>Purpose & Worksite</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="section-label block mb-1.5">Stated Purpose of Rental</label>
                <input type="text" required value={purpose} onChange={e=>setPurpose(e.target.value)}
                  placeholder="e.g. Ploughing 5 acres in Kicwamba village"
                  className="gl-body w-full px-4 py-3 text-sm rounded-2xl border transition-all focus:outline-none"
                  style={{ background:"var(--c-paper)", borderColor:"var(--c-border)", color:"var(--c-ink)" }}/>
                <div className="text-[11px] mt-1 flex items-center gap-1" style={{ color:"#8892AA" }}>
                  <CheckCircle2 size={11} style={{ color:"var(--c-ok)" }}/>
                  Sector matched: <strong style={{ color:"var(--c-ink)" }}>{eq.cat}</strong>
                </div>
              </div>
              <div>
                <label className="section-label block mb-1.5">Worksite / Delivery Address</label>
                <input type="text" required value={address} onChange={e=>setAddress(e.target.value)}
                  placeholder="Physical delivery location"
                  className="gl-body w-full px-4 py-3 text-sm rounded-2xl border transition-all focus:outline-none"
                  style={{ background:"var(--c-paper)", borderColor:"var(--c-border)", color:"var(--c-ink)" }}/>
              </div>
            </div>
          </div>

          {/* Agreements */}
          <div className="gl-card p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background:"rgba(255,184,0,0.12)" }}>
                <ShieldCheck size={15} style={{ color:"var(--c-warn)" }}/>
              </div>
              <h3 className="gl-display font-bold text-base" style={{ color:"var(--c-ink)" }}>Tracking & Agreements</h3>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: gps?"var(--c-p)":"#fff", borderColor: gps?"var(--c-p)":"var(--c-border)" }}
                onClick={()=>setGps(!gps)}>
                {gps && <CheckCircle2 size={13} color="#fff"/>}
              </div>
              <span className="gl-body text-sm leading-relaxed" style={{ color:"#5A6275" }}>
                <strong style={{ color:"var(--c-ink)" }}>GPS Location Sharing:</strong> I agree to GPS tracking during the active rental window for machinery safety and return confirmation.
              </span>
            </label>
            <div className="mt-3 flex items-center gap-2 text-xs px-3 py-2 rounded-xl" style={{ background:"rgba(0,200,150,0.08)", border:"1px solid rgba(0,200,150,0.25)", color:"#1A6B50" }}>
              <CheckCircle2 size={13} style={{ color:"var(--c-ok)", flexShrink:0 }}/>
              Youth Agent hand-off & return condition photo reports enabled.
            </div>
          </div>

          {/* Heavy equipment */}
          {heavy && (
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background:"rgba(255,184,0,0.08)", border:"1px solid rgba(255,184,0,0.25)" }}>
              <Truck size={18} style={{ color:"var(--c-warn)", flexShrink:0, marginTop:1 }}/>
              <div>
                <div className="gl-body font-bold text-sm" style={{ color:"#7A5200" }}>Youth Agent Inspection Required</div>
                <p className="gl-body text-xs mt-0.5 leading-relaxed" style={{ color:"#96620A" }}>
                  Heavy equipment requires on-site Youth Agent verification before escrow funds are released.
                </p>
              </div>
            </div>
          )}

          {/* Payment methods */}
          <div className="gl-card p-5">
            <h3 className="gl-display font-bold text-base mb-4" style={{ color:"var(--c-ink)" }}>Escrow Payment Method</h3>
            <div className="space-y-2.5">
              {PAYMENT_METHODS.map((m,i)=>(
                <button key={m.name} type="button" onClick={()=>setSelectedPayment(i)}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left"
                  style={{
                    borderColor: selectedPayment===i ? "var(--c-p)" : "var(--c-border)",
                    background: selectedPayment===i ? "var(--c-p-bg)" : "#fff",
                  }}>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ borderColor: selectedPayment===i ? "var(--c-p)" : "var(--c-border)" }}>
                    {selectedPayment===i && <div className="w-2.5 h-2.5 rounded-full" style={{ background:"var(--c-p)" }}/>}
                  </div>
                  <m.icon size={17} style={{ color: selectedPayment===i ? "var(--c-p)" : "#8892AA" }}/>
                  <div>
                    <div className="gl-body text-sm font-bold" style={{ color:"var(--c-ink)" }}>{m.name}</div>
                    <div className="text-[11px]" style={{ color:"#8892AA" }}>{m.sub}</div>
                  </div>
                  {selectedPayment===i && <ChevronRight size={14} style={{ color:"var(--c-p)", marginLeft:"auto" }}/>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="sticky top-24 space-y-4">
            {/* Escrow card */}
            <div className="gl-card overflow-hidden">
              <div className="p-5" style={{ background:"linear-gradient(145deg,#1E2744,#0B0F1E)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background:"rgba(255,107,53,0.20)" }}>
                    <Lock size={18} style={{ color:"var(--c-p)" }}/>
                  </div>
                  <div>
                    <div className="gl-display font-bold text-base text-white">2-Way Escrow</div>
                    <div className="text-xs" style={{ color:"rgba(255,255,255,0.40)" }}>GearLink Protected</div>
                  </div>
                </div>
                <p className="gl-body text-xs leading-relaxed mb-4" style={{ color:"rgba(255,255,255,0.55)" }}>
                  Your <strong style={{ color:"var(--c-p)" }}>{money(securityDeposit)}</strong> deposit & rental fee are locked. Rental fee releases on delivery; deposit refunds on confirmed return.
                </p>
                {["Owner receives rental fee on delivery","Deposit refunded on confirmed return","Agent verified hand-off & condition report"].map(t=>(
                  <div key={t} className="flex items-center gap-2 text-[11.5px] mb-1.5" style={{ color:"rgba(255,255,255,0.50)" }}>
                    <CheckCircle2 size={13} style={{ color:"var(--c-ok)", flexShrink:0 }}/> {t}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="gl-card p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="gl-body text-sm" style={{ color:"#8892AA" }}>Total to escrow</span>
                <span className="gl-display font-extrabold text-2xl" style={{ color:"var(--c-ink)" }}>{money(total)}</span>
              </div>
              <GearButton variant="primary" icon={Wallet}
                style={{ width:"100%", justifyContent:"center", padding:"14px 20px", fontSize:15, borderRadius:16 }}
                onClick={handlePay}>
                Pay {money(total)} into Escrow
              </GearButton>
              <p className="gl-body text-[11px] text-center" style={{ color:"#8892AA" }}>
                By continuing you agree to GearLink's Rental Terms & Escrow Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
