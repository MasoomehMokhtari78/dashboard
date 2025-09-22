"use client";
import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useMultiStepForm } from "./Context/FormContext";
import { LucidePlus, LucideTrash } from "lucide-react";

const CustomInput = (props: any) => (
  <Input className="w-full bg-zinc-800 border-zinc-700 h-12" {...props} />
);

export default function UserDataForm() {
  const { data, setFields, nextStep } = useMultiStepForm();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: data.firstName,
        lastName: data.lastName,
        addresses: data.addresses,
      }}
      validate={(values) => {
        const errors: any = {};

        if (!values.firstName) {
          errors.firstName = "نام الزامی است";
        } else if (values.firstName.length < 3) {
          errors.firstName = "نام باید حداقل ۳ کاراکتر باشد";
        } else if (!/^[\u0600-\u06FF\s]+$/.test(values.firstName)) {
          errors.firstName = "نام باید فقط شامل حروف فارسی باشد";
        }

        if (!values.lastName) {
          errors.lastName = "نام خانوادگی الزامی است";
        } else if (values.lastName.length < 3) {
          errors.lastName = "نام خانوادگی باید حداقل ۳ کاراکتر باشد";
        } else if (!/^[\u0600-\u06FF\s]+$/.test(values.lastName)) {
          errors.lastName = "نام خانوادگی باید فقط شامل حروف فارسی باشد";
        }

        if (!values.addresses || !values.addresses.length) {
          errors.addresses = ["حداقل یک آدرس لازم است"];
        } else {
          const addrErrors = values.addresses.map((addr) => {
            if (!addr) return "آدرس الزامی است";
            if (addr.length < 5) return "آدرس باید حداقل ۵ کاراکتر باشد";
            return undefined;
          });
          if (addrErrors.some((e) => e)) errors.addresses = addrErrors;
        }

        return errors;
      }}
      onSubmit={(values) => {
        setFields({
          firstName: values.firstName,
          lastName: values.lastName,
          addresses: values.addresses,
        });
        nextStep();
      }}
    >
      {({ values, errors, touched }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label className="font-bold">نام</label>
            <Field name="firstName">
              {({ field }: any) => <CustomInput {...field} placeholder="نام" />}
            </Field>
            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">نام خانوادگی</label>
            <Field name="lastName">
              {({ field }: any) => (
                <CustomInput {...field} placeholder="نام خانوادگی" />
              )}
            </Field>
            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
            <label className="font-medium">آدرس‌ها</label>
            <FieldArray name="addresses">
              {({ push, remove }) => (
                <div className="flex flex-col gap-3">
                  {values.addresses.map((addr, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <Field name={`addresses.${i}`}>
                          {({ field }: any) => (
                            <CustomInput
                              {...field}
                              placeholder={`آدرس ${i + 1}`}
                            />
                          )}
                        </Field>
                        <Button
                          type="button"
                          variant="outline"
                          className="text-red-800"
                          size="sm"
                          onClick={() => remove(i)}
                        >
                          <LucideTrash />
                        </Button>
                      </div>
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
                    className="flex items-center justify-center"
                    onClick={() => push("")}
                  >
                    <LucidePlus />
                    افزودن آدرس
                  </Button>
                </div>
              )}
            </FieldArray>
          </div>

          <div className="col-span-1 md:col-span-2 mt-6">
            <Button type="submit" className="w-full">
              ثبت و مرحله بعد
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
