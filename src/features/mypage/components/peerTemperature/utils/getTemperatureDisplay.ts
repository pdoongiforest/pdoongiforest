/**
 * 온도 점수를 표시 형식으로 변환 (0-100 -> 0.0-5.0)
 * @param score 0-100 사이의 점수
 * @returns 표시할 온도 값 (예: "4.5°")
 */
export const getTemperatureDisplay = (score: number): string => {
  return `${(score / 20).toFixed(1)}°`;
};
