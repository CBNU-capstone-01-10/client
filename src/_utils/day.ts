import dayjs from "dayjs";
import { WEEK_DAYS } from "../constants/constants";

/**
 * 최근 일주일의 순차적인 요일들을 담은 배열을 생성하는 함수
 * @returns recentWeekLabels
 */
export const getRecentSevenDays = () => {
  const today = dayjs();

  const recentWeekLabels = Array(7)
    .fill(0)
    .map(
      (_, idx) =>
        WEEK_DAYS[
          dayjs(today)
            .subtract(6 - idx, "day")
            .day()
        ]
    );

  return recentWeekLabels;
};
