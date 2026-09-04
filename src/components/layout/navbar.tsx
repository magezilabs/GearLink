"use client";

import React, { useState } from "react";
import { GearLinkLogo } from "@/components/ui/gearlink-logo";

interface NavbarProps {
  onOpenListGearModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenListGearModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0D1914]/90 border-b border-[#1A2E26] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo featuring the uploaded gear & link icon */}
        <a href="/" className="group flex items-center gap-3">
          <GearLinkLogo size="md" animated={true} />
        </a>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search tractors, excavators, drones, cinema cameras..."
              className="w-full bg-[#14231D] border border-[#273F35] focus:border-[#E5A23C] rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E5A23C]/30 transition-all"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Desktop Nav Links & Actions */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#marketplace" className="hover:text-[#E5A23C] transition-colors">
            Marketplace
          </a>
          <a href="#how-it-works" className="hover:text-[#E5A23C] transition-colors">
            How It Works
          </a>
          <a href="#governance" className="hover:text-[#E5A23C] transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E5A23C] animate-pulse"></span>
            Trust & Protection
          </a>
        </div>

        <div className="flex items-center gap-3">
          {/* List Your Gear Button */}
          <button
            onClick={onOpenListGearModal}
            className="flex items-center gap-2 bg-[#1A2E26] hover:bg-[#254035] border border-[#E5A23C]/40 text-[#E5A23C] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-[#E5A23C]/10 cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-[#E5A23C]/20 text-[#E5A23C] flex items-center justify-center text-base font-bold">
              +
            </span>
            <span>List Gear</span>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 border-l border-[#273F35] pl-3 ml-1">
            <div className="w-9 h-9 rounded-full bg-[#E5A23C] text-[#0D1914] font-bold flex items-center justify-center text-sm shadow-md border border-[#E5A23C]">
              AW
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1914] border-t border-[#1A2E26] px-4 py-4 space-y-3">
          <input
            type="text"
            placeholder="Search equipment..."
            className="w-full bg-[#14231D] border border-[#273F35] rounded-xl py-2 px-4 text-sm text-white placeholder-slate-400"
          />
          <nav className="flex flex-col space-y-2 pt-2 text-sm text-slate-300">
            <a href="#marketplace" className="py-2 hover:text-[#E5A23C]">Marketplace</a>
            <a href="#how-it-works" className="py-2 hover:text-[#E5A23C]">How It Works</a>
            <a href="#governance" className="py-2 hover:text-[#E5A23C]">Trust & Governance</a>
          </nav>
        </div>
      )}
    </header>
  );
};
