// INTERCEPTOR: Axios 요청, 응답을 가로채어 중간처리를 하는 객체
import axios, { AxiosResponse } from "axios";
import { IServerErrorResponse } from "../interface/error-interface";
import isServerError from "../error/is-server-error";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// 응답 처리
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (!isServerError(error)) {
      // TODO: 토스트 메시지로 처리
      console.error("알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요.");
      return Promise.reject(error);
    }

    // error는 AxiosError<IServerErrorResponse> 타입
    const { status, data } =
      error.response as AxiosResponse<IServerErrorResponse>;

    if (error.response) {
      switch (status) {
        case 400:
          // 400:
          break;
        case 401:
          // 401: UNAUTHORIZED
          if (data.message === "Unauthorized") {
            window.location.href = "/";
          }
          break;
        case 403:
          // 403:
          break;
        case 404:
          // 404:
          break;
        case 500:
          // 500:
          break;
        default:
          // 기타 상태 코드 처리 로직
          break;
      }
    }
    return Promise.reject(error);
  }
);
