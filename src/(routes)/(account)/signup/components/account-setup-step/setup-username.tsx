import { useFormContext } from "react-hook-form";
import * as S from "./setup-step.style";
import { ISignupParams } from "../../../types/type";

// STEP-PAGE: 이름 입력
type IFieldValues = Pick<ISignupParams, "username">;
interface ISetupUsernameProps {
  onNext: () => void;
}
export default function SetupUsername({ onNext }: ISetupUsernameProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<IFieldValues>();

  // HANDLER
  const onSubmit = (data: IFieldValues) => {
    if (data.username) {
      onNext();
    }
  };

  return (
    <S.SetupPageWrapper>
      <S.InputContainer>
        <S.Input
          type="text"
          placeholder="이름을 입력하세요"
          required
          {...register("username", {
            required: "이름을 입력하세요",
            maxLength: { value: 12, message: "이름은 12자 이내여야 합니다" },
          })}
        />
        {errors.username && (
          <S.ErrorMessage>{errors.username.message}</S.ErrorMessage>
        )}
      </S.InputContainer>
      <S.NextBtn disabled={!isValid} onClick={handleSubmit(onSubmit)}>
        다음
      </S.NextBtn>
    </S.SetupPageWrapper>
  );
}
