// COMPONENT: 점수 게이지
import { useEffect, useState } from "react";
import * as S from "./score-gauge.stlye";
import { useDriverActionsStore } from "../../store/use-driver-actions";

export default function ScoreGauge() {
  const { driverActions } = useDriverActionsStore();
  const latestScore = Math.abs(driverActions[0]?.score || 0);

  const [displayedScore, setDisplayedScore] = useState<number>(0);

  useEffect(() => {
    if (displayedScore !== latestScore) {
      const increment = displayedScore < latestScore ? 1 : -1;
      const intervalId = setInterval(() => {
        setDisplayedScore((prevValue) => {
          if (prevValue === latestScore) {
            clearInterval(intervalId);
            return prevValue;
          }
          return prevValue + increment;
        });
      }, 2);
      return () => clearInterval(intervalId);
    }
  }, [latestScore, displayedScore]);

  return (
    <S.Container>
      <S.ScoreBar
        $scoreStartValue={displayedScore}
        score={driverActions[0]?.score}
      >
        {/* 라벨 표시 */}
        <S.ScoreLabelWrapper>
          <S.ScoreLabel
            label={driverActions[0]?.label}
            score={driverActions[0]?.score}
          />
        </S.ScoreLabelWrapper>
      </S.ScoreBar>
    </S.Container>
  );
}
