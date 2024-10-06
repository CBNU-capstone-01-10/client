import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import isServerError from "../error/is-server-error";
import { IPersonalInfo } from "../(routes)/profile/types/types";

// GET: 내 개인정보 조회
export const useGetPersonalInfo = () => {
  //   return useQuery<IProfileInfo>({
  return useQuery<AxiosResponse, AxiosError, IPersonalInfo>({
    queryKey: ["self-info"],
    queryFn: async () => {
      const myProfileURL = `/api/self`;
      return await axios.get(myProfileURL).then((res) => {
        return res.data.response;
      });
    },
    retry: 0,
  });
};

// PUT: 내 개인정보 편집
export const useEditPersonalInfo = () => {
  //   const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, FormData>({
    mutationFn: async (newProfileData) => {
      const profileEditURL = `/api/self`;
      return await axios.put(profileEditURL, newProfileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {},
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
