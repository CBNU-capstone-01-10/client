// COMPONENT: 실시간 안전 점수 로그
import getElapsedTime from "../../../../_utils/time";
import { IDriverActionResponse } from "../../types/type";
import {
  ACTION_LABEL,
  ActionLabel,
  MAX_LIVE_SCORE_LOG_SIZE,
} from "../../../../constants/constants";
import * as S from "./live-score-log.style";

interface ILiveScoreLogProps {
  driverActions?: IDriverActionResponse[] | undefined;
}
export default function LiveScoreLog({ driverActions }: ILiveScoreLogProps) {
  return (
    <S.LiveScoreLogWrapper>
      {driverActions?.length === 0 ? (
        <div>최대 {MAX_LIVE_SCORE_LOG_SIZE} 건의 최근 기록이 표시됩니다</div>
      ) : (
        driverActions?.map((actionItem) => (
          <S.LiveScoreLogItem key={actionItem.id}>
            <S.ScoreWrapper score={actionItem.score}>
              {actionItem.score}
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
}
