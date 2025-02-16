// MOCKUP: 목업함수들을 모아서 한 번에 초기화해주는 함수 (개발시에만 적용)
import { setupMockForRegister } from "./account";
import { setupMockForActions } from "./action";
import { setupMockForUser } from "./user";
import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "../src/api/axios-instance";

const setupMockFns = {
  setupMockForRegister,
  setupMockForActions,
  setupMockForUser,
};

export default function setupMock() {
  const mock = new MockAdapter(axiosInstance);
  if (import.meta.env.VITE_ENABLE_MOCK === "true") {
    Object.values(setupMockFns).forEach((setupMockFn) => setupMockFn(mock));
    console.log(
      "Axios Mock Adapter가 활성화되어 axios 요청을 가로챌 준비가 되었습니다."
    );
  } else {
    mock.restore();
    console.log("Axios Mock Adapter가 비활성화 되었습니다.");
  }
}
