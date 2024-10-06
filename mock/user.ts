import successResponseData from "./response/self-response.json";
import MockAdapter from "axios-mock-adapter";

// MOCKUP: 사용자 관리 관련 목업
export const setupMockForUser = (mock: MockAdapter) => {
  mock.onGet("/api/self").reply(() => {
    return [200, successResponseData["get-self"]];
  });

  console.log(
    "Axios Mock Adapter가 활성화되어 axios 요청을 가로챌 준비가 되었습니다."
  );
};
