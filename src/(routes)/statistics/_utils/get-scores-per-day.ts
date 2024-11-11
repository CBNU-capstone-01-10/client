import dayjs from "dayjs";
import { IDriverActionResponse } from "../../record/types/type";

/**
 * 운전자 행위 응답으로부터 최근 일주일 요일별 안전운전 점수를 계산하는 함수
 * @param recentSevenDaysDriverActions
 * @return scoresPerDay
 */
export const getScoresPerDay = (
  recentSevenDaysDriverActions: IDriverActionResponse["action"][]
) => {
  const scoresPerDay: number[] = Array(7).fill(0);

  // driverActions 데이터를 요일별로 점수 합산
  recentSevenDaysDriverActions.forEach((action) => {
    const today = dayjs();
    const recordedAtDate = dayjs(action.recorded_at);
    const dayDiff = today.diff(recordedAtDate, "day");

    // 최근 일주일 이내의 데이터인지 확인
    if (dayDiff <= 6) {
      // 요일 인덱스 (일요일: 0, 월요일: 1, ... 토요일: 6)
      const dayIndex = recordedAtDate.day();
      scoresPerDay[dayIndex] += action.score;
    }
  });

  return scoresPerDay;
};
