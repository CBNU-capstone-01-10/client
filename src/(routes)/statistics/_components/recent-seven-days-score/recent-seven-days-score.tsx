import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import OvalLoadingSpinner from "../../../../_components/loading-spinner/oval-loading-spinner";
import { useGetRecentSevenDaysScore } from "../../../../api/action";
import * as S from "./recent-seven-days-score.style";
import BarChart from "../../../../_components/chart/bar-chart.js";
import { getRecentSevenDays } from "../../../../_utils/day.js";

// COMPONENT: 최근 일주일 점수 통계
export default function RecentSevenDaysScore() {
  const {
    data: recentSevenDaysScore,
    isLoading,
    isError,
  } = useGetRecentSevenDaysScore();

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

  return (
    <ContentBlockWrapper height={"content-fit"}>
      <S.RecentSevenDaysScoreWrapper>
        <S.ChartHeader>
          <S.Title>최근 일주일 점수 통계</S.Title>
          <S.TotalScore>총 1123.0점</S.TotalScore>
        </S.ChartHeader>
        <BarChart labels={getRecentSevenDays()} label={"안전점수"} data={[]} />
      </S.RecentSevenDaysScoreWrapper>
    </ContentBlockWrapper>
  );
}
