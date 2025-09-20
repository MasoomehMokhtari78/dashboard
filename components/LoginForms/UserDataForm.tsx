"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default function UserDataForm({ onNext }: { onNext: () => void }) {
  const [savedData, setSavedData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("multiStepForm");
    if (data) setSavedData(JSON.parse(data));
  }, []);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: savedData?.firstName || "",
        lastName: savedData?.lastName || "",
        addresses: savedData?.addresses || [""],
      }}
      validate={(values) => {
        const errors: any = {};

        if (!values.firstName) errors.firstName = "نام الزامی است";
        else if (values.firstName.length < 3)
          errors.firstName = "نام باید حداقل ۳ کاراکتر باشد";

        if (!values.lastName) errors.lastName = "نام خانوادگی الزامی است";
        else if (values.lastName.length < 3)
          errors.lastName = "نام خانوادگی باید حداقل ۳ کاراکتر باشد";

        if (!values.addresses || !values.addresses.length) {
          errors.addresses = ["حداقل یک آدرس لازم است"];
        } else {
          const addrErrors = values.addresses.map((addr) => {
            if (!addr) return "آدرس الزامی است";
            if (addr.length < 5) return "آدرس باید حداقل ۵ کاراکتر باشد";
            return undefined;
          });
          if (addrErrors.some((e) => e)) {
            errors.addresses = addrErrors;
          }
        }

        return errors;
      }}
      onSubmit={(values) => {
        localStorage.setItem("multiStepForm", JSON.stringify(values));
        onNext();
      }}
    >
      {({ values, errors, touched }) => {
        console.log(errors);
        return (
          <Form className="min-w-md max-w-lg mx-auto p-6 border-1 rounded-lg shadow-md space-y-6">
            <div className="flex flex-col gap-1">
              <label className="font-medium">نام</label>
              <Field name="firstName">
                {({ field }: any) => (
                  <Input {...field} placeholder="نام" className="w-full" />
                )}
              </Field>
              {errors.firstName && touched.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">نام خانوادگی</label>
              <Field name="lastName">
                {({ field }: any) => (
                  <Input
                    {...field}
                    placeholder="نام خانوادگی"
                    className="w-full"
                  />
                )}
              </Field>
              {errors.lastName && touched.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">آدرس‌ها</label>
              <FieldArray name="addresses">
                {({ push, remove }) => (
                  <div className="flex flex-col gap-2">
                    {values.addresses.map((addr, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <Field name={`addresses.${i}`}>
                          {({ field }: any) => (
                            <Input
                              {...field}
                              placeholder={`آدرس ${i + 1}`}
                              className="flex-1"
                            />
                          )}
                        </Field>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(i)}
                        >
                          حذف
                        </Button>
                        {errors.addresses &&
                          errors.addresses[i] &&
                          touched.addresses &&
                          touched.addresses[i] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.addresses[i]}
                            </p>
                          )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => push("")}
                    >
                      افزودن آدرس
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>

            <Button type="submit" className="w-full">
              ثبت
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
