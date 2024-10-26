// COMPONENT: 회원가입 별명 입력 단계
import { useFormContext } from "react-hook-form";
import * as S from "./setup-step.style";
import { ISignupParams } from "../../../types/type";

type IFieldValues = Pick<ISignupParams, "alias">;
interface ISetupAliasProps {
  onPrevious: () => void;
  onNext: () => void;
}
export default function SetupAlias({ onPrevious, onNext }: ISetupAliasProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<IFieldValues>();

  // HANDLER
  const onSubmit = (data: IFieldValues) => {
    if (data.alias) {
      onNext();
    }
  };

  return (
    <S.SetupPageWrapper>
      <S.InputContainer>
        <S.Input
          type="text"
          placeholder="별명을 입력하세요"
          required
          {...register("alias", {
            required: { value: true, message: "별명을 입력하세요." },
            // maxLength: { value: 12, message: "별명은 12자 이내여야 합니다" },
          })}
        />
        {errors.alias && (
          <S.ErrorMessage>{errors.alias.message}</S.ErrorMessage>
        )}
      </S.InputContainer>
      <S.BtnWrapper>
        <S.PrevBtn onClick={() => onPrevious()}>이전</S.PrevBtn>
        <S.NextBtn disabled={!isValid} onClick={handleSubmit(onSubmit)}>
          다음
        </S.NextBtn>
      </S.BtnWrapper>
    </S.SetupPageWrapper>
  );
}
