"use client";
import React from "react";
import UserDataForm from "@/components/LoginForms/UserDataForm";
import DocumentsForm from "@/components/LoginForms/Documents";
import {
  MultiStepFormProvider,
  useMultiStepForm,
} from "@/components/LoginForms/Context/FormContext";
import { Button } from "@/components/ui/Button";

const stepMap = {
  1: "اطلاعات اولیه",
  2: "بارگذاری تصویر",
  3: "فرم با موفقیت تکلمیل شد",
};

function StepRenderer() {
  const { data, nextStep, prevStep } = useMultiStepForm();

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-6">
      <div className="text-lg font-medium">{stepMap[data.step]}</div>
      <div className="min-w-md max-w-lg mx-auto p-6 border-1 rounded-lg shadow-md space-y-6">
        {data.step === 1 && <UserDataForm />}
        {data.step === 2 && <DocumentsForm />}
        {data.step === 3 && (
          <div className="flex flex-col gap-2">
            <Button>ورود به داشبورد</Button>
            <Button variant="outline" onClick={prevStep}>
              بازگشت به مرحله قبل
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <MultiStepFormProvider>
      <StepRenderer />
    </MultiStepFormProvider>
  );
}
