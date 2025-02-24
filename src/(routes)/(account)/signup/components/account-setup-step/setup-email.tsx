// COMPONENT: 회원가입 이메일 입력 단계
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  useConfirmVerificationToken,
  useRegisterEmail,
} from "../../../../../api/account";
import {
  ISignupParams,
  IUnverifiedAccountData,
  IVerificationParams,
} from "../../../types/type";
import { useNavigate } from "react-router";
import * as S from "./setup-step.style";

type TFieldValues = ISignupParams &
  Pick<IVerificationParams, "verificationToken">;
interface ISetupEmailProps {
  onPrevious: () => void;
}
export default function SetupEmail({ onPrevious }: ISetupEmailProps) {
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const [successMessage, setSuccessMessage] = useState("");

  // POST: 임시 등록 (이메일 인증 전)
  const {
    data: responseData,
    mutate: registerAccount,
    isSuccess: isRegisteredSuccess,
    error: registerError,
    isPending: isRegisterPending,
  } = useRegisterEmail();
  // HANDLER: 이메일 인증 요청
  const handleRegisterAccount = () => {
    const { username, email, password, alias, address } = getValues();
    const unverifiedAccountData: IUnverifiedAccountData = {
      username,
      email,
      password,
      alias,
      address,
    };
    registerAccount(unverifiedAccountData);
  };
  // 이메일 코드 전송 처리
  useEffect(() => {
    if (isRegisteredSuccess) {
      clearErrors();
      const { data } = responseData;
      setUserId(data.id.toString());
      setSuccessMessage("인증코드가 이메일로 전송되었습니다.");
    }
    if (registerError) {
      setSuccessMessage("");
      setError("email", {
        type: "manual",
        message: registerError.response?.data.message,
      });
    }
  }, [isRegisteredSuccess, registerError, responseData, setError, clearErrors]);

  // POST: 인증토큰 확인 (회원가입 완료)
  const {
    mutate: confirmVerificationToken,
    isSuccess: isConfirmedSuccess,
    error: confirmedError,
  } = useConfirmVerificationToken();
  // HANDLER
  const handleConfirmVerificationToken = () => {
    const verificationToken = getValues("verificationToken");
    const verificationData: IVerificationParams = { userId, verificationToken };
    confirmVerificationToken(verificationData);
  };
  // 이메일 인증 처리
  useEffect(() => {
    if (isConfirmedSuccess) {
      setSuccessMessage("이메일 인증에 성공했습니다.");
      setTimeout(() => navigate("/"), 2000);
    }
    if (confirmedError) {
      setError("verificationToken", {
        type: "manual",
        message: confirmedError.response?.data.message,
      });
    }
  }, [isConfirmedSuccess, confirmedError, setError, navigate]);

  return (
    <S.SetupPageWrapper>
      {/* 이메일 */}
      <S.InputContainer>
        <S.Input
          type="email"
          placeholder="이메일을 입력하세요"
          {...register("email", {
            required: { value: true, message: "이메일을 입력하세요." },
            maxLength: 40,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
        />
        {successMessage && (
          <S.SuccessMessage>{successMessage}</S.SuccessMessage>
        )}
        {errors.email && (
          <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
        )}
        <S.InteractionBtn
          type="button"
          onClick={handleSubmit(handleRegisterAccount)}
          width="6rem"
          disabled={isRegisterPending}
        >
          메일 전송
        </S.InteractionBtn>
      </S.InputContainer>
      <S.InputContainer>
        <S.Input
          type="text"
          placeholder="인증 코드"
          {...register("verificationToken", {
            // required: true,
            maxLength: 8,
          })}
        />
        <S.InteractionBtn
          type="button"
          onClick={() => handleConfirmVerificationToken()}
          width="6rem"
        >
          인증 확인
        </S.InteractionBtn>
        {errors.verificationToken && (
          <S.ErrorMessage>{errors.verificationToken.message}</S.ErrorMessage>
        )}
      </S.InputContainer>
      <S.BtnWrapper>
        <S.PrevBtn onClick={() => onPrevious()}>이전</S.PrevBtn>
      </S.BtnWrapper>
    </S.SetupPageWrapper>
  );
}
