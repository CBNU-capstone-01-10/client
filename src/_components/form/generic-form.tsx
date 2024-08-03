import React from "react";
import {
  useForm,
  FormProvider,
  UseFormProps,
  FieldValues,
} from "react-hook-form";
import * as S from "./generic-form.style";

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
      <S.FormContainer>{children}</S.FormContainer>
    </FormProvider>
  );
}
