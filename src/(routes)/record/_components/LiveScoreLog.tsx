import { useEffect, useState } from "react";
import OvalLoadingSpinner from "../../../_components/loading-spinner/oval-loading-spinner";
import getElapsedTime from "../../../_utils/time";
import * as S from "../style/LiveScoreLog.style";
import { IDriverActionResponse } from "../types/type";
import { useQueryClient } from "@tanstack/react-query";

// COMPONENT: 실시간 안전 점수 로그
interface ILiveScoreLogProps {
  newDriverAction?: IDriverActionResponse;
}
export default function LiveScoreLog({ newDriverAction }: ILiveScoreLogProps) {
  const [driverActions, setDriverActions] = useState<IDriverActionResponse[]>(
    []
  );
  const queryClient = useQueryClient();

  // 안전 점수 로그 업데이트
  useEffect(() => {
    if (newDriverAction) {
      setDriverActions((prevActions) => {
        // 기존 데이터를 최신순으로 정렬
        const sortedActions = [...prevActions].sort(
          (a, b) =>
            new Date(b.recorded_at).getTime() -
            new Date(a.recorded_at).getTime()
        );

        // 가장 최근 데이터와 newDriverAction의 label이 같은지 확인
        if (newDriverAction.label === sortedActions[0]?.label) {
          const recentAction = sortedActions[0];

          // score가 양수면 +10, 음수면 -10 적용
          const updatedScore =
            recentAction.score > 0
              ? recentAction.score + 10
              : recentAction.score - 10;

          // 기존 배열에서 가장 최근 데이터를 업데이트된 score로 변경
          sortedActions[0] = { ...recentAction, score: updatedScore };

          return sortedActions;
        } else {
          // label이 다르면 newDriverAction을 기존 로그에 추가
          const updatedActions = [newDriverAction, ...sortedActions];

          return updatedActions;
        }
      });
    }
  }, [newDriverAction, queryClient]);

  return (
    <S.LiveScoreLogWrapper>
      {driverActions?.map((driverActionItem, idx) => (
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
      ))}
    </S.LiveScoreLogWrapper>
  );
}
