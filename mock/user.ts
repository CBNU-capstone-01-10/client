import successResponseData from "./response/self-response.json";
import MockAdapter from "axios-mock-adapter";

// MOCKUP: 사용자 관리 관련 목업
export const setupMockForUser = (mock: MockAdapter) => {
  /**
   * GET
   */
  mock.onGet("/api/users/self").reply(() => {
    return [200, successResponseData["get-self"]];
  });
  /**
   * PUT
   */
  mock.onPut("/api/users/").reply((config) => {
    // config.data는 FormData 형식으로 넘어오므로, 이를 객체로 변환
    const parsedData = {};

    // FormData를 config.data에서 읽기
    // axios-mock-adapter에서는 config.data를 바로 FormData로 접근할 수 없으므로, 아래 방법으로 파싱
    // formData.entries()를 통해 key-value 쌍을 반복 처리하여 parsedData에 할당
    config.data.forEach((value, key) => {
      parsedData[key] = value;
    });

    // 기존 successResponseData를 복사하여 수정 가능한 형태로 변환
    const response = { ...successResponseData["put-self"] };

    // 넘어온 데이터(parsedData)를 바탕으로 response 객체 업데이트
    if (parsedData.pfp) response.pfp = parsedData.pfp.webkitRelativePath; // 프로필 이미지 수정
    if (parsedData.username) response.username = parsedData.username;
    if (parsedData.alias) response.alias = parsedData.alias;
    if (parsedData.address) response.address = parsedData.address;

    // 수정된 response 데이터 반환
    return [200, { response }];
  });
};
