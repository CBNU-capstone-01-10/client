import { useFormContext, useWatch } from "react-hook-form";
import * as S from "./setup-step.style";
import { ISignupParams } from "../../../types/type";

// STEP-PAGE: 비밀번호 입력
type IFieldValues = Pick<ISignupParams, "password" | "password_confirm">;
interface ISetupPasswordProps {
  onNext: () => void;
  onPrevious: () => void;
}
export default function SetupPassword({
  onNext,
  onPrevious,
}: ISetupPasswordProps) {
  const {
    register,
    formState: { errors, isValid, touchedFields },
  } = useFormContext<IFieldValues>();

  const password = useWatch({ name: "password" });
  const passwordConfirm = useWatch({ name: "password_confirm" });

  return (
    <S.SetupPageWrapper>
      {/* 비밀번호 */}
      <S.Input
        id="password"
        type="password"
        placeholder="비밀번호 (12~36자)"
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          minLength: {
            value: 12,
            message: "비밀번호는 12자리 이상이어야 합니다.",
          },
          maxLength: {
            value: 36,
            message: "비밀번호는 36자리 이하여야 입니다.",
          },
        })}
      />
      {touchedFields.password && errors?.password && (
        <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
      )}
      {/* 비밀번호 확인 */}
      <S.Input
        id="password_confirm"
        type="password"
        placeholder="비밀번호 확인"
        autoComplete="off"
        autoCapitalize="off"
        {...register("password_confirm", {
          required: { value: true, message: "비밀번호를 입력해주세요." },
          validate: {
            notMatched: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          },
        })}
      />
      {touchedFields.password &&
        passwordConfirm &&
        password !== passwordConfirm && (
          <S.ErrorMessage>비밀번호가 일치하지 않습니다.</S.ErrorMessage>
        )}
      <S.BtnWrapper>
        <S.PrevBtn onClick={() => onPrevious()}>이전</S.PrevBtn>
        <S.NextBtn disabled={!isValid} onClick={() => onNext()}>
          다음
        </S.NextBtn>
      </S.BtnWrapper>
    </S.SetupPageWrapper>
  );
}
