"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const lastSegment = segments[segments.length - 1] || "Dashboard";

  const title =
    lastSegment.charAt(0).toUpperCase() +
    lastSegment.slice(1).replace(/-/g, " ");

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col items-center justify-center p-6 gap-6 h-full min-h-fit">
        <h1 className="text-2xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
}
