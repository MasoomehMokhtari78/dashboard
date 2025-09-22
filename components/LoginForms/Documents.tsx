"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "../ui/Button";
import { useMultiStepForm } from "./Context/FormContext";

export default function DocumentsForm() {
  const { data, setField, nextStep, prevStep } = useMultiStepForm();

  return (
    <Formik
      enableReinitialize
      initialValues={{ userImage: data.userImage || "" }}
      validate={(values) => {
        const errors: { userImage?: string } = {};
        if (!values.userImage) errors.userImage = "آپلود فایل الزامی است";
        return errors;
      }}
      onSubmit={(values) => {
        setField("userImage", values.userImage);
        nextStep();
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="flex flex-col gap-4">
          <Field name="userImage">
            {() => (
              <div
                className="w-full h-40 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer relative"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                {!values.userImage && (
                  <span>کلیک کنید و تصویر را انتخاب کنید</span>
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setFieldValue("userImage", reader.result);
                    reader.readAsDataURL(file);
                  }}
                />

                {values.userImage && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={values.userImage}
                    alt="Preview"
                    className="absolute top-0 left-0 w-full h-full object-cover rounded"
                  />
                )}
              </div>
            )}
          </Field>
          {errors.userImage && touched.userImage && (
            <p className="text-red-500 text-sm">{errors.userImage}</p>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex-1"
            >
              مرحله قبل
            </Button>
            <Button type="submit" className="flex-1">
              ثبت و ادامه
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
