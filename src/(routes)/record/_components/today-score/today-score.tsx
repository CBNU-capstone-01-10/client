import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import * as S from "./today-score.style";

// COMPONENT: 오늘의 안전점수 위젯
export default function TodayScore() {
  return (
    <S.Wrapper>
      <ContentBlockWrapper height={"7rem"}>
        <S.TodayScoreWrapper>
          <S.TodayScoreTitle>오늘의 안전 점수</S.TodayScoreTitle>
          <S.TodayScore>128.0</S.TodayScore>
          <S.Divider />
          <S.MetadataWrapper>1h</S.MetadataWrapper>
        </S.TodayScoreWrapper>
      </ContentBlockWrapper>
    </S.Wrapper>
  );
}
