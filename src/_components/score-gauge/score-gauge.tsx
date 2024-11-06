// COMPONENT: 점수 게이지
import { useEffect, useState } from "react";
import * as S from "./score-gauge.stlye";
import { useDriverActionsStore } from "../../store/use-driver-actions";
import { ACTION_LABEL, ActionLabel } from "../../constants/constants";
import WangnooniLottieLogo from "../wangnooni-logo/wangnooni-lottie-logo";

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
      {/* 라벨 표시 */}
      {driverActions.length === 0 ? (
        <>
          <WangnooniLottieLogo height="12rem" />
          <S.DefaultTitle>오늘 하루도 안전운전하세요!</S.DefaultTitle>
        </>
      ) : (
        <S.ScoreBar
          $scoreStartValue={displayedScore}
          score={driverActions[0]?.score}
        >
          <S.ScoreLabelWrapper>
            <S.ScoreLabelImage
              label={driverActions[0]?.label}
              score={driverActions[0]?.score}
              safeDriving={driverActions[0]?.safe_driving}
            />
            <S.ScoreLabelTitle>
              {driverActions[0]?.safe_driving
                ? "안전운전"
                : ACTION_LABEL[driverActions[0]?.label as ActionLabel]}
            </S.ScoreLabelTitle>
          </S.ScoreLabelWrapper>
        </S.ScoreBar>
      )}
    </S.Container>
  );
}
