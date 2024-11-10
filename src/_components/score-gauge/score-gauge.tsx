// COMPONENT: 점수 게이지
import { useEffect, useState } from "react";
import {
  ACTION_LABEL,
  ActionLabel,
  DEG_ROTATE_PER_SEC,
} from "../../constants/constants";
import { IDriverActionResponse } from "../../(routes)/record/types/type";
import { usePostCoin } from "../../api/coin";
import CoinLottieLogo from "../coin/coin-lottie-logo";
import * as S from "./score-gauge.stlye";

const MAX_GAUGE = 360 / DEG_ROTATE_PER_SEC;
interface ScoreGaugeProps {
  driverAction: IDriverActionResponse;
}
export default function ScoreGauge({ driverAction }: ScoreGaugeProps) {
  const [prevId, setPrevActionId] = useState(0);
  const [displayedScore, setDisplayedScore] = useState<number>(0); // 게이지가 채워지는 정도
  const { mutate: requestCoin } = usePostCoin();

  // 피드백이 바뀌면 게이지 및 이전 id 초기화
  useEffect(() => {
    if (driverAction.id !== prevId) {
      setDisplayedScore(0);
      setPrevActionId(driverAction.id);
    }
  }, [driverAction.id, prevId]);

  useEffect(() => {
    let latestScore;
    // 위험운전인 경우 풀게이지로 표시
    if (!driverAction.safe_driving) {
      latestScore = 360;
      // 안전운전인 경우 (점수 % MAX_GAUGE)를 게이지 갱신 주기로 설정
    } else {
      latestScore = driverAction?.score % MAX_GAUGE;
    }
    if (displayedScore !== latestScore) {
      setDisplayedScore(latestScore);
    }
    if (displayedScore === MAX_GAUGE - 1) {
      requestCoin();
    }
  }, [driverAction.score]);

  return (
    <>
      <S.ScoreBar $scoreStartValue={displayedScore} score={driverAction?.score}>
        <S.ScoreLabelWrapper>
          {displayedScore === MAX_GAUGE - 1 ? (
            <CoinLottieLogo />
          ) : (
            <>
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
            </>
          )}
        </S.ScoreLabelWrapper>
      </S.ScoreBar>
    </>
  );
}
