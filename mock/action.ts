import MockAdapter from "axios-mock-adapter";
import { v4 as uuidv4 } from "uuid";
import successResponseData from "./response/actions-response.json";

// Actions 관련 목업
export const setupMockForActions = (mock: MockAdapter) => {
  /**
   * GET: 다건
   */
  mock.onGet("/api/actions").reply((config) => {
    const { before_m, date_start, date_end, page } = config.params;

    // 올바른 쿼리 파라미터 조합 및 값인지 검증
    if (before_m && (date_start || date_end) && page) {
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
      const allMockData = successResponseData["get-recent-actions"]; // 모든 데이터를 담고 있는 배열
      const itemsPerPage = 10; // 페이지당 아이템 수
      // const totalPages = Math.ceil(allMockData.length / itemsPerPage); // 전체 페이지 수
      // 요청한 페이지에 해당하는 데이터 반환
      const paginatedData = allMockData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );
      return [200, { response: paginatedData }];
    } else {
      return [
        200,
        { response: successResponseData["get-recent-seven-days-score"] },
      ];
    }
  });

  /**
   * GET: 단건
   */
  mock.onGet(new RegExp("/api/actions/\\d+")).reply((config) => {
    const actionId = parseInt(config.url.split("/").pop(), 10);
    const action = successResponseData["get-action"].find(
      (item) => item.id === actionId
    );

    if (action) {
      // 요청에 해당하는 데이터가 있을 때
      return [200, { response: action }];
    } else {
      // 요청에 해당하는 데이터가 없을 때
      return [404, { message: "Action not found" }];
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
    // response 배열에서 랜덤한 인덱스 선택
    const responseArray = successResponseData["post-actions"];
    const randomIndex = Math.floor(Math.random() * responseArray.length);
    const randomResponse = { ...responseArray[randomIndex] };

    // 랜덤하게 선택된 원소의 값 수정
    // const newId = uuidv4();
    // randomResponse.id = newId;
    randomResponse.location_x = parseFloat(location_x);
    randomResponse.location_y = parseFloat(location_y);
    randomResponse.recorded_at = new Date().toISOString();

    // 성공 응답으로 랜덤한 원소 반환
    return [201, { response: randomResponse }];
  });
};
