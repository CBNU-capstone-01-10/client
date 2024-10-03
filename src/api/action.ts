import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import isServerError from "../error/is-server-error";
import { IDriverActionResponse } from "../(routes)/record/types/type";
import { DESIRED_BEFORE_MINUTES } from "../constants/constants";

// POST: 운전자 행위 데이터 전송
export const usePostDriverAction = () => {
  //   const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, FormData>({
    mutationFn: async (driverActionData) => {
      const driverActionURL = `/api/actions`;
      return await axios.post(driverActionURL, driverActionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (res) => {
      console.log("🚀 ~ usePostDriverAction ~ res:", res.data);
    },
    onError: (err) => {
      console.log("🚀 ~ usePostDriverAction ~ err:", err);
      if (!isServerError(err)) {
        alert("에러가 발생했습니다. 관리자에게 문의해주세요.");
        return;
      }
      switch (err.response?.status) {
        case 400:
          alert(err.response.data.message);
          break;
        default:
          alert("잠시후 다시 시도해주세요.");
          break;
      }
    },
  });
};

// GET: 운전자 행위 결과 다건 조회
export const useGetRecentDriverActions = () => {
  return useQuery<IDriverActionResponse[]>({
    queryKey: ["recent-driver-actions"],
    queryFn: async () => {
      const minutes = DESIRED_BEFORE_MINUTES;
      const recentDriverActionsURL = `/api/actions?before_m=${minutes}`;

      return await axios.get(recentDriverActionsURL).then((res) => {
        return res.data.response;
        // // JSON-SERVER
        // return res.data;
      });
    },
    retry: 0,
  });
};
