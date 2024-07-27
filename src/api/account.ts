import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ILoginParams } from "../(routes)/(account)/types/type";
import isServerError from "../error/is-server-error";

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
          alert("에러가 발생했습니다. 관리자에게 문의해주세요.");
          break;
      }
      location.reload();
    },
  });
};
