import Header from "./_components/header/header";
import RecentHistory from "./_components/recent-history/recent-history";
import * as S from "./page.style";
import RecentSevenDaysScore from "./_components/recent-seven-days-score/recent-seven-days-score";

// PAGE: 안전점수 관련 통계 페이지
export default function Page() {
  return (
    <S.PageWrapper>
      <S.ContentWrapper>
        <Header />
        <RecentSevenDaysScore />
        <RecentHistory />
      </S.ContentWrapper>
    </S.PageWrapper>
  );
}
