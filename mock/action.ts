import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import successResponseData from "./response/actions-response.json";

// Mock Adapter 인스턴스 생성
const mock = new MockAdapter(axios);

// Actions 관련 목업
export const setupMockForActions = () => {
  /**
   * GET
   */
  mock.onGet("/api/actions").reply((config) => {
    const { before_m, date_start, date_end } = config.params;

    // 올바른 쿼리 파라미터 조합 및 값인지 검증
    if (before_m && (date_start || date_end)) {
      return [
        400,
        {
          status: 400,
          statusText: "Bad Request",
          message: "bad query parameter combination",
        },
      ];
    }

    if (date_start && date_end && new Date(date_start) > new Date(date_end)) {
      return [
        400,
        {
          status: 400,
          statusText: "Bad Request",
          message: "date_start can not greater than date_end",
        },
      ];
    }

    // 특정 쿼리 파라미터 조합이 없는 경우에도 400 오류 반환
    if (date_start && !date_end) {
      return [
        400,
        {
          status: 400,
          statusText: "Bad Request",
          message: "bad query parameter combination",
        },
      ];
    }

    // 올바른 요청일 때 성공 응답 반환
    if (before_m) {
      return [200, successResponseData["get-recent-actions"]];
    } else {
      return [200, successResponseData["get-recent-seven-days-score"]];
    }
  });

  /**
   * POST
   */
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
    successResponseData["post-actions"].response.id = newId;
    successResponseData["post-actions"].response.location_x =
      parseFloat(location_x);
    successResponseData["post-actions"].response.location_y =
      parseFloat(location_y);
    successResponseData["post-actions"].response.recorded_at =
      new Date().toISOString();

    return [201, successResponseData["post-actions"].response];
  });

  console.log(
    "Axios Mock Adapter가 활성화되어 axios 요청을 가로챌 준비가 되었습니다."
  );
};
