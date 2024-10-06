import dayjs from "dayjs";

/**
 * 날짜를 YYYY-MM-DD HH:mm 형식으로 변환하는 함수
 * @param dateString
 * @returns "YYYY-MM-DD HH:mm"
 */
export const getFormattedDate = (dateString: string): string => {
  return dayjs(dateString).format("YYYY/MM/DD HH:mm");
};
