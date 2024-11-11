// 모든 전역 상태를 초기화하는 함수
import { useDriverActionsStore } from "./use-driver-actions";
import { useUserStore } from "./use-user-store";

export const useResetAllStore = () => {
  const { resetDriverActions } = useDriverActionsStore(); // 최근 action
  const { clearUserId } = useUserStore(); // 사용자 id

  const resetAllGlobalState = () => {
    resetDriverActions();
    clearUserId();
  };

  return resetAllGlobalState;
};
