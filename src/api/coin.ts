import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IServerErrorResponse } from "../interface/error-interface";
import { useUserStore } from "../store/use-user-store";
import { axiosInstance } from "./axios-instance";

// POST: 안전운전 지속하여 max 게이지 채울 시
export const usePostCoin = () => {
  const { userId } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      const driverActionURL = `api/users/${userId}/coins/add`;
      return await axiosInstance.post(driverActionURL);
    },
  });
};
