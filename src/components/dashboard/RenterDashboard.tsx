"use client";

import React from "react";
import { Clock, PackageCheck, Wallet, LogOut, ShoppingBag } from "lucide-react";
import { INITIAL_EQUIPMENT, catByName, money } from "@/lib/equipment-data";
import { StatTile, PageHeader, Stepper } from "@/components/ui/gear-primitives";

interface Props { onSignOut?: () => void; }

export function RenterDashboard({ onSignOut }: Props) {
  const bookings = [
    { eq:"Bomag Road Roller BW 120",     stage:5, dates:"5–7 Sep 2026",  total:960000  },
    { eq:"Event Tent & Chairs, 200-seat",stage:8, dates:"22 Aug 2026",   total:400000  },
    { eq:"30kVA Diesel Generator",       stage:2, dates:"1–2 Sep 2026",  total:325000  },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader eyebrow="Renter Dashboard" title="Your Bookings" subtitle="Turyahikayo Grace · Kasese"
        action={
          <button onClick={onSignOut}
            className="gl-body flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border text-sm font-semibold transition-all"
            style={{ background:"#fff", borderColor:"var(--c-border)", color:"#8892AA" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="#FF4D6A";(e.currentTarget as HTMLElement).style.color="#FF4D6A";(e.currentTarget as HTMLElement).style.background="rgba(255,77,106,0.06)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--c-border)";(e.currentTarget as HTMLElement).style.color="#8892AA";(e.currentTarget as HTMLElement).style.background="#fff";}}>
            <LogOut size={15}/> Sign Out
          </button>
        }/>

      <div className="flex gap-4 mb-7 flex-wrap stagger">
        <StatTile label="Active Bookings" value="2" icon={Clock}/>
        <StatTile label="Completed" value="9" icon={PackageCheck} accent="var(--c-ok)"/>
        <StatTile label="Total Spent" value="UGX 3.1M" icon={Wallet} accent="var(--c-a)"/>
      </div>

      <div className="space-y-4 stagger">
        {bookings.map(b=>{
          const eq = INITIAL_EQUIPMENT.find(e=>e.name===b.eq) ?? INITIAL_EQUIPMENT[0];
          const c = catByName(eq.cat);
          return (
            <div key={b.eq} className="gl-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom:"1px solid var(--c-border)", background:"var(--c-paper)" }}>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background:c.color+"18" }}>
                    <c.icon size={20} style={{ color:c.color }}/>
                  </div>
                  <div>
                    <div className="gl-body font-bold text-sm" style={{ color:"var(--c-ink)" }}>{b.eq}</div>
                    <div className="text-xs mt-0.5" style={{ color:"#8892AA" }}>{b.dates}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="gl-display font-extrabold text-base" style={{ color:"var(--c-p)" }}>{money(b.total)}</div>
                  <div className="text-[11px]" style={{ color:"#8892AA" }}>escrowed</div>
                </div>
              </div>
              <div className="px-5 py-4 overflow-x-auto">
                <Stepper current={b.stage}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
