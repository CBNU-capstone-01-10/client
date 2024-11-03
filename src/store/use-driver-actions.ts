import { create } from "zustand";
import { IDriverActionResponse } from "../(routes)/record/types/type";
import { MAX_LIVE_SCORE_LOG_SIZE } from "../constants/constants";

// STORE: 운전자 행위 관련 전역 상태 스토어
interface IDriverActionsState {
  driverActions: IDriverActionResponse[];
  addDriverAction: (driverAction: IDriverActionResponse) => void;
}
export const useDriverActionsStore = create<IDriverActionsState>((set) => ({
  driverActions: [],

  // 새로 받은 score 추가
  addDriverAction: (newDriverAction: IDriverActionResponse) =>
    set((state) => {
      const recentAction = state.driverActions[0]; // 가장 최근 데이터를 가져옴

      // 가장 최근 데이터와 newDriverAction의 label이 같은지 확인
      if (recentAction && newDriverAction.label === recentAction.label) {
        // label이 같은 경우: recentAction의 score에 newDriverAction의 score를 더함
        // 기존 배열에서 가장 최근 데이터를 업데이트된 score로 변경
        const updatedRecentAction = {
          ...recentAction,
          score: recentAction.score + newDriverAction.score,
        };

        return {
          driverActions: [updatedRecentAction, ...state.driverActions.slice(1)],
        };
      } else {
        // 큐의 최대 크기를 초과하면 마지막 요소 제거
        if (state.driverActions.length === MAX_LIVE_SCORE_LOG_SIZE) {
          state.driverActions.pop();
        }

        // label이 다르면 newDriverAction을 기존 로그에 추가
        return { driverActions: [newDriverAction, ...state.driverActions] };
      }
    }),
}));
