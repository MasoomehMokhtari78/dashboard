"use client";

import React, { ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation";
import Image from "next/image";

const titleMap: Record<string, string> = {
  Dashboard: "Transactions",
  Transactions: "Transactions",
  Users: "Users",
  Reports: "System Reports",
};

export default function Layout({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const lastSegment = segments[segments.length - 1] || "Dashboard";

  const title =
    lastSegment.charAt(0).toUpperCase() +
    lastSegment.slice(1).replace(/-/g, " ");

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between">
        <div className="flex gap-2 items-end">
          <Image src="/vercel.svg" height={40} width={40} alt="logo" />{" "}
          <h1 className="text-2xl font-bold">Panel</h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard/transactions">Transactions</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard/users">Users</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard/reports">System Reports</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start p-6 gap-6">
        <h1 className="text-2xl font-bold">{titleMap[title] || "داشبورد"}</h1>
        {children}
      </main>
    </div>
  );
}
