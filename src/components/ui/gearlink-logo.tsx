"use client";

import React from "react";
import Image from "next/image";

interface GearLinkLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  textClassName?: string;
  className?: string;
  animated?: boolean;
  darkText?: boolean;
}

export const GearLinkLogo: React.FC<GearLinkLogoProps> = ({
  size = "md",
  showText = true,
  textClassName = "",
  className = "",
  animated = true,
  darkText = false,
}) => {
  const dimensions = {
    sm: { box: "w-7 h-7", icon: 28, text: "text-lg" },
    md: { box: "w-9 h-9", icon: 36, text: "text-xl" },
    lg: { box: "w-11 h-11", icon: 44, text: "text-2xl" },
    xl: { box: "w-14 h-14", icon: 56, text: "text-3xl" },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div
        className={`relative ${dimensions.box} rounded-lg bg-[#243B34] border border-[#E2A33B]/40 shadow-sm flex items-center justify-center overflow-hidden transition-transform duration-300 ${
          animated ? "hover:scale-105" : ""
        }`}
      >
        <Image
          src="/logo.png"
          alt="GearLink Icon"
          width={dimensions.icon}
          height={dimensions.icon}
          className="object-cover rounded-md"
          priority
        />
      </div>

      {showText && (
        <span
          className={`gl-display font-bold tracking-wide ${
            darkText ? "text-[#1B1B18]" : "text-[#F1EDE3]"
          } ${dimensions.text} ${textClassName}`}
        >
          Gear<span className="text-[#E2A33B]">Link</span>
        </span>
      )}
    </div>
  );
};
