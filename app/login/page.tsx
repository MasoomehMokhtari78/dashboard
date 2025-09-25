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
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const stepMap: Record<number, { label: string; desc: string }> = {
  1: {
    label: "Basic Information",
    desc: "Welcome! Please complete the following information to access the dashboard.",
  },
  2: {
    label: "Upload Profile Image",
    desc: "Please upload your profile picture in the box below.",
  },
  3: {
    label: "Form Completed Successfully",
    desc: "Dear user, your information has been successfully submitted.",
  },
};

function StepRenderer() {
  const { data, prevStep } = useMultiStepForm();

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <div className="w-full h-full md:w-[50%] flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-1 items-center justify-center gap-6 p-6 min-w-sm max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={data.step + "-header"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1 w-full"
            >
              <p className="text-xl font-bold">{stepMap[data.step]?.label}</p>
              <p className="opacity-70 text-sm">{stepMap[data.step]?.desc}</p>
            </motion.div>
          </AnimatePresence>
          <div className="w-full">
            <AnimatePresence mode="wait">
              {data.step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <UserDataForm />
                </motion.div>
              )}

              {data.step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <DocumentsForm />
                </motion.div>
              )}

              {data.step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2"
                >
                  <Link href="/dashboard" className="w-full">
                    <Button className="w-full">Go to Dashboard</Button>
                  </Link>
                  <Button variant="outline" onClick={prevStep}>
                    Back to Previous Step
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
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
