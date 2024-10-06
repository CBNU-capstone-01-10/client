import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import OvalLoadingSpinner from "../../../../_components/loading-spinner/oval-loading-spinner";
import { useGetRecentSevenDaysDriverActions } from "../../../../api/action";
import * as S from "./recent-seven-days-score.style";
import BarChart from "../../../../_components/chart/bar-chart.js";
import { getRecentSevenDays } from "../../../../_utils/day.js";
import { getScoresPerDay } from "../../_utils/get-scores-per-day.js";

// COMPONENT: 최근 일주일 점수 통계
export default function RecentSevenDaysScore() {
  const {
    data: recentSevenDaysDriverActions,
    isLoading,
    isError,
    isSuccess,
  } = useGetRecentSevenDaysDriverActions();

  // 로딩 중일 때 스피너 표시
  if (isLoading)
    return (
      <S.RecentSevenDaysScoreWrapper>
        <OvalLoadingSpinner />
      </S.RecentSevenDaysScoreWrapper>
    );

  // 에러 발생 시 에러 메시지 표시
  if (isError)
    return (
      <S.RecentSevenDaysScoreWrapper>
        최근 점수를 불러올 수 없습니다.
      </S.RecentSevenDaysScoreWrapper>
    );

  if (isSuccess) {
    const recentSevenDays = getRecentSevenDays();
    // 요일별 점수 합산을 위한 초기 배열 (0으로 초기화)
    const scoresPerDay = getScoresPerDay(recentSevenDaysDriverActions);

    return (
      <ContentBlockWrapper height={"content-fit"}>
        <S.RecentSevenDaysScoreWrapper>
          <S.ChartHeader>
            <S.Title>최근 일주일 점수 통계</S.Title>
            <S.TotalScore>총 1123.0점</S.TotalScore>
          </S.ChartHeader>
          <BarChart
            labels={recentSevenDays}
            label={"안전점수"}
            data={scoresPerDay}
          />
        </S.RecentSevenDaysScoreWrapper>
      </ContentBlockWrapper>
    );
  }
}
