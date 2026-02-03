"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Boutique", href: "/shop" },
  { name: "Notre Histoire", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-gold/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
             <div className="relative w-10 h-10 overflow-hidden rounded-full border border-brand-gold group-hover:shadow-md transition-all">
                <Image
                  src="/logo.png"
                  alt="Les trésors de Caroline"
                  fill
                  className="object-cover"
                />
             </div>
             <span className="font-serif text-xl font-bold text-brand-purple tracking-wide hidden sm:block">
               Les Trésors de Caroline
             </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-serif text-brand-purple hover:text-brand-gold transition-colors relative py-1",
                  pathname === link.href && "font-bold"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-brand-gold"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 text-brand-purple">
            <button className="hover:text-brand-gold transition-colors p-2 rounded-full hover:bg-brand-light">
              <Search size={20} />
            </button>
            <Link href="/account" className="hover:text-brand-gold transition-colors p-2 rounded-full hover:bg-brand-light">
              <User size={20} />
            </Link>
            <Link href="/cart" className="hover:text-brand-gold transition-colors p-2 rounded-full hover:bg-brand-light relative">
              <ShoppingBag size={20} />
              {/* Badge simulation */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-gold rounded-full"></span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-bg border-b border-brand-gold/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium font-serif transition-colors",
                    pathname === link.href
                      ? "bg-brand-purple text-white"
                      : "text-brand-purple hover:bg-brand-light"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
