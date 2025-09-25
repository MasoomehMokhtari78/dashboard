"use client";
import React from "react";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  FieldProps,
  FormikErrors,
} from "formik";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useMultiStepForm } from "./Context/FormContext";
import { LucidePlus, LucideTrash } from "lucide-react";

interface FormValues {
  firstName: string;
  lastName: string;
  addresses: string[];
}

const CustomInput = (props: React.ComponentProps<typeof Input>) => (
  <Input className="w-full bg-zinc-800 border-zinc-700 h-12" {...props} />
);

export default function UserDataForm() {
  const { data, setFields, nextStep } = useMultiStepForm();

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        firstName: data.firstName,
        lastName: data.lastName,
        addresses: data.addresses,
      }}
      validate={(values) => {
        const errors: FormikErrors<FormValues> = {};

        if (!values.firstName) {
          errors.firstName = "First name is required";
        } else if (values.firstName.length < 3) {
          errors.firstName = "First name must be at least 3 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(values.firstName)) {
          errors.firstName = "First name must only contain English letters";
        }

        if (!values.lastName) {
          errors.lastName = "Last name is required";
        } else if (values.lastName.length < 3) {
          errors.lastName = "Last name must be at least 3 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(values.lastName)) {
          errors.lastName = "Last name must only contain English letters";
        }

        if (!values.addresses || values.addresses.length === 0) {
          errors.addresses = "At least one address is required";
        } else {
          const addrErrors = values.addresses.map((addr) => {
            if (!addr) return "Address is required";
            if (addr.length < 5) return "Address must be at least 5 characters";
            return undefined;
          });
          const filteredErrors = addrErrors.filter((e) => e !== undefined);

          if (filteredErrors.length > 0) {
            errors.addresses = filteredErrors as string[];
          }
        }

        return errors;
      }}
      onSubmit={(values) => {
        setFields(values);
        nextStep();
      }}
    >
      {({ values, errors, touched }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label className="font-bold">First Name</label>
            <Field name="firstName">
              {({ field }: FieldProps<string>) => (
                <CustomInput {...field} placeholder="First Name" />
              )}
            </Field>
            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Last Name</label>
            <Field name="lastName">
              {({ field }: FieldProps<string>) => (
                <CustomInput {...field} placeholder="Last Name" />
              )}
            </Field>
            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
            <label className="font-medium">Addresses</label>
            <FieldArray name="addresses">
              {({ push, remove }) => (
                <div className="flex flex-col gap-3">
                  {typeof errors.addresses === "string" && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.addresses}
                    </p>
                  )}
                  {values.addresses.map((_, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <Field name={`addresses.${i}`}>
                          {({ field }: FieldProps<string>) => (
                            <CustomInput
                              {...field}
                              placeholder={`Address ${i + 1}`}
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
                        Array.isArray(errors.addresses) &&
                        touched.addresses &&
                        Array.isArray(touched.addresses) &&
                        touched.addresses[i] &&
                        errors.addresses[i] && (
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
                    Add Address
                  </Button>
                </div>
              )}
            </FieldArray>
          </div>

          <div className="col-span-1 md:col-span-2 mt-6">
            <Button type="submit" className="w-full">
              Save & Next Step
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
