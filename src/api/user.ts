import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import isServerError from "../error/is-server-error";
import { IPersonalInfo } from "../(routes)/profile/types/types";

// GET: 사용자 개인정보
export const useGetPersonalInfo = () => {
  return useQuery<AxiosResponse<IPersonalInfo>, AxiosError, IPersonalInfo>({
    queryKey: ["self-info"],
    queryFn: async () => {
      const myProfileURL = `/api/users/self`;
      return await axios.get(myProfileURL).then((res) => {
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
      return await axios.put(profileEditURL, newProfileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).catch((err)=>console.log(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["self-info"],
      });
    },
    onError: (err) => {
      if (!isServerError(err)) {
        alert("에러가 발생했습니다. 관리자에게 문의해주세요.");
        return;
      }
      switch (err.response?.status) {
        case 400:
          alert(err.response?.data.message);
          break;
        default:
          alert("잠시후 다시 시도해주세요.");
          break;
      }
    },
  });
};
