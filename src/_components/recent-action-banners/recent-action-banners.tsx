import { useDriverActionsStore } from "../../store/use-driver-actions";
import ScoreGauge from "../score-gauge/score-gauge";
import WangnooniLottieLogo from "../wangnooni-logo/wangnooni-lottie-logo";
import * as S from "./recent-action-banners.style";
import beepSoundFile from "../../../public/assets/sounds/beep-warning.ogg";
import { useEffect, useRef } from "react";
import LiveScoreLog from "../../(routes)/record/_components/live-score-log/LiveScoreLog";

export default function RecentActionBanners() {
  const { driverActions } = useDriverActionsStore();

  // 첫 번째 action과 나머지 action들로 분리
  const [mostRecentAction, ...restActions] = driverActions;

  // 이전 action의 id를 저장하기 위한 ref
  const previousActionIdRef = useRef(-1);

  useEffect(() => {
    // 가장 최근의 action이 있고, 이전 id와 다를 경우에만 소리 재생
    if (
      mostRecentAction?.label &&
      mostRecentAction.id !== previousActionIdRef.current
    ) {
      const audio = new Audio(beepSoundFile);
      audio.play();

      // 현재 action의 id를 ref에 저장하여 다음 비교에 사용
      previousActionIdRef.current = mostRecentAction.id;
    }
  }, [mostRecentAction]); // mostRecentAction이 변경될 때마다 실행

  return (
    <>
      <S.ActionBannerWrapper>
        <S.ActionBanner>
          {driverActions.length === 0 ? (
            <>
              <WangnooniLottieLogo height="12rem" />
              <S.DefaultTitle>오늘 하루도 안전운전하세요!</S.DefaultTitle>
            </>
          ) : (
            <>
              <ScoreGauge driverAction={mostRecentAction} />
            </>
          )}
        </S.ActionBanner>
      </S.ActionBannerWrapper>
      {/* 실시간 점수 히스토리 */}
      <LiveScoreLog driverActions={restActions} />
    </>
  );
}
