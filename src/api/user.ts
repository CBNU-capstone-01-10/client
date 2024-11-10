import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IPersonalInfo } from "../(routes)/profile/types/types";
import { axiosInstance } from "./axios-instance";

// GET: 사용자 개인정보
export const useGetPersonalInfo = () => {
  return useQuery<AxiosResponse<IPersonalInfo>, AxiosError, IPersonalInfo>({
    queryKey: ["self-info"],
    queryFn: async () => {
      const myProfileURL = `/api/users/self`;
      return await axiosInstance.get(myProfileURL).then((res) => {
        return res.data;
      });
    },
    retry: 0,
  });
};

// PUT: 사용자 개인정보
export const useEditPersonalInfo = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, FormData>({
    mutationFn: async (newProfileData) => {
      const profileEditURL = `/api/users/${userId}`;
      return await axiosInstance.put(profileEditURL, newProfileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["self-info"],
      });
    },
  });
};
