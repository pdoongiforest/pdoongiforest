/**
 * 비밀번호 변경 전 재인증 Rate limiting 상수
 */
export const RATE_LIMIT = {
  maxAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15분
} as const;

/**
 * 에러 메시지
 */
export const LOGIN_ERROR_MESSAGES = {
  loginRequired: '로그인이 필요합니다.',
  passwordIncorrect: '비밀번호가 올바르지 않습니다.',
  sessionMismatch: '세션 정보가 일치하지 않습니다.',
  lockout: (minutes: number) => `너무 많은 시도로 인해 ${minutes}분간 로그인이 제한됩니다.`,
  lockoutRemaining: (minutes: number) =>
    `너무 많은 시도로 인해 ${minutes}분간 로그인이 제한됩니다.`,
} as const;

/**
 * 필드 description
 */
export const LOGIN_DESCRIPTIONS = {
  email: '비밀번호 변경을 위해 본인의 이메일을 입력해주세요.',
  password: '비밀번호를 입력해주세요.',
} as const;

/**
 * 버튼 텍스트
 */
export const BUTTON_TEXTS = {
  default: '비밀번호 변경하기',
  lockout: (minutes: number) => `로그인 제한 중 (${minutes}분 남음)`,
} as const;
