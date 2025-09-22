"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <span className="ml-2">در حال بارگذاری داشبورد...</span>
    </div>
  );
}
