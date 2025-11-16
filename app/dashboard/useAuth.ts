"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("multiStepFormData");
    const data = stored ? JSON.parse(stored) : null;

    if (!data?.step || data.step !== 3) {
      setAllowed(false);
      router.replace("/login");
    } else {
      setAllowed(true);
    }
  }, [router]);

  return allowed;
}
