import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import isServerError from "../error/is-server-error";
import { IDriverActionResponse } from "../(routes)/record/types/type";
import { DESIRED_BEFORE_MINUTES } from "../constants/constants";
import dayjs from "dayjs";

// POST: 운전자 행위 데이터 전송
export const usePostDriverAction = () => {
  // const queryClient = useQueryClient();
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
      return res.data.response;
    },
    onError: (err) => {
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

// GET: 최근 운전자 행위 결과 다건 조회 (무한스크롤)
export const useGetRecentDriverActions = () => {
  return useInfiniteQuery({
    queryKey: ["recent-driver-actions"],
    queryFn: async ({ pageParam }) => {
      const recentDriverActionsURL = `/api/actions`;

      return await axios
        .get(recentDriverActionsURL, {
          params: { before_m: DESIRED_BEFORE_MINUTES, page: pageParam },
        })
        .then((res) => {
          return res.data.response;
        });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
  });
};

// GET: 운전자 행위 결과 단건 조회
export const useGetDriverAction = (actionId: number) => {
  return useQuery<IDriverActionResponse>({
    queryKey: ["driver-action", actionId],
    queryFn: async ({ queryKey }) => {
      const [, actionId] = queryKey;
      const recentDriverActionURL = `/api/actions/${actionId}`;

      return await axios.get(recentDriverActionURL).then((res) => {
        return res.data.response;
      });
    },
    retry: 0,
    enabled: !!actionId,
  });
};

// GET: 최근 일주일 운전자 점수 조회
export const useGetRecentSevenDaysDriverActions = () => {
  return useQuery<IDriverActionResponse[]>({
    queryKey: ["recent-seven-days-score"],
    queryFn: async () => {
      const recentDriverActionsURL = `/api/actions`;
      // 날짜 계산: 최근 일주일의 시작일과 종료일
      const date_end = dayjs().format("YYYY-MM-DD");
      const date_start = dayjs().subtract(6, "day").format("YYYY-MM-DD");

      return await axios
        .get(recentDriverActionsURL, {
          params: { date_start, date_end },
        })
        .then((res) => {
          return res.data.response;
        });
    },
    retry: 0,
  });
};
