import Header from "./_components/header/header";
import RecentHistory from "./_components/recent-history/recent-history";
import * as S from "./page.style";
import RecentSevenDaysScore from "./_components/recent-seven-days-score/recent-seven-days-score";
import RecentSevenDaysBadActionsGraph from "./_components/recent-seven-days-bad-actions-graph/recent-seven-days-bad-actions-graph";

// PAGE: 안전점수 관련 통계 페이지
export default function Page() {
  return (
    <S.PageWrapper>
      <S.ContentWrapper>
        <Header />
        <RecentSevenDaysScore />
        <RecentSevenDaysBadActionsGraph />
        <RecentHistory />
      </S.ContentWrapper>
    </S.PageWrapper>
  );
}
