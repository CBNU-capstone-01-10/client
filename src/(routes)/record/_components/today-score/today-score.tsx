import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import * as S from "./today-score.style";

// COMPONENT: 오늘의 안전점수 위젯
export default function TodayScore() {
  return (
    <S.TodayScoreWrapper>
      <S.TodayScoreTitle>안전 운전 시간 온도</S.TodayScoreTitle>
      <S.TodayScore>36.5</S.TodayScore>
    </S.TodayScoreWrapper>
  );
}
