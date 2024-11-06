// STORE: 운전자 행위 관련 전역 상태 스토어
import { create } from "zustand";
import { IDriverActionResponse } from "../(routes)/record/types/type";
import { MAX_LIVE_SCORE_LOG_SIZE } from "../constants/constants";

interface IDriverActionsState {
  driverActions: IDriverActionResponse[];
  addDriverAction: (driverAction: IDriverActionResponse) => void;
}
export const useDriverActionsStore = create<IDriverActionsState>((set) => ({
  driverActions: [],

  // 새로 받은 score 추가
  addDriverAction: (newDriverAction: IDriverActionResponse) => {
    set((state) => {
      const recentAction = state.driverActions[0]; // 가장 최근 데이터를 가져옴

      // 배열이 비어있거나 label이 다를 경우 새로운 action 추가
      if (!recentAction || recentAction.label !== newDriverAction.label) {
        // 큐의 최대 크기를 초과하면 마지막 요소 제거
        const updatedDriverActions =
          state.driverActions.length === MAX_LIVE_SCORE_LOG_SIZE
            ? state.driverActions.slice(0, -1)
            : state.driverActions;

        return { driverActions: [newDriverAction, ...updatedDriverActions] };
      } else {
        // label이 동일한 경우 최근 action의 score만 업데이트
        return {
          driverActions: [
            { ...recentAction, score: newDriverAction.score },
            ...state.driverActions.slice(1),
          ],
        };
      }
    });
  },
}));
