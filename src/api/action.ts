import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import isServerError from "../error/is-server-error";
import { getFormattedDate } from "../_utils/date";
import {
  IDriverActionRequestBody,
  IDriverActionResponse,
} from "../(routes)/record/types/type";

// POST: 운전자 행위 캡처 이미지 전송
export const useSendDriverActionCapture = () => {
  //   const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, IDriverActionRequestBody>({
    mutationFn: async (driverActionData) => {
      const driverActionURL = `api/action`;
      return await axios.post(driverActionURL, driverActionData, {
        headers: {
          "Content-Type": "application/json",
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

// GET: 운전자 행위 결과 다건 조회
export const useGetRecentDriverActions = () => {
  return useQuery<IDriverActionResponse[]>({
    queryKey: ["recent-driver-actions"],
    queryFn: async () => {
      const date = getFormattedDate();
      const minutes = 30;
      const recentDriverActionsURL = `/api/actions?date_start=${date}&date_end=${date}&before_m=${minutes}`;

      return await axios.get(recentDriverActionsURL).then((res) => {
        return res.data.response;
        // // JSON-SERVER
        // return res.data;
      });
    },
    retry: 0,
  });
};
