"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./utils";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Waitlist", href: "#waitlist" },
];

export default function Navbar({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const { theme, toggleTheme } = useTheme();
  const [floating, setFloating] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (href: string) => {
    console.log('Nav clicked:', href); // Debug log
    setActive(href);
    const section = document.querySelector(href);
    
    if (section) {
      // Smooth scroll to section
      section.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
      
      // Update URL hash after a short delay
      setTimeout(() => {
        window.history.pushState(null, "", href);
      }, 100);
    } else {
      // If section doesn't exist, just update the hash
      console.warn(`Section ${href} not found`);
      window.history.pushState(null, "", href);
    }
  };

  // Sticky logic
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setFloating(rect.bottom <= 64);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroRef]);

  // ScrollSpy logic
  useEffect(() => {
    const onScroll = () => {
      const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean) as HTMLElement[];
      if (sections.length === 0) return;
      
      const scrollY = window.scrollY + window.innerHeight / 10; // Use middle of viewport
      
      // Find the section that's most in view
      let activeSection = sections[0];
      let minDistance = Math.abs(sections[0].offsetTop - scrollY);
      
      for (const section of sections) {
        const distance = Math.abs(section.offsetTop - scrollY);
        if (distance < minDistance) {
          minDistance = distance;
          activeSection = section;
        }
      }
      
      // Find the corresponding nav link
      const activeLink = navLinks.find(link => document.querySelector(link.href) === activeSection);
      if (activeLink) {
        setActive(activeLink.href);
      }
    };
    
    // Initial check
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-2 left-0 right-0 z-50 px-2"
      style={{ WebkitBackdropFilter: "blur(16px)" }}
    >
      {/* Desktop Navigation */}
      <div
        className={cn(
          "hidden md:flex justify-center items-center py-3 transition-all duration-500 mx-auto max-w-lg px-6",
          "rounded-2xl border shadow-2xl relative overflow-hidden",
          "backdrop-blur-2xl backdrop-saturate-150",
          floating 
            ? "bg-white/30 border-white/20 shadow-xl shadow-black/10" 
            : "bg-white/20 border-white/10 shadow-lg shadow-black/5"
        )}
        ref={containerRef}
        style={{ 
          backdropFilter: "blur(32px) saturate(150%)",
          WebkitBackdropFilter: "blur(32px) saturate(150%)"
        }}
      >
        <div className="flex w-full justify-between items-center relative">
          {/* Subtle glass shine effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
          
          {/* Nav Items */}
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="relative z-20 px-6 py-3 text-base font-medium text-gray-800/90 hover:text-gray-900 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
            >
              {active === link.href && (
                <motion.div
                  layoutId="nav-blob"
                  className="absolute inset-0 bg-white/40 rounded-xl shadow-lg border border-white/30"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
              <span className="relative z-30 drop-shadow-sm pointer-events-none">{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation - Simple overlay */}
      <div className="md:hidden">
        <div className="text-center">
          <button
            className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/90 transition-all duration-200"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
          >
            <span className="text-xl text-gray-800">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl min-w-48"
            >
              <div className="py-2">
                {navLinks.map((link, index) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      setMobileOpen(false);
                      handleNavClick(link.href);
                    }}
                    className={cn(
                      "block w-full text-center px-6 py-3 text-base font-medium text-gray-800 hover:text-gray-900 hover:bg-gray-100/50 transition-colors",
                      index === 0 && "rounded-t-2xl",
                      index === navLinks.length - 1 && "rounded-b-2xl"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}