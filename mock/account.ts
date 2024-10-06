import MockAdapter from "axios-mock-adapter";

// 성공 응답 예제 데이터
const successResponse = {
  id: 224,
  username: "testUser",
  email: "wonza4372@nav.com",
  pfp: "",
  created_at: "2024-09-18T14:38:59.341Z",
  updated_at: "2024-09-18T14:38:59.341Z",
};

// 목업 설정 함수
export const setupMockForRegister = (mock: MockAdapter) => {
  mock.onPost("/api/register").reply((config) => {
    const requestData = JSON.parse(config.data);

    if (!requestData.email.includes("@")) {
      return [400, { message: "유효하지 않은 이메일입니다." }];
    } else if (requestData.email === "already@registered.com") {
      return [409, { message: "이미 등록된 이메일입니다." }];
    } else if (requestData.username === "errorUser") {
      return [
        500,
        { message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      ];
    }

    return [200, successResponse];
  });
};
