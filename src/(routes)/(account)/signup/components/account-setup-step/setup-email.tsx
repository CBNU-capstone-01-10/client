import { useFormContext } from "react-hook-form";
import * as S from "./setup-step.style";
import { useEffect, useState } from "react";
import {
  useConfirmVerificationToken,
  useRegisterEmail,
} from "../../../../../api/account";
import { ISignupParams, IVerificationParams } from "../../../types/type";
import { useNavigate } from "react-router";

// STEP-PAGE: 이메일 인증
type TFieldValues = ISignupParams &
  Pick<IVerificationParams, "verificationToken">;
export default function SetupEmail() {
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  // POST: 임시 등록 (이메일 인증 전)
  // RQ
  const {
    data: responseData,
    mutate: registerAccount,
    isSuccess: isRegisteredSuccess,
    isError: isRegisteredError,
  } = useRegisterEmail();

  // HANDLER
  const handleRegisterAccount = () => {
    // RHF
    const { username, email, password } = getValues();
    const unverifiedAccountData: Omit<ISignupParams, "password_confirm"> = {
      username,
      email,
      password,
    };
    registerAccount(unverifiedAccountData);
  };

  useEffect(() => {
    if (isRegisteredSuccess) {
      const { data } = responseData;
      setUserId(data.id.toString());
      alert("인증코드가 이메일로 전송되었습니다. 이메일을 확인해주세요.");
    }
    if (isRegisteredError) {
      location.reload();
    }
  }, [isRegisteredSuccess, isRegisteredError, responseData]);

  // POST: 인증토큰 확인 (회원가입 완료)
  // RQ
  const {
    mutate: confirmVerificationToken,
    isSuccess: isConfirmedSuccess,
    isError: isConfirmedError,
    error,
  } = useConfirmVerificationToken();

  // HANDLER
  const handleConfirmVerificationToken = () => {
    // RHF
    const verificationToken = getValues("verificationToken");
    const verificationData: IVerificationParams = { userId, verificationToken };
    confirmVerificationToken(verificationData);
  };

  useEffect(() => {
    if (isConfirmedSuccess) {
      alert("이메일이 인증에 성공하였습니다. 생성한 계정으로 로그인해주세요.");
      navigate("/signin");
    }
    if (isConfirmedError) {
      alert(error.message);
    }
  }, [isConfirmedSuccess, isConfirmedError, navigate, error]);

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
        {errors.email && (
          <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
        )}
        <S.InteractionBtn
          type="button"
          onClick={handleSubmit(handleRegisterAccount)} // Use handleSubmit here
          width="6rem"
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
      </S.InputContainer>
      {errors.verificationToken && (
        <S.ErrorMessage>{errors.verificationToken.message}</S.ErrorMessage>
      )}
    </S.SetupPageWrapper>
  );
}
