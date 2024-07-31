import React from "react";
import { FunnelProps, StepProps } from "../../../../hooks/useFunnel";
import SetupUsername from "./account-setup-step/setup-username";
import SetupPassword from "./account-setup-step/setup-password";
import SetupEmail from "./account-setup-step/setup-email";

export interface AccountSetupInterface {
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

export default function AccountSetup({
  steps,
  nextClickHandler,
  Funnel,
  Step,
}: AccountSetupInterface) {
  return (
    // @@@레이아웃 제작 필요
    <div>
      <Funnel>
        <Step name="이름 설정">
          <SetupUsername onNext={() => nextClickHandler(steps[1])} />
        </Step>

        <Step name="비밀번호 설정">
          <SetupPassword onNext={() => nextClickHandler(steps[2])} />
        </Step>

        <Step name="이메일 인증">
          <SetupEmail />
        </Step>
      </Funnel>
    </div>
  );
}
