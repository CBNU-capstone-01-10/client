import {
  LiveScoreLogWrapper,
  LiveScoreLogItem,
  ContentWrapper,
  Content,
  ElapsedTime,
  Score,
} from "../style/style";

const alert = [
  {
    text: "안전운전 20분 유지",
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
    <>
      <LiveScoreLogWrapper>
        {alert.map((alertItem, idx) => (
          <LiveScoreLogItem key={idx}>
            <ContentWrapper>
              <Content>{alertItem.text}</Content>
              <ElapsedTime>{alertItem.elapsedTime}</ElapsedTime>
            </ContentWrapper>
            <Score>{alertItem.score}</Score>
          </LiveScoreLogItem>
        ))}
      </LiveScoreLogWrapper>
    </>
  );
}
