import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import { useGetCoin } from "../../../../api/coin";
import * as S from "./header.style";

export default function Header() {
  const { data: coinSum } = useGetCoin();

  return (
    <ContentBlockWrapper height={"fit-content"}>
      <S.MyScoreWrapper>
        <S.MyScoreTitle>획득한 코인 갯수</S.MyScoreTitle>
        {coinSum ? (
          <S.MyScore>{coinSum}</S.MyScore>
        ) : (
          <S.Message>
            아직 획득한 코인이 없어요 <br />
            안전운전하고 코인을 모아보세요!
          </S.Message>
        )}
      </S.MyScoreWrapper>
    </ContentBlockWrapper>
  );
}
