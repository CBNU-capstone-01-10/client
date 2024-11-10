import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IServerErrorResponse } from "../interface/error-interface";
import { useUserStore } from "../store/use-user-store";
import { axiosInstance } from "./axios-instance";

// POST: 안전운전 지속하여 max 게이지 채울 시
export const usePostCoin = () => {
  const { userId } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      const coinPostURL = `api/users/${userId}/coins/add`;
      return await axiosInstance.post(coinPostURL);
    },
  });
};

// GET: 사용자 코인 갯수
export const useGetCoin = () => {
  const { userId } = useUserStore();

  return useQuery({
    queryKey: ["coin"],
    queryFn: async () => {
      const coinSumGetURL = `/api/users/${userId}/coins/counts`;

      return await axiosInstance.get(coinSumGetURL).then((res) => {
        return res.data;
      });
    },
  });
};
