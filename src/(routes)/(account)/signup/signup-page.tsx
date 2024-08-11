import GenericForm from "../../../_components/form/generic-form";
import { useFunnel } from "../../../hooks/useFunnel";
import AccountSetup from "./components/account-setup";

const steps = ["이름 설정", "비밀번호 설정", "이메일 인증"];
// PAGE: 회원가입 페이지(퍼널 형식)
export default function SignupPage() {
  const { Funnel, Step, setStep } = useFunnel(steps[0]);

  const nextClickHandler = (step: string) => {
    setStep(step);
  };
  const prevClickHandler = () => {};

  return (
    <>
      <GenericForm formOptions={{ mode: "onChange" }}>
        <AccountSetup
          steps={steps}
          nextClickHandler={nextClickHandler}
          Funnel={Funnel}
          Step={Step}
        />
      </GenericForm>
    </>
  );
}
