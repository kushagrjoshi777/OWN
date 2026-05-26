"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from "@/components/ui/resizable-navbar";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Our Story", link: "/our-story" },
    { name: "Ingredients", link: "/ingredients" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <ResizableNavbar className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Desktop Navigation */}
      <NavBody className="bg-[#1E1B4B]/70 border border-white/10 text-white dark:bg-[#1E1B4B]/80 py-3 px-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="relative z-50 mr-4 flex items-center space-x-2 px-2 py-1 text-2xl font-serif font-bold tracking-[0.15em] transition-opacity hover:opacity-80"
          style={{ color: "#8EA7E9" }}
        >
          OWN
        </Link>

        {/* Desktop Links */}
        <NavItems
          items={navItems.map((item) => ({
            name: item.name.toUpperCase(),
            link: item.link,
          }))}
          className="text-white space-x-4 tracking-widest text-[11px] font-sans font-medium"
        />

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button
            className="text-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ color: "rgba(255, 242, 242, 0.85)" }}
            aria-label="Cart"
          >
            🛍️
          </button>
          <NavbarButton
            href="/contact"
            variant="primary"
            className="text-xs bg-[#8EA7E9] text-[#1E1B4B] hover:bg-[#E5E0FF] transition-all rounded-full py-1.5 px-4 font-bold border-none"
          >
            Get in touch
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="bg-[#1E1B4B]/85 border border-white/10 px-4 py-3 text-white">
        <MobileNavHeader>
          <Link
            href="/"
            className="relative z-50 flex items-center space-x-2 text-2xl font-serif font-bold tracking-[0.15em] transition-opacity hover:opacity-80"
            style={{ color: "#8EA7E9" }}
          >
            OWN
          </Link>
          <div className="flex items-center gap-4">
            <button
              className="text-lg transition-colors"
              style={{ color: "rgba(255,242,242,0.85)" }}
              aria-label="Cart"
            >
              🛍️
            </button>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          className="bg-[#1E1B4B]/95 border border-white/10 text-white py-6 flex flex-col items-center gap-6"
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-serif tracking-widest text-[#FFF2F2] hover:text-[#8EA7E9] transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex w-full flex-col gap-3 px-4 mt-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              href="/contact"
              variant="primary"
              className="w-full bg-[#8EA7E9] text-[#1E1B4B] rounded-full py-2.5"
            >
              Get in touch
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
