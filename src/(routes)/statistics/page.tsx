import Header from "./_components/header/header";
import RecentHistory from "./_components/recent-history/recent-history";
import * as S from "./page.style";
import RecentSevenDaysScore from "./_components/recent-seven-days-score/recent-seven-days-score";
import RecentSevenDaysBadActionsGraph from "./_components/recent-seven-days-bad-actions-graph/recent-seven-days-bad-actions-graph";
import ContentBlockWrapper from "../../_components/block/content-block-wrapper";

// PAGE: 안전점수 관련 통계 페이지
export default function Page() {
  return (
    <S.PageWrapper>
      <S.ContentWrapper>
        <Header />
        <ContentBlockWrapper height={"content-fit"} padding={"1rem"}>
          <S.Title>최근 일주일 운전 분석</S.Title>
          <RecentSevenDaysScore />
          <RecentSevenDaysBadActionsGraph />
        </ContentBlockWrapper>
        <RecentHistory />
      </S.ContentWrapper>
    </S.PageWrapper>
  );
}
