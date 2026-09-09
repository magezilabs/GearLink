"use client";

import React from "react";
import { UserPlus, Truck, Banknote, LogOut } from "lucide-react";
import { COLORS } from "@/lib/equipment-data";
import { StatTile, PageHeader } from "@/components/ui/gear-primitives";

interface AgentDashboardProps {
  onSignOut?: () => void;
}

export function AgentDashboard({ onSignOut }: AgentDashboardProps) {
  const jobs = [
    {
      eq: "Borehole Drilling Rig DR-200",
      from: "Fort Portal",
      to: "Bundibugyo",
      status: "In transit",
    },
    {
      eq: "Bomag Road Roller BW 120",
      from: "Kasese depot",
      to: "Kilembe road site",
      status: "Pending pickup",
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Youth agent dashboard"
        title="Onboarding & logistics"
        subtitle="Region: Rwenzori · Commission rate: 8%"
        action={
          <button
            onClick={onSignOut}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E2DCD0] bg-white text-sm font-semibold text-[#6B6A62] hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all shadow-sm gl-body"
          >
            <LogOut size={15} /> Sign Out
          </button>
        }
      />

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <StatTile label="Owners onboarded" value="14" icon={UserPlus} />
        <StatTile label="Active logistics jobs" value="3" icon={Truck} />
        <StatTile label="Commission this month" value="UGX 260K" icon={Banknote} />
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {jobs.map((j) => (
          <div
            key={j.eq}
            style={{
              background: COLORS.panel,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 12,
              padding: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div>
                <div className="gl-body font-bold text-sm text-[#1B1B18]">{j.eq}</div>
                <div className="text-xs text-[#6B6A62] mt-0.5">
                  {j.from} → {j.to}
                </div>
              </div>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: j.status === "In transit" ? "#E9F1E1" : "#FBF3E4",
                  color: j.status === "In transit" ? "#3E5E22" : "#8C5A00",
                }}
              >
                {j.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
