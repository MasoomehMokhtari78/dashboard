"use client";

import React, { ReactNode, useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "./useAuth";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/transactions", label: "Transactions" },
  { href: "/dashboard/users", label: "Users" },
  { href: "/dashboard/reports", label: "System Reports" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const lastSegment = segments[segments.length - 1] || "Dashboard";
  const title =
    lastSegment.charAt(0).toUpperCase() +
    lastSegment.slice(1).replace(/-/g, " ");
  const allowed = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!allowed) return null;

  const hamburgerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center relative">
        <div className="flex gap-2 items-end">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
          <h1 className="text-2xl font-bold">Panel</h1>
        </div>

        <nav className="hidden md:flex gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1 justify-center items-center w-10 h-10 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            className="block w-6 h-0.5 bg-black dark:bg-white rounded"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-6 h-0.5 bg-black dark:bg-white rounded"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            className="block w-6 h-0.5 bg-black dark:bg-white rounded"
          />
        </button>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 right-0 z-50 p-4 flex flex-col gap-2 
           bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-lg"
          >
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col gap-2 items-start">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-start p-6 gap-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {children}
      </main>
    </div>
  );
}
