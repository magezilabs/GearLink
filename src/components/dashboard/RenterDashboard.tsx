"use client";

import React from "react";
import { Clock, PackageCheck, Wallet, LogOut } from "lucide-react";
import { COLORS, INITIAL_EQUIPMENT, catByName } from "@/lib/equipment-data";
import { StatTile, PageHeader, Stepper } from "@/components/ui/gear-primitives";

interface RenterDashboardProps {
  onSignOut?: () => void;
}

export function RenterDashboard({ onSignOut }: RenterDashboardProps) {
  const bookings = [
    { eq: "Bomag Road Roller BW 120", stage: 5, dates: "5–7 Sep" },
    { eq: "Event Tent & Chairs, 200-seat", stage: 8, dates: "22 Aug" },
    { eq: "30kVA Diesel Generator", stage: 2, dates: "1–2 Sep" },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Renter dashboard"
        title="Your bookings"
        subtitle="Turyahikayo Grace · Kasese"
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
        <StatTile label="Active bookings" value="2" icon={Clock} />
        <StatTile label="Completed" value="9" icon={PackageCheck} />
        <StatTile label="Total spent" value="UGX 3.1M" icon={Wallet} />
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {bookings.map((b) => {
          const eq = INITIAL_EQUIPMENT.find((e) => e.name === b.eq) ?? INITIAL_EQUIPMENT[0];
          const c = catByName(eq.cat);
          return (
            <div
              key={b.eq}
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
                  alignItems: "flex-start",
                  marginBottom: 10,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      background: c.color + "22",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <c.icon size={17} color={c.color} />
                  </div>
                  <div>
                    <div className="gl-body" style={{ fontWeight: 700, fontSize: 14 }}>
                      {b.eq}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>{b.dates}</div>
                  </div>
                </div>
              </div>
              <Stepper current={b.stage} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
