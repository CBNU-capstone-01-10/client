// COMPONENT: 회원가입 주소 입력 단계
import { useFormContext } from "react-hook-form";
import * as S from "./setup-step.style";
import { ISignupParams } from "../../../types/type";

type IFieldValues = Pick<ISignupParams, "address">;
interface ISetupAddressProps {
  onPrevious: () => void;
  onNext: () => void;
}
export default function SetupAddress({
  onPrevious,
  onNext,
}: ISetupAddressProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<IFieldValues>();

  // HANDLER
  const onSubmit = (data: IFieldValues) => {
    if (data.address) {
      onNext();
    }
  };

  return (
    <S.SetupPageWrapper>
      <S.InputContainer>
        <S.Input
          type="text"
          placeholder="주소를 입력하세요"
          required
          {...register("address", {
            required: { value: true, message: "주소를 입력하세요." },
          })}
        />
        {errors.address && (
          <S.ErrorMessage>{errors.address.message}</S.ErrorMessage>
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
