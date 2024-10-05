import dayjs from "dayjs";

/**
 * 최근 일주일의 순차적인 요일들을 담은 배열을 생성하는 함수
 * @returns recentWeekLabels
 */
export const getRecentSevenDays = () => {
  const today = dayjs();

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const recentWeekLabels = Array(7)
    .fill(0)
    .map(
      (_, idx) =>
        weekDays[
          dayjs(today)
            .subtract(6 - idx, "day")
            .day()
        ]
    );

  return recentWeekLabels;
};
