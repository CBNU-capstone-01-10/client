import { useDriverActionsStore } from "../../store/use-driver-actions";
import ScoreGauge from "../score-gauge/score-gauge";
import { ScoreLabelImage } from "../score-gauge/score-gauge.stlye";
import WangnooniLottieLogo from "../wangnooni-logo/wangnooni-lottie-logo";
import * as S from "./recent-action-banners.style";
import getElapsedTime from "../../_utils/time";

export default function RecentActionBanners() {
  const { driverActions } = useDriverActionsStore();

  // 첫 번째 요소와 나머지 요소들로 분리
  const [mostRecentAction, ...restActions] = driverActions;

  return (
    <S.Container>
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
      {restActions.map((actionItem) => (
        <S.ActionBanner key={actionItem?.id}>
          <S.ActionBannerImage
            label={actionItem?.label}
            score={actionItem?.score}
            safeDriving={actionItem?.safe_driving}
          />
          <S.ActionBannerMetadata>
            {getElapsedTime(actionItem?.recorded_at)}
          </S.ActionBannerMetadata>
        </S.ActionBanner>
      ))}
    </S.Container>
  );
}
