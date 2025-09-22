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

const titleMap = {
  Dashboard: "تراکنش ها",
  Transactions: "تراکنش ها",
  Users: "کاربران",
  Reports: "گزارشات سیستمی",
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
        <Image src="/vercel.svg" height={40} width={40} alt="logo" />
        <NavigationMenu>
          <NavigationMenuList className="flex-row-reverse">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard">داشبورد</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard/transactions">تراکنش ها</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard/users">کاربران</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard/reports">گزارشات</Link>
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
