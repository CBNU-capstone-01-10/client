// COMPONENT: 점수 게이지
import { useEffect, useState } from "react";
import { ACTION_LABEL, ActionLabel } from "../../constants/constants";
import { IDriverActionResponse } from "../../(routes)/record/types/type";
import * as S from "./score-gauge.stlye";

interface ScoreGaugeProps {
  driverAction: IDriverActionResponse;
}
export default function ScoreGauge({ driverAction }: ScoreGaugeProps) {
  const [prevId, setPrevActionId] = useState(0);
  const [displayedScore, setDisplayedScore] = useState<number>(0);

  useEffect(() => {
    if (driverAction.id !== prevId) {
      setDisplayedScore(0);
    }
    setPrevActionId(driverAction.id);
    const latestScore = Math.abs(driverAction?.score || 0);
    if (displayedScore !== latestScore) {
      const intervalId = setInterval(() => {
        setDisplayedScore((prevValue) => {
          if (prevValue === latestScore) {
            clearInterval(intervalId);
            return prevValue;
          }
          return prevValue + 1;
        });
      }, 2);
      return () => clearInterval(intervalId);
    }
  }, [driverAction.id, prevId, driverAction.score, displayedScore]);

  return (
    <S.ScoreBar $scoreStartValue={displayedScore} score={driverAction?.score}>
      <S.ScoreLabelWrapper>
        <S.ScoreLabelImage
          label={driverAction?.label}
          score={driverAction?.score}
          safeDriving={driverAction?.safe_driving}
        />
        <S.ScoreLabelTitle>
          {driverAction?.safe_driving
            ? "안전운전"
            : ACTION_LABEL[driverAction?.label as ActionLabel]}
        </S.ScoreLabelTitle>
      </S.ScoreLabelWrapper>
    </S.ScoreBar>
  );
}
