// 경과 시간을 계산하여 문자열로 반환하는 함수
export const getElapsedTime = (recordedAt: string): string => {
  const now = new Date(); // 현재 시간
  const actionTime = new Date(recordedAt); // recorded_at 시간
  const diffInMilliseconds = now.getTime() - actionTime.getTime(); // 현재 시간과 recorded_at 시간의 차이 (밀리초 단위)
  const diffInMinutes = Math.floor(diffInMilliseconds / 60000); // 분 단위로 변환
  const diffInHours = Math.floor(diffInMinutes / 60); // 시간 단위로 변환
  const diffInDays = Math.floor(diffInHours / 24); // 일 단위로 변환

  // 경과 시간에 따른 문자열 반환
  if (diffInMinutes < 1) return "방금 전";
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  return `${diffInDays}일 전`;
};

// 시간을 초에서 분 단위(초 단위 버림)로 변환하는 함수
export const convertSecondsToMinutes = (seconds: number): number => {
  return Math.floor(seconds / 60);
};
