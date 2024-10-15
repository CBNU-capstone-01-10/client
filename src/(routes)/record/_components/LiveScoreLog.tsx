import { useEffect, useState } from "react";
import OvalLoadingSpinner from "../../../_components/loading-spinner/oval-loading-spinner";
import getElapsedTime from "../../../_utils/time";
import * as S from "../style/LiveScoreLog.style";
import { IDriverActionResponse } from "../types/type";
import { useDriverActionsStore } from "../../../store/use-driver-actions";

// COMPONENT: 실시간 안전 점수 로그
interface ILiveScoreLogProps {
  newDriverAction?: IDriverActionResponse;
}
export default function LiveScoreLog({ newDriverAction }: ILiveScoreLogProps) {
  const { driverActions, addDriverAction } = useDriverActionsStore();

  // 안전 점수 로그 업데이트
  useEffect(() => {
    if (newDriverAction) {
      addDriverAction(newDriverAction);
    }
  }, [newDriverAction, addDriverAction]);

  return (
    <S.LiveScoreLogWrapper>
      {driverActions.length === 0 ? (
        <div>최근 기록 없음</div>
      ) : (
        driverActions?.map((driverActionItem, idx) => (
          // <S.LiveScoreLogItem key={driverActionItem.id}>
          <S.LiveScoreLogItem key={idx}>
            <S.ContentWrapper>
              <S.Content>{driverActionItem.label}</S.Content>
              <S.ElapsedTime>
                {getElapsedTime(driverActionItem.recorded_at)}
              </S.ElapsedTime>
            </S.ContentWrapper>
            <S.ScoreWrapper score={driverActionItem.score}>
              {driverActionItem.score}
            </S.ScoreWrapper>
          </S.LiveScoreLogItem>
        ))
      )}
    </S.LiveScoreLogWrapper>
  );
}
