import React from "react";
import {
  useForm,
  FormProvider,
  UseFormProps,
  FieldValues,
} from "react-hook-form";

interface IGenericFormProps<TFormData extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<TFormData>;
}

export default function GenericForm<TFormData extends FieldValues>({
  children,
  formOptions,
}: IGenericFormProps<TFormData>) {
  const methods = useForm<TFormData>(formOptions);

  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
}
