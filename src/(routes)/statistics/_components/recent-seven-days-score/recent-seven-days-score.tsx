// COMPONENT: 최근 일주일 점수 통계
import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import OvalLoadingSpinner from "../../../../_components/loading-spinner/oval-loading-spinner";
import { useGetRecentSevenDaysDriverActions } from "../../../../api/action";
import * as S from "./recent-seven-days-score.style";
import BarChart from "../../../../_components/chart/bar-chart.js";
import { getRecentSevenDays } from "../../../../_utils/day.js";

export default function RecentSevenDaysScore() {
  const {
    data: recentSevenDaysDriverActions,
    isLoading,
    isError,
    isSuccess,
  } = useGetRecentSevenDaysDriverActions();

  // 로딩 또는 에러 상태 처리
  if (isLoading || isError)
    return (
      <ContentBlockWrapper height={"content-fit"}>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
        >
          {!isLoading ? (
            <OvalLoadingSpinner />
          ) : (
            "최근 점수를 불러올 수 없습니다."
          )}
        </div>
      </ContentBlockWrapper>
    );

  if (isSuccess) {
    const recentSevenDays = getRecentSevenDays();

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
            data={recentSevenDaysDriverActions}
          />
        </S.RecentSevenDaysScoreWrapper>
      </ContentBlockWrapper>
    );
  }
}
