// PAGE: 로그인 페이지
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../../../api/account";
import { useEffect } from "react";
import { ILoginParams } from "../types/type";
import WangnooniLottieLogo from "../../../_components/wangnooni-logo/wangnooni-lottie-logo";
import FormErrorMessage from "../../../_components/form-error-message/form-error-message";
import * as S from "./page.style";

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
  }, [isLoginSuccess, navigate]);

  return (
    <S.FormWrapper
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <S.FormContent>
        <S.Header>
          <S.HeaderTitle>wangn</S.HeaderTitle>
          <WangnooniLottieLogo height={"3rem"} />
          <S.HeaderTitle>ni</S.HeaderTitle>
        </S.Header>
        <S.InputContainer>
          {/* 이메일 입력 */}
          <S.Input
            id="email"
            type="email"
            placeholder="wangnooni@email.com"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "이메일 형식이 올바르지 않습니다",
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
              required: "비밀번호를 입력해주세요",
            })}
          />
          {/* 에러 메시지 */}
          <FormErrorMessage message={errors.password?.message} />
          <FormErrorMessage message={loginError?.response?.data.message} />
        </S.InputContainer>
        <S.LoginButton>로그인</S.LoginButton>
        <S.SignupHeader>아직 계정이 없으신가요?</S.SignupHeader>
        {/* 회원가입 버튼 */}
        <S.SignupButton disabled={isSubmitting}>
          <Link to={"/signup"}>회원가입 하러가기 &rarr;</Link>
        </S.SignupButton>
      </S.FormContent>
    </S.FormWrapper>
  );
}
