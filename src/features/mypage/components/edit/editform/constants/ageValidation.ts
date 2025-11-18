/**
 * 나이 validation 규칙 상수
 */
export const AGE_VALIDATION = {
  min: { value: 1, message: '최소 1세 이상 입력해주세요.' },
  max: { value: 100, message: '최대 100세 이하 입력해주세요.' },
} as const;

export const AGE_DESCRIPTION = '나이를 입력하거나 비공개로 설정할 수 있습니다.';

export const MIN_AGE = 1;
export const MAX_AGE = 100;
