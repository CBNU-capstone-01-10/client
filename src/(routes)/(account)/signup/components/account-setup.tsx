// COMPONENT: 계정 생성 단계들을 모아놓은 Funnel
import React from "react";
import { FunnelProps, StepProps } from "../../../../hooks/useFunnel";
import SetupUsername from "./account-setup-step/setup-username";
import SetupPassword from "./account-setup-step/setup-password";
import SetupEmail from "./account-setup-step/setup-email";

export interface IAccountSetupProps {
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  prevClickHandler: (prevStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}
export default function AccountSetup({
  steps,
  nextClickHandler,
  prevClickHandler,
  Funnel,
  Step,
}: IAccountSetupProps) {
  return (
    <>
      <Funnel>
        <Step name="이름 설정">
          <SetupUsername onNext={() => nextClickHandler(steps[1])} />
        </Step>

        <Step name="비밀번호 설정">
          <SetupPassword
            onNext={() => nextClickHandler(steps[2])}
            onPrevious={() => prevClickHandler(steps[0])}
          />
        </Step>

        <Step name="이메일 인증">
          <SetupEmail onPrevious={() => prevClickHandler(steps[1])} />
        </Step>
      </Funnel>
    </>
  );
}
