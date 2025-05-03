// COMPONENT: 입력 폼에서 세션 스토리지(웹 스토리지 API)를 활용해 정보를 저장하거나 가져온다.
// 상위 컴포넌트에 react hook form의 FormProvider가 존재해야 한다.
import { useFormContext } from "react-hook-form";
import { useBeforeUnload } from "react-router-dom";

export default function FormSessionStorage() {
  const { getValues } = useFormContext();

  useBeforeUnload(() => {
    // HANDLER: beforeunload 이벤트 발생 시, 세션 스토리지에 폼 입력값 데이터 저장
    const formData = getValues();
    sessionStorage.setItem("accountSetup", JSON.stringify(formData));
  });

  return null;
}
