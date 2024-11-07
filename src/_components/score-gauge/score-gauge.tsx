// COMPONENT: 점수 게이지
import { useEffect, useState } from "react";
import * as S from "./score-gauge.stlye";
import { ACTION_LABEL, ActionLabel } from "../../constants/constants";
import { IDriverActionResponse } from "../../(routes)/record/types/type";
interface ScoreGaugeProps {
  driverAction: IDriverActionResponse; // driverAction의 타입 명시
}
export default function ScoreGauge({ driverAction }: ScoreGaugeProps) {
  // const { driverActions } = useDriverActionsStore();
  const latestScore = Math.abs(driverAction?.score || 0);

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
