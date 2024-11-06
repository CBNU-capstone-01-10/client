import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IDriverActionResponse } from "../(routes)/record/types/type";
import { DESIRED_BEFORE_MINUTES } from "../constants/constants";
import dayjs from "dayjs";
import { IServerErrorResponse } from "../interface/error-interface";
import { axiosInstance } from "./axios-instance";

// POST: 운전자 행위 데이터 전송
export const usePostDriverAction = () => {
  return useMutation<
    IDriverActionResponse,
    AxiosError<IServerErrorResponse>,
    FormData
  >({
    mutationFn: async (driverActionData) => {
      const driverActionURL = `/api/actions`;
      return await axiosInstance
        .post<IDriverActionResponse, AxiosResponse<IDriverActionResponse>>(
          driverActionURL,
          driverActionData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          return res.data;
        });
    },
  });
};

// GET: 최근 운전자 행위 결과 다건 조회 (무한스크롤)
export const useGetRecentDriverActions = () => {
  return useInfiniteQuery({
    queryKey: ["recent-driver-actions"],
    queryFn: async ({ pageParam }) => {
      const recentDriverActionsURL = `/api/actions`;

      return await axiosInstance
        .get(recentDriverActionsURL, {
          params: {
            before_m: DESIRED_BEFORE_MINUTES,
            page: pageParam,
            per_page: 10,
          },
        })
        .then((res) => {
          return res.data;
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

      return await axiosInstance.get(recentDriverActionURL).then((res) => {
        return res.data;
      });
    },
    retry: 0,
    enabled: !!actionId,
  });
};

// GET: 최근 일주일 운전자 점수 조회
export const useGetRecentSevenDaysDriverActions = () => {
  return useQuery<number[]>({
    queryKey: ["recent-seven-days-score"],
    queryFn: async () => {
      const recentDriverActionsURL = `/api/actions/scores/sum`;
      const recentSevenDaysScore = [];

      // 최근 7일의 각 날짜의 합산을 구하기 위한 요청 생성
      for (let i = 6; 0 <= i; i--) {
        const date_start = dayjs().subtract(i, "day").format("YYYY-MM-DD");
        const date_end = dayjs()
          .subtract(i - 1, "day")
          .format("YYYY-MM-DD");

        const score = axiosInstance
          .get(recentDriverActionsURL, {
            params: { date_start, date_end },
          })
          .then((res) => res.data._sum.score);
        recentSevenDaysScore.push(score);
      }

      // 모든 날짜의 요청이 완료될 때까지 기다리고, 결과를 배열로 반환
      return await Promise.all(recentSevenDaysScore);
    },
    retry: 0,
  });
};
