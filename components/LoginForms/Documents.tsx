"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "../ui/Button";

export default function DocumentsForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [savedData, setSavedData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = localStorage.getItem("multiStepFormFile");
    if (data) setSavedData(data);
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={{ file: savedData || "" }}
      validate={(values) => {
        const errors: any = {};
        if (!values.file) errors.file = "آپلود فایل الزامی است";
        return errors;
      }}
      onSubmit={(values) => {
        localStorage.setItem("multiStepFormFile", values.file);
        localStorage.setItem("multiStepFormStep", "2");
        onNext();
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="min-w-md max-w-lg mx-auto p-6 border-1 rounded-lg shadow-md space-y-6">
          <div
            className="w-full h-48 border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer relative overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {!values.file && (
              <span className="text-gray-500">برای آپلود کلیک کنید</span>
            )}
            {values.file && (
              <img
                src={values.file}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                  setFieldValue("file", reader.result);
                  localStorage.setItem(
                    "multiStepFormFile",
                    reader.result as string
                  );
                };
                reader.readAsDataURL(file);
              }}
            />
          </div>

          {errors.file && touched.file && (
            <p className="text-red-500 text-sm">{errors.file}</p>
          )}

          <div className="flex gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              بازگشت
            </Button>
            <Button type="submit" className="flex-1">
              ذخیره و ادامه
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
