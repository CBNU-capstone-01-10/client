// 조회 원하는 최근 시간 간격
export const DESIRED_BEFORE_MINUTES = 30;
// 운전자 이미지 정보 서버로 보내는 주기
export const SEND_DRIVER_IMAGE_INTERVAL_TIME = 1000;
// 실시간 점수 로그 최대 개수
export const MAX_LIVE_SCORE_LOG_SIZE = 5;
// 요일
export const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// 운전 중 행위 라벨에 대응하는 이미지 경로
export const IMAGE_MAP: Record<string, string> = {
  휴대폰: "assets/phone.png",
  졸음: "assets/drowsy.png",
  흡연: "assets/cigarette.png",
};
