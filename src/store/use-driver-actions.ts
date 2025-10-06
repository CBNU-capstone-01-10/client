import { create } from "zustand";
import { IDriverActionResponse } from "../(routes)/record/types/type";
import { MAX_LIVE_SCORE_LOG_SIZE } from "../constants/constants";

/**
 * STORE: 운전자 행위 관련
 */
interface IDriverActionsState {
  driverActions: IDriverActionResponse["action"][];
  addDriverAction: (driverAction: IDriverActionResponse["action"]) => void;
  resetDriverActions: () => void;
}
export const useDriverActionsStore = create<IDriverActionsState>((set) => ({
  driverActions: [],

  // 새로 받은 action 추가 (조건부 로직은 API 레이어에서 처리됨)
  addDriverAction: (newDriverAction: IDriverActionResponse["action"]) => {
    set((state) => {
      // 큐의 최대 크기를 초과하면 마지막 요소 제거
      const updatedDriverActions =
        state.driverActions.length === MAX_LIVE_SCORE_LOG_SIZE
          ? state.driverActions.slice(0, -1)
          : state.driverActions;

      return { driverActions: [newDriverAction, ...updatedDriverActions] };
    });
  },
  // 상태 초기화 함수
  resetDriverActions: () => set({ driverActions: [] }),
}));
