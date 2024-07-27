import { Link } from "react-router-dom";
import * as S from "./page.style";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  useConfirmVerificationToken,
  useRegisterEmail,
} from "../../../api/account";
import { IAccountRegistrationParams, IVerificationParams } from "../types/type";

// 회원가입 페이지
export default function Page() {
  const [userId, setUserId] = useState<string>("");
  const {
    register,
    getValues,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
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
    const unverifiedAccountData: IAccountRegistrationParams = {
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

  // POST: 인증토큰 확인
  // RQ
  const {
    mutate: confirmVerificationToken,
    isSuccess: isConfirmedSuccess,
    isError: isConfirmedError,
  } = useConfirmVerificationToken();
  // HANDLER
  const handleConfirmVerificationToken = () => {
    // RHF
    const verificationToken = getValues("token");
    const verificationData: IVerificationParams = { userId, verificationToken };
    confirmVerificationToken(verificationData);
  };

  useEffect(() => {
    if (isConfirmedSuccess) {
      alert("이메일이 인증에 성공하였습니다.");
    }
    if (isConfirmedError) {
      alert("이메일이 인증에 실패하였습니다.");
    }
  }, [isConfirmedSuccess, isConfirmedError]);

  return (
    <S.FormWrapper>
      {/* <S.FormWrapper onSubmit={handleSubmit(onSubmit)}> */}
      <S.FormContent>
        <S.GotoLogin>이미 계정이 있으신가요?</S.GotoLogin>
        <S.GotoLoginBtn>
          <Link to={"/signin"}>&larr; 로그인 하러가기</Link>
        </S.GotoLoginBtn>
        <S.Header>
          <S.Title>회원가입</S.Title>
        </S.Header>
        <S.InputContainer>
          <S.Label>닉네임 &#42;</S.Label>
          <S.Input
            type="text"
            placeholder="닉네임을 입력하세요"
            required
            {...register("username", { required: true, maxLength: 12 })}
          />
          {/* 이메일 */}
          <S.Label>이메일 &#42;</S.Label>
          <S.CoupleInputContainer>
            <S.Input
              type="email"
              placeholder="이메일을 입력하세요"
              required
              {...register("email", {
                required: true,
                maxLength: 40,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "올바른 이메일 형식이 아닙니다.",
                },
              })}
            />
            <S.VerificationBtn
              type="button"
              onClick={() => handleRegisterAccount()}
              width="16rem"
            >
              인증코드 전송
            </S.VerificationBtn>
          </S.CoupleInputContainer>
          {errors.email && <small>{errors.email.message}</small>}
          <S.CoupleInputContainer>
            <S.Input
              type="text"
              placeholder="인증 코드"
              required
              {...register("token", {
                required: true,
                maxLength: 8,
              })}
            />
            <S.VerificationBtn
              type="button"
              onClick={() => handleConfirmVerificationToken()}
              width="16rem"
            >
              인증코드 확인
            </S.VerificationBtn>
          </S.CoupleInputContainer>
          {errors.token && <small>{errors.token.message}</small>}
          {/* 비밀번호 */}
          <S.Label>비밀번호 &#42;</S.Label>
          <S.Input
            id="password"
            type="password"
            placeholder="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 12,
                message: "비밀번호는 12자리 이상입니다.",
              },
              maxLength: {
                value: 36,
                message: "비밀번호는 36자리 이하입니다.",
              },
            })}
            aria-invalid={
              isSubmitted ? (errors.password ? "true" : "false") : undefined
            }
          />
          {errors.password && <small>{errors.password.message}</small>}
          {/* 비밀번호 확인 */}
          <S.Label>비밀번호 확인 &#42;</S.Label>
          <S.Input
            id="password_confirm"
            type="password_confirm"
            placeholder="password_confirm"
            {...register("password_confirm", {
              required: "비밀번호를 확인해주세요",
              minLength: {
                value: 12,
                message: "비밀번호는 12자리 이상입니다.",
              },
              maxLength: {
                value: 36,
                message: "비밀번호는 36자리 이하입니다.",
              },
            })}
            aria-invalid={
              isSubmitted
                ? errors.password_confirm
                  ? "true"
                  : "false"
                : undefined
            }
          />
          <S.SubmitButton disabled={isSubmitting}>완료</S.SubmitButton>
        </S.InputContainer>
      </S.FormContent>
    </S.FormWrapper>
  );
}
