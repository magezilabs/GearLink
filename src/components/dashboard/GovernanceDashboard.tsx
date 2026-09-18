"use client";

import React from "react";
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, FileText, LogOut, Filter } from "lucide-react";
import { StatTile, PageHeader } from "@/components/ui/gear-primitives";

interface Props { onSignOut?: () => void; }

const INSPECTIONS = [
  { id:"INS-001", equipment:"District Grader CAT 120",    owner:"Kabarole District Works Dept", date:"8 Sep 2026", status:"Compliant" },
  { id:"INS-002", equipment:"Borehole Drilling Rig DR-200",owner:"Kasese Water Works Ltd",      date:"6 Sep 2026", status:"Compliant" },
  { id:"INS-003", equipment:"Bomag Road Roller BW 120",   owner:"Turyahikayo Grace",            date:"4 Sep 2026", status:"Pending"   },
  { id:"INS-004", equipment:"John Deere 5075E Tractor",   owner:"Byaruhanga Moses",             date:"2 Sep 2026", status:"Compliant" },
  { id:"INS-005", equipment:"30kVA Diesel Generator",     owner:"Asiimwe Deo",                  date:"1 Sep 2026", status:"Flagged"   },
];

export function GovernanceDashboard({ onSignOut }: Props) {
  return (
    <div className="animate-fade-up">
      <PageHeader eyebrow="Governance Dashboard" title="Equipment & Inspection Audit" subtitle="Rwenzori Region Inspection Log · September 2026"
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
        <StatTile label="Total Inspections" value="48" icon={ShieldCheck} accent="var(--c-v)"/>
        <StatTile label="Pending Verification" value="3" icon={Clock} accent="var(--c-warn)"/>
        <StatTile label="Compliant Fleet" value="98.2%" icon={CheckCircle2} accent="var(--c-ok)" trend="+2.1%"/>
        <StatTile label="Flagged Items" value="1" icon={AlertTriangle} accent="var(--c-err)"/>
      </div>

      {/* Inspection table */}
      <div className="gl-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom:"1px solid var(--c-border)", background:"var(--c-paper)" }}>
          <h2 className="gl-display font-bold text-lg" style={{ color:"var(--c-ink)" }}>Recent Inspections</h2>
          <div className="flex items-center gap-2">
            <button className="gl-body flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background:"#fff", border:"1px solid var(--c-border)", color:"#8892AA" }}>
              <Filter size={13}/> Filter
            </button>
            <button className="gl-body flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background:"var(--c-p-bg)", border:"1px solid rgba(255,107,53,0.25)", color:"var(--c-p)" }}>
              <FileText size={13}/> Export
            </button>
          </div>
        </div>

        {INSPECTIONS.map((ins,i)=>{
          const isCompliant = ins.status==="Compliant";
          const isPending   = ins.status==="Pending";
          const isFlagged   = ins.status==="Flagged";
          const statusColor = isCompliant ? "var(--c-ok)" : isPending ? "var(--c-warn)" : "var(--c-err)";
          const statusBg    = isCompliant ? "rgba(0,200,150,0.10)" : isPending ? "rgba(255,184,0,0.10)" : "rgba(255,77,106,0.08)";
          const Icon        = isCompliant ? CheckCircle2 : isPending ? Clock : AlertTriangle;
          return (
            <div key={ins.id} className="flex items-center justify-between px-6 py-4 transition-colors"
              style={{ borderTop: i?"1px solid var(--c-border)":"none" }}
              onMouseEnter={el=>(el.currentTarget.style.background="var(--c-paper)")}
              onMouseLeave={el=>(el.currentTarget.style.background="")}>
              <div className="flex items-center gap-3.5 flex-1">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background:statusBg }}>
                  <Icon size={18} style={{ color:statusColor }}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="gl-body font-bold text-sm" style={{ color:"var(--c-ink)" }}>{ins.equipment}</div>
                  <div className="text-xs mt-0.5 truncate" style={{ color:"#8892AA" }}>{ins.owner} · {ins.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs font-mono" style={{ color:"#8892AA" }}>{ins.id}</span>
                <span className="gl-body text-[11.5px] font-bold px-3 py-1 rounded-full"
                  style={{ background:statusBg, color:statusColor, border:`1px solid ${statusColor}30` }}>
                  {ins.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
