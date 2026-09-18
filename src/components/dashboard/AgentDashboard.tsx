"use client";

import React from "react";
import { UserPlus, Truck, Banknote, LogOut, MapPin } from "lucide-react";
import { StatTile, PageHeader } from "@/components/ui/gear-primitives";

interface Props { onSignOut?: () => void; }

export function AgentDashboard({ onSignOut }: Props) {
  const jobs = [
    { eq:"Borehole Drilling Rig DR-200", from:"Fort Portal", to:"Bundibugyo",      status:"In transit",    commission:42000  },
    { eq:"Bomag Road Roller BW 120",     from:"Kasese depot",to:"Kilembe road site",status:"Pending pickup",commission:25600 },
    { eq:"John Deere 5075E Tractor",     from:"Kabarole",    to:"Kicwamba Village", status:"Delivered",     commission:14400 },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader eyebrow="Youth Agent Dashboard" title="Onboarding & Logistics" subtitle="Region: Rwenzori · Commission rate: 8%"
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
        <StatTile label="Owners Onboarded" value="14" icon={UserPlus} accent="var(--c-p)"/>
        <StatTile label="Active Jobs" value="3" icon={Truck} accent="var(--c-a)"/>
        <StatTile label="Commission This Month" value="UGX 260K" icon={Banknote} accent="var(--c-ok)"/>
      </div>

      <div className="space-y-4 stagger">
        {jobs.map(j=>{
          const statusColor = j.status==="Delivered" ? "var(--c-ok)" : j.status==="In transit" ? "var(--c-a)" : "var(--c-warn)";
          const statusBg = j.status==="Delivered" ? "rgba(0,200,150,0.10)" : j.status==="In transit" ? "rgba(0,212,255,0.10)" : "rgba(255,184,0,0.10)";
          return (
            <div key={j.eq} className="gl-card p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background:"var(--c-a-bg)" }}>
                  <Truck size={20} style={{ color:"var(--c-a)" }}/>
                </div>
                <div>
                  <div className="gl-body font-bold text-sm" style={{ color:"var(--c-ink)" }}>{j.eq}</div>
                  <div className="flex items-center gap-1.5 text-xs mt-1" style={{ color:"#8892AA" }}>
                    <MapPin size={11} style={{ color:"var(--c-p)" }}/>
                    {j.from}
                    <span>→</span>
                    {j.to}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="gl-display font-extrabold text-sm" style={{ color:"var(--c-ok)" }}>
                  +{(j.commission).toLocaleString()} UGX
                </span>
                <span className="gl-body text-[11.5px] font-bold px-3 py-1 rounded-full"
                  style={{ background:statusBg, color:statusColor, border:`1px solid ${statusColor}30` }}>
                  {j.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
