"use client";
import { createContext, useContext, useEffect, useState } from "react";

type FormData = {
  step: number;
  firstName: string;
  lastName: string;
  addresses: string[];
  userImage: string | null;
};

type MultiStepFormContextType = {
  data: FormData;
  setField: (key: keyof FormData, value: any) => void;
  setFields: (values: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const defaultData: FormData = {
  step: 1,
  firstName: "",
  lastName: "",
  addresses: [""],
  userImage: null,
};

const MultiStepFormContext = createContext<MultiStepFormContextType>({
  data: defaultData,
  setField: () => {},
  setFields: () => {},
  nextStep: () => {},
  prevStep: () => {},
});

export const MultiStepFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<FormData>(defaultData);

  useEffect(() => {
    const stored = localStorage.getItem("multiStepFormData");
    if (stored) setData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const { firstName, lastName, addresses, userImage } = data;

    const isEmpty =
      !firstName.trim() &&
      !lastName.trim() &&
      addresses.every((a) => !a.trim()) &&
      !userImage;

    if (!isEmpty) {
      localStorage.setItem("multiStepFormData", JSON.stringify(data));
    }
  }, [data]);

  const setField = (key: keyof FormData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const setFields = (values: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...values }));
  };

  const nextStep = () => setData((prev) => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setData((prev) => ({ ...prev, step: prev.step - 1 }));

  return (
    <MultiStepFormContext.Provider
      value={{ data, setField, setFields, nextStep, prevStep }}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
};

export const useMultiStepForm = () => useContext(MultiStepFormContext);
