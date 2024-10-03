import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Mock Adapter 인스턴스 생성
const mock = new MockAdapter(axios);

// 성공 응답 예제 데이터
const successResponse = {
  id: "",
  label: "한손운전",
  score: -10,
  location_x: 0,
  location_y: 0,
  capture: "",
  recorded_at: "",
  user_id: 1,
};

// 목업 설정 함수
export const setupMockForActions = () => {
  mock.onPost("/api/actions").reply((config) => {
    // FormData의 각 필드를 분해할당
    let captureFile: File | null = null;
    let location_x: string | null = null;
    let location_y: string | null = null;

    // FormData 반복문을 사용하여 각 필드의 값을 추출
    for (const [key, value] of config.data.entries()) {
      if (key === "capture" && value instanceof File) {
        captureFile = value;
      } else if (key === "location_x") {
        location_x = value as string;
      } else if (key === "location_y") {
        location_y = value as string;
      }
    }

    // // 디버깅 로그
    // console.log("🚀 ~ Capture File:", captureFile);
    // console.log("🚀 ~ Location X:", location_x);
    // console.log("🚀 ~ Location Y:", location_y);

    // 검증 조건 예시: 각 필드가 존재하지 않을 때의 처리
    if (!captureFile) {
      return [400, { message: '"file" is required' }];
    } else if (!location_x) {
      return [400, { message: '"location_x" is required' }];
    } else if (!location_y) {
      return [400, { message: '"location_y" is required' }];
    }

    // 서버 오류 시나리오
    if (captureFile && location_x && location_y === undefined) {
      return [
        500,
        { message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      ];
    }

    // 모든 조건이 만족되었을 때 성공 응답
    const newId = uuidv4();
    successResponse.id = newId;
    successResponse.location_x = parseFloat(location_x);
    successResponse.location_y = parseFloat(location_y);
    successResponse.recorded_at = new Date().toISOString();

    return [201, successResponse];
  });
};
