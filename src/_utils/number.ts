/**
 * 숫자 배열의 합을 반환하는 함수
 * @param numbers 숫자 배열
 * @returns 배열 내 모든 숫자 요소의 합
 */
export const calculateNumberSum = (numbers: number[]) => {
  return numbers.reduce((a, b) => a + b, 0);
};
