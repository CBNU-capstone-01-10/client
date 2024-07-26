import ContentBlockWrapper from "../../../_components/block/content-block-wrapper";
import * as S from "../style/LiveScoreLog.style";

const liveScoreLog = [
  {
    text: "안전운전 20분 유지",
    elapsedTime: "2분 17초 전",
    score: 8.0,
  },
  {
    text: "전방주시 태만",
    elapsedTime: "3분 17초 전",
    score: -20.0,
  },
  {
    text: "안전운전 10분 유지",
    elapsedTime: "2분 17초 전",
    score: 8.0,
  },
  {
    text: "안전운전 10분 유지",
    elapsedTime: "2분 17초 전",
    score: 8.0,
  },
  {
    text: "안전운전 10분 유지",
    elapsedTime: "2분 17초 전",
    score: 8.0,
  },
  {
    text: "안전운전 10분 유지",
    elapsedTime: "2분 17초 전",
    score: 8.0,
  },
  {
    text: "안전운전 10분 유지",
    elapsedTime: "2분 17초 전",
    score: 8.0,
  },
];
export default function LiveScoreLog() {
  return (
    <S.LiveScoreLogWrapper>
      {liveScoreLog?.map((liveScoreLogItem, idx) => (
        <ContentBlockWrapper key={idx}>
          <S.LiveScoreLogItem>
            <S.ContentWrapper>
              <S.Content>{liveScoreLogItem.text}</S.Content>
              <S.ElapsedTime>{liveScoreLogItem.elapsedTime}</S.ElapsedTime>
            </S.ContentWrapper>
            <S.ScoreWrapper score={liveScoreLogItem.score}>
              {liveScoreLogItem.score}
            </S.ScoreWrapper>
          </S.LiveScoreLogItem>
        </ContentBlockWrapper>
      ))}
    </S.LiveScoreLogWrapper>
  );
}
