"use client";

import React from "react";
import { ShieldCheck, Clock, CheckCircle2, FileText, AlertTriangle, LogOut } from "lucide-react";
import { COLORS } from "@/lib/equipment-data";
import { StatTile, PageHeader } from "@/components/ui/gear-primitives";

interface GovernanceDashboardProps {
  onSignOut?: () => void;
}

export function GovernanceDashboard({ onSignOut }: GovernanceDashboardProps) {
  const inspections = [
    {
      id: "INS-001",
      equipment: "District Grader CAT 120",
      owner: "Kabarole District Works Dept",
      date: "8 Sep 2026",
      status: "Compliant",
    },
    {
      id: "INS-002",
      equipment: "Borehole Drilling Rig DR-200",
      owner: "Kasese Water Works Ltd",
      date: "6 Sep 2026",
      status: "Compliant",
    },
    {
      id: "INS-003",
      equipment: "Bomag Road Roller BW 120",
      owner: "Turyahikayo Grace",
      date: "4 Sep 2026",
      status: "Pending",
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Governance Officer dashboard"
        title="Equipment & Inspection Audit"
        subtitle="Rwenzori Region Inspection Log"
      />

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <StatTile label="Total Inspections" value="48" icon={ShieldCheck} />
        <StatTile
          label="Pending Verification"
          value="3"
          icon={Clock}
          accent={COLORS.signalDark}
        />
        <StatTile label="Compliant Fleet" value="98.2%" icon={CheckCircle2} />
      </div>

      {/* Inspection Log Table */}
      <div
        style={{
          background: COLORS.panel,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 18px",
            borderBottom: `1px solid ${COLORS.line}`,
          }}
        >
          <span className="gl-display font-bold text-base text-[#1B1B18]">
            Recent Inspections
          </span>
          <button className="text-xs font-semibold text-[#B97F22] hover:underline flex items-center gap-1">
            <FileText size={13} /> Export Report
          </button>
        </div>

        {inspections.map((ins, i) => (
          <div
            key={ins.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 18px",
              borderTop: i ? `1px solid ${COLORS.line}` : "none",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: ins.status === "Compliant" ? "#E9F1E1" : "#FBF3E4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {ins.status === "Compliant" ? (
                  <CheckCircle2 size={16} color="#3E5E22" />
                ) : (
                  <AlertTriangle size={16} color="#8C5A00" />
                )}
              </div>
              <div>
                <div className="gl-body font-bold text-sm text-[#1B1B18]">
                  {ins.equipment}
                </div>
                <div className="text-xs text-[#6B6A62]">
                  {ins.owner} · {ins.date}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="text-xs font-mono text-[#6B6A62]">{ins.id}</span>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: ins.status === "Compliant" ? "#E9F1E1" : "#FBF3E4",
                  color: ins.status === "Compliant" ? "#3E5E22" : "#8C5A00",
                }}
              >
                {ins.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
