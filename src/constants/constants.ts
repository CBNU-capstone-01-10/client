// 위치정보 정확도
export const geoOptions = {
  enableHighAccuracy: false, // 정확도 true인 경우, 위치 안 잡힐 확률 높음
  maximumAge: 15000, // 캐쉬 데이터 사용하는 최대 과거 시간
  timeout: 5000, // 요청 시간 초과 허용 시간
};
// 조회 원하는 최근 시간 간격
export const DESIRED_BEFORE_MINUTES = 10080;
// 운전자 이미지 정보 서버로 보내는 주기
export const SEND_DRIVER_IMAGE_INTERVAL_TIME = 1000;
// 실시간 점수 로그 최대 개수
export const MAX_LIVE_SCORE_LOG_SIZE = 20;
// 요일
export const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// 운전 중 행위 라벨에 대응하는 이미지 경로
export const IMAGE_MAP: Record<string, string> = {
  safe_driving: "assets/images/safe.png",
  cellphone: "assets/images/phone.png",
  drowsy: "assets/images/drowsy.png",
  cigarette: "assets/images/cigarette.png",
};
// 위험 운전 응답 label에 대응하는 한글 라벨
export type ActionLabel = "cellphone" | "drowsy" | "cigarette";
export const ACTION_LABEL: Record<ActionLabel, string> = {
  cellphone: "휴대폰 사용",
  drowsy: "졸음운전",
  cigarette: "흡연",
};
// 탭
export const TAB = {
  RECORD: "녹화 화면",
  STATISTICS: "나의 운전 기록",
  PROFILE: "내 정보",
};
// 1초에 회전하는 각도
export const DEG_ROTATE_PER_SEC = 6;
