import { Alert } from "antd";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { IServerErrorResponse } from "../../interface/error-interface";
import * as S from "./alert-banner.style";

interface IAlertProps {
  error?: AxiosError | AxiosError<IServerErrorResponse>;
  errorMessage?: string;
  width?: string;
  top?: string;
  left?: string;
  type?: "error" | "success" | "info" | "warning" | undefined;
  duration?: number; // 얼럿이 사라질 시간 (밀리초 단위)
}

export default function AlertBanner({
  error,
  errorMessage,
  width,
  top,
  left,
  type,
  duration = 3000, // 기본값 3초
}: IAlertProps) {
  const [message, setMessage] = useState<string | undefined>("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (
      error?.response?.data &&
      (error.response.data as IServerErrorResponse).message
    ) {
      setMessage((error.response.data as IServerErrorResponse).message);
    } else {
      setMessage("잠시후 다시 시도해주세요.");
    }
  }, [error]);

  useEffect(() => {
    if (errorMessage) {
      setMessage(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    // duration 시간 후에 visible 상태를 false로 변경하여 얼럿 창을 숨깁니다.
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [duration]);

  // visible 상태가 false일 때 null을 반환하여 컴포넌트 숨기기
  if (!visible) return null;

  return (
    <S.Wrapper width={width} top={top} left={left}>
      <Alert
        message={message}
        type={type || "error"}
        style={{ padding: "0.5rem 3rem", color: "red" }}
      />
    </S.Wrapper>
  );
}
