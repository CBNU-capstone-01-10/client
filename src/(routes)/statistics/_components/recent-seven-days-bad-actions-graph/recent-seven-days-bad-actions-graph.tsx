// COMPONENT: 최근 위험 운전 분석 그래프
import { useGetRecentSevenDaysBadDriverActions } from "../../../../api/action";
import DoughnutChart from "../../../../_components/chart/doughnut-chart";
import { ACTION_LABEL, ActionLabel } from "../../../../constants/constants";
import OvalLoadingSpinner from "../../../../_components/loading-spinner/oval-loading-spinner";
import BarChart from "../../../../_components/chart/bar-chart";
import styled, { useTheme } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function RecentSevenDaysBadActionsGraph() {
  const {
    data: recentSevenDaysBadDriveActionsData,
    isLoading,
    isSuccess,
  } = useGetRecentSevenDaysBadDriverActions();

  const theme = useTheme();

  if (isLoading) {
    return <OvalLoadingSpinner />;
  }
  if (isSuccess) {
    const scoreByLabel = recentSevenDaysBadDriveActionsData.reduce(
      (acc, curr) => {
        const label = curr.label;
        const score = Math.abs(curr.score); // 절댓값으로 변환

        // 해당 라벨이 객체에 존재하면 기존 값에 더하고, 없으면 새로 추가
        acc[label] = (acc[label] || 0) + score;
        return acc;
      },
      {} as Record<string, number>
    );

    // 키(차트의 라벨), 값(차트의 값) 추출
    // 영어 라벨을 한글 라벨로 변환
    const labels = Object.keys(scoreByLabel).map(
      (label) => ACTION_LABEL[label as ActionLabel] || label
    );
    const chartData = Object.values(scoreByLabel);

    return (
      <Wrapper>
        <DoughnutChart data={chartData} label={"차감 점수"} labels={labels} />
        <BarChart
          data={chartData}
          label={"차감 점수"}
          labels={labels}
          isHorizontal={true}
          barBgColor={theme.primaryCautionBgColor}
        />
      </Wrapper>
    );
  }
}
