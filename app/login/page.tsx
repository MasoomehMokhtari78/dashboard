"use client";
import React, { useState, useEffect } from "react";
import UserDataForm from "@/components/LoginForms/UserDataForm";
import DocumentsForm from "@/components/LoginForms/Documents";

const stepMap = {
  1: "اطلاعات اولیه",
  2: "بارگذاری تصویر",
};

export default function Page() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const savedStep = localStorage.getItem("multiStepFormStep");
    if (savedStep) setStep(Number(savedStep));
  }, []);

  const goToStep = (newStep: number) => {
    setStep(newStep);
    localStorage.setItem("multiStepFormStep", newStep.toString());
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-6">
      <div className="text-lg font-medium">{stepMap[step]}</div>

      {step === 1 && <UserDataForm onNext={() => goToStep(2)} />}
      {step === 2 && (
        <DocumentsForm
          onNext={() => alert("تمام مراحل تکمیل شد")}
          onBack={() => goToStep(1)}
        />
      )}
    </div>
  );
}
