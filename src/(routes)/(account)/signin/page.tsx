import { Link, useNavigate } from "react-router-dom";
import * as S from "./page.style";
import { useForm } from "react-hook-form";
import { useLogin } from "../../../api/account";
import { useEffect } from "react";
import { ILoginParams } from "../types/type";
import WangnooniLottieLogo from "../../../_components/wangnooni-logo/wangnooni-lottie-logo";

// 로그인 페이지
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
  } = useLogin();
  // POST: 로그인
  const onSubmit = async (loginData: ILoginParams) => {
    login(loginData);
  };

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/home");
    }
    if (isLoginError) {
      location.reload();
    }
  }, [isLoginSuccess, isLoginError, navigate]);

  return (
    <S.FormWrapper
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <S.FormContent>
        <S.Header>
          <S.HeaderTitle>wang</S.HeaderTitle>
          <WangnooniLottieLogo />
          <S.HeaderTitle>ni</S.HeaderTitle>
        </S.Header>
        <S.Input
          id="email"
          type="email"
          placeholder="wangnooni@email.com"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          aria-invalid={
            isSubmitted ? (errors.email ? "true" : "false") : undefined
          }
        />
        {errors.email && <small>{errors.email.message}</small>}
        <S.Input
          id="password"
          type="password"
          placeholder="password"
          aria-invalid={
            isSubmitted ? (errors.password ? "true" : "false") : undefined
          }
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
        />
        {errors.password && <small>{errors.password.message}</small>}
        <S.LoginButton>로그인</S.LoginButton>
        <S.SignupHeader>아직 계정이 없으신가요?</S.SignupHeader>
        <S.SignupButton disabled={isSubmitting}>
          <Link to={"/signup"}>회원가입하기 &rarr;</Link>
        </S.SignupButton>
      </S.FormContent>
    </S.FormWrapper>
  );
}
