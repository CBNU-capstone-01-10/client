import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ILoginParams,
  IRegisterResponseData,
} from "../(routes)/(account)/types/type";
import isServerError from "../error/is-server-error";

/** REACT-QUERY: 계정 관련 */
// POST: 임시등록(이메일 인증코드 발송)
export const useRegisterEmail = () => {
  return useMutation<AxiosResponse<IRegisterResponseData>, AxiosError>({
    mutationFn: async (temporaryRegistrationData) => {
      const registerURL = `api/register`;
      return await axios.post(registerURL, temporaryRegistrationData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (err) => {
      if (!isServerError(err)) {
        alert("에러가 발생했습니다. 관리자에게 문의해주세요.");
        return;
      }
      switch (err.response?.status) {
        // 유효하지 않은 이메일
        case 400:
          alert(err.response?.data.message);
          break;
        // 이미 등록된 이메일
        case 409:
          alert(err.response?.data.message);
          break;
        default:
          alert("잠시후 다시 시도해주세요.");
          break;
      }
    },
  });
};

// POST: 로그인
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, ILoginParams>({
    mutationFn: async (loginData) => {
      const loginURL = `api/login`;
      return await axios.post(loginURL, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loggedInUser"],
      });
    },
    onError: (err) => {
      if (!isServerError(err)) {
        alert("에러가 발생했습니다. 관리자에게 문의해주세요.");
        return;
      }
      switch (err.response?.status) {
        // 존재하지 않는 계정
        case 401:
          alert(err.response?.data.message);
          break;
        default:
          alert("잠시후 다시 시도해주세요.");
          break;
      }
      location.reload();
    },
  });
};

// DELETE: 로그아웃
export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError>({
    mutationFn: async () => {
      const logoutURL = `api/logout`;
      return await axios.delete(logoutURL);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loggedInUser"],
      });
    },
    onError: (err) => {
      if (!isServerError(err)) {
        alert("에러가 발생했습니다. 관리자에게 문의해주세요.");
        return;
      }
      switch (err.response?.status) {
        default:
          alert("잠시후 다시 시도해주세요.");
          break;
      }
    },
  });
};
