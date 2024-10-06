import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import * as S from "./header.style";

export default function Header() {
  return (
    <S.Wrapper>
      <ContentBlockWrapper height={"7rem"}>
        <S.MyScoreWrapper>
          <S.MyScoreTitle>나의 안전점수 지수</S.MyScoreTitle>
          <S.MyScore>128.0</S.MyScore>
          <S.Divider />
          <S.MetadataWrapper>1h</S.MetadataWrapper>
        </S.MyScoreWrapper>
      </ContentBlockWrapper>
    </S.Wrapper>
  );
}
