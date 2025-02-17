// PAGE: 회원가입 페이지(퍼널 형식)
import { useNavigationType } from "react-router";
import GenericForm from "../../../_components/form/generic-form";
import { useFunnel } from "../../../hooks/useFunnel";
import AccountSetup from "./components/account-setup";
import FormSessionStorage from "./components/form-session-storage";
import { useRef } from "react";

const steps = [
  "이름 설정",
  "별명 설정",
  "주소 설정",
  "비밀번호 설정",
  "이메일 인증",
];

export default function SignupPage() {
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);
  const navigationType = useNavigationType(); // "POP" | "PUSH" | "REPLACE" 중 하나를 반환
  const signupDefaultValuesRef = useRef({});

  // EXCEPTION: 회원가입의 첫 번째 단계이고, 히스토리 스택의 타입이 PUSH인 경우는 새로운 계정 생성 시도로 판정
  if (currentStep === steps[0] && navigationType === "PUSH") {
    // 세션 스토리지 키-값 삭제
    signupDefaultValuesRef.current = {};
    sessionStorage.removeItem("accountSetup");
  } else {
    // 세션 스토리지에 저장된 폼 입력값 복원하기
    const savedData = sessionStorage.getItem("accountSetup");
    signupDefaultValuesRef.current = savedData ? JSON.parse(savedData) : {};
  }

  const nextClickHandler = (step: string) => {
    setStep(step);
  };
  const prevClickHandler = (step: string) => {
    setStep(step);
  };

  return (
    <GenericForm
      formOptions={{
        mode: "onChange",
        defaultValues: signupDefaultValuesRef.current,
      }}
    >
      <FormSessionStorage />
      <AccountSetup
        steps={steps}
        nextClickHandler={nextClickHandler}
        prevClickHandler={prevClickHandler}
        Funnel={Funnel}
        Step={Step}
      />
    </GenericForm>
  );
}
