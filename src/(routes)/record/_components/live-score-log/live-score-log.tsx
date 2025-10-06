import { memo } from "react";
import {
  getElapsedTime,
  convertSecondsToMinutes,
} from "../../../../_utils/time";
import {
  ACTION_LABEL,
  ActionLabel,
  MAX_LIVE_SCORE_LOG_SIZE,
} from "../../../../constants/constants";
import * as S from "./live-score-log.style";
import { useDriverActionsStore } from "../../../../store/use-driver-actions";

/**
 * COMPONENT: 실시간 안전 점수 로그
 */
export default memo(function LiveScoreLog() {
  const { driverActions } = useDriverActionsStore();
  const [, ...notLatestRecentActions] = driverActions;

  return (
    <S.LiveScoreLogWrapper>
      {notLatestRecentActions?.length === 0 ? (
        <div>최대 {MAX_LIVE_SCORE_LOG_SIZE} 건의 최근 기록이 표시됩니다</div>
      ) : (
        notLatestRecentActions?.map((actionItem) => (
          <S.LiveScoreLogItem key={actionItem.id}>
            <S.ScoreWrapper score={actionItem.score}>
              {actionItem.safe_driving
                ? `${convertSecondsToMinutes(actionItem.score)}분`
                : actionItem.score}
            </S.ScoreWrapper>
            <S.ContentWrapper>
              <S.Label>
                {ACTION_LABEL[actionItem.label as ActionLabel] ||
                  "안전 운전 유지"}
              </S.Label>
              <S.ElapsedTime>
                {getElapsedTime(actionItem.recorded_at)}
              </S.ElapsedTime>
            </S.ContentWrapper>
          </S.LiveScoreLogItem>
        ))
      )}
    </S.LiveScoreLogWrapper>
  );
});
