// COMPONENT: 얼럿 메시지
import { Alert } from "antd";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { IServerErrorResponse } from "../../interface/error-interface";
import * as S from "./alert-banner.style";

interface IAlertProps {
  error: AxiosError | AxiosError<IServerErrorResponse>;
  width?: string;
  top?: string;
  left?: string;
}
export default function AlertBanner({ error, width, top, left }: IAlertProps) {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // error.response?.data가 있고, IServerErrorResponse 형식인 경우 메시지 설정
    if (
      error.response?.data &&
      (error.response.data as IServerErrorResponse).message
    ) {
      setMessage((error.response.data as IServerErrorResponse).message);
    } else {
      // 데이터가 비어있거나 형식이 다른 경우 기본 메시지 설정
      setMessage("잠시후 다시 시도해주세요.");
    }
  }, [error]);

  return (
    <S.Wrapper width={width} top={top} left={left}>
      <Alert
        message={message}
        type="error"
        style={{ padding: "0.5rem 3rem", color: "red" }}
      />
    </S.Wrapper>
  );
}
