"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("multiStepFormData");
    const data = stored ? JSON.parse(stored) : null;

    if (!data?.step || data.step !== 3) {
      router.replace("/login");
    }
  }, [router]);

  const stored = localStorage.getItem("multiStepFormData");
  const data = stored ? JSON.parse(stored) : null;
  return data?.step === 3;
}
