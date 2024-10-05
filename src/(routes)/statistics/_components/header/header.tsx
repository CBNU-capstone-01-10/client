import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import * as S from "./header.style";

export default function Header() {
  return (
    <S.Wrapper>
      <ContentBlockWrapper height={"7rem"}>
        <S.TodayScoreWrapper>
          <S.TodayScoreTitle>나의 안전점수 지수</S.TodayScoreTitle>
          <S.TodayScore>128.0</S.TodayScore>
          <S.Divider />
          <S.MetadataWrapper>1h</S.MetadataWrapper>
        </S.TodayScoreWrapper>
      </ContentBlockWrapper>
    </S.Wrapper>
  );
}
