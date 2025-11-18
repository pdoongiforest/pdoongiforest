/**
 * 온도 점수에 따른 색상 반환
 * @param score 0-100 사이의 점수
 * @returns 색상 코드
 */
export const getTemperatureColor = (score: number): string => {
  if (score >= 80) return '#2ecc71'; // 초록
  if (score >= 60) return '#f1c40f'; // 노랑
  if (score >= 40) return '#e67e22'; // 주황
  return '#e74c3c'; // 빨강
};
