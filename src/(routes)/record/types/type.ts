// // 운전자의 운전 중 이미지와 위치정보
// export interface IDriverActionRequestBody {
//   location_x: number;
//   location_y: number;
//   capture: File;
// }
// 운전자의 운전 중 캡처된 이미지에 대한 처리 결과
export interface IDriverActionResponse {
  id: number;
  label: string;
  score: number;
  location_x: string;
  location_y: string;
  capture: string;
  recorded_at: string;
  user_id: number;
}
