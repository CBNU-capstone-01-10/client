// PAGE: 로그인 페이지
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../../../api/account";
import { useEffect } from "react";
import { ILoginParams } from "../types/type";
import WangnooniLottieLogo from "../../../_components/wangnooni-logo/wangnooni-lottie-logo";
import FormErrorMessage from "../../../_components/form-error-message/form-error-message";
import * as S from "./page.style";
import AlertBanner from "../../../_components/alert-banner/alert-banner";

export default function Page() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<ILoginParams>();
  const {
    mutate: login,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
    error: loginError,
  } = useLogin();
  // POST: 로그인
  const onSubmit = async (loginData: ILoginParams) => {
    login(loginData);
  };

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/home");
    }
  }, [isLoginSuccess, isLoginError, navigate]);

  return (
    <S.FormWrapper
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isLoginError && <AlertBanner error={loginError} />}
      <S.FormContent>
        <S.Header>
          <S.HeaderTitle>wang</S.HeaderTitle>
          <WangnooniLottieLogo />
          <S.HeaderTitle>ni</S.HeaderTitle>
        </S.Header>
        <S.InputContainer>
          {/* 이메일 입력 */}
          <S.Input
            id="email"
            type="email"
            placeholder="wangnooni@email.com"
            {...register("email", {
              required: "Please enter your e-mail.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "This is not a valid email format.",
              },
            })}
            aria-invalid={
              isSubmitted ? (errors.email ? "true" : "false") : undefined
            }
          />
          <FormErrorMessage message={errors.email?.message} />
          {/* 비밀번호 입력 */}
          <S.Input
            id="password"
            type="password"
            placeholder="password"
            aria-invalid={
              isSubmitted ? (errors.password ? "true" : "false") : undefined
            }
            {...register("password", {
              required: "Please enter your password.",
            })}
          />
          <FormErrorMessage message={errors.password?.message} />
        </S.InputContainer>
        <S.LoginButton>LOGIN</S.LoginButton>
        <S.SignupHeader>Don't you have an account yet?</S.SignupHeader>
        <S.SignupButton disabled={isSubmitting}>
          <Link to={"/signup"}>Sign Up &rarr;</Link>
        </S.SignupButton>
      </S.FormContent>
    </S.FormWrapper>
  );
}
