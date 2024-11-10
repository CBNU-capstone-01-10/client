// STORE: 로그인한 사용자의 상태
import { create } from "zustand";

interface IUserState {
  userId: number | undefined;
  keepUserId: (userId: IUserState["userId"]) => void;
}
export const useUserStore = create<IUserState>((set) => ({
  userId: undefined,

  keepUserId: (userId) => {
    set(() => ({
      userId: userId,
    }));
  },

  clearUserId: () => {
    set(() => ({
      userId: undefined,
    }));
  },
}));
