import * as S from "./form-error-message.style";
// COMPONENT: form 입력 에러시 보여주는 메시지
interface IFormErrorMessageProps {
  message: string | undefined;
}
export default function FormErrorMessage({ message }: IFormErrorMessageProps) {
  return <S.ErrorMessage>{message}</S.ErrorMessage>;
}
