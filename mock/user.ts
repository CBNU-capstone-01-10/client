import successResponseData from "./response/self-response.json";
import MockAdapter from "axios-mock-adapter";

// MOCKUP: 사용자 관리 관련 목업
export const setupMockForUser = (mock: MockAdapter) => {
  mock.onGet("/api/self").reply(() => {
    return [200, successResponseData["get-self"]];
  });
};
