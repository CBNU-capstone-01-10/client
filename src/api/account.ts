import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  ILoginParams,
  IRegisterResponseData,
  IVerificationParams,
  IUnverifiedAccountData,
} from "../(routes)/(account)/types/type";
import { axiosInstance } from "./axios-instance";
import { IServerErrorResponse } from "../interface/error-interface";

// POST: 임시등록(이메일 인증코드 발송)
export const useRegisterEmail = () => {
  return useMutation<
    AxiosResponse<IRegisterResponseData>,
    AxiosError<IServerErrorResponse>,
    IUnverifiedAccountData
  >({
    mutationFn: async (unverifiedAccountData) => {
      const registerURL = `api/register`;
      return await axiosInstance.post(registerURL, unverifiedAccountData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });
};

// POST: 이메일 인증 코드 확인
export const useConfirmVerificationToken = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<IServerErrorResponse>,
    IVerificationParams
  >({
    mutationFn: async (verificationData) => {
      const { userId, verificationToken } = verificationData;
      return await axiosInstance.post(`/api/register/verify`, {
        user_id: userId,
        token: verificationToken,
      });
    },
  });
};

// POST: 로그인
export const useLogin = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<IServerErrorResponse>,
    ILoginParams
  >({
    mutationFn: async (loginData) => {
      const loginURL = `api/login`;
      return await axiosInstance.post(loginURL, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });
};

// DELETE: 로그아웃
export const useLogout = () => {
  return useMutation<AxiosResponse, AxiosError>({
    mutationFn: async () => {
      const logoutURL = `api/logout`;
      return await axiosInstance.delete(logoutURL);
    },
  });
};
