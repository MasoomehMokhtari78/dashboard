"use client";
import React from "react";
import UserDataForm from "@/components/LoginForms/UserDataForm";
import DocumentsForm from "@/components/LoginForms/Documents";
import {
  MultiStepFormProvider,
  useMultiStepForm,
} from "@/components/LoginForms/Context/FormContext";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const stepMap = {
  1: {
    label: "اطلاعات اولیه",
    desc: "خوش آمدید! لطفا برای ورود به داشبورد اطلاعات زیر را تکمیل کنید.",
  },
  2: {
    label: "بارگذاری تصویر",
    desc: "لطفا تصویر پروفایل خود را در باکس زیر آپلود کنید.",
  },
  3: {
    label: "فرم با موفقیت تکلمیل شد",
    desc: "کاربر گرامی، اطلاعات شما با موفیت ثبت شد.",
  },
};

function StepRenderer() {
  const { data, prevStep } = useMultiStepForm();
  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <div className="w-full h-full md:w-[50%] flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-1 items-center justify-center gap-6 p-6 min-w-sm max-w-md mx-auto">
          <div className="w-full flex flex-col gap-2">
            <p className="text-xl font-bold">{stepMap[data.step]?.label}</p>
            <p className="opacity-70 text-sm">{stepMap[data.step]?.desc}</p>
          </div>
          <div className="w-full">
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
      </div>
      <div className="hidden md:flex md:flex-1 bg-blue-500 items-center justify-center text-white p-8">
        <div className="text-center">
          <Image
            src="login-img.svg"
            alt="Login Image"
            width={500}
            height={500}
          />
        </div>
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
