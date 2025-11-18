/**
 * 비밀번호 validation 규칙 상수
 */
export const PASSWORD_VALIDATION = {
  minLength: 8,
  maxLength: 15,
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
} as const;

/**
 * 비밀번호 validation 메시지
 */
export const PASSWORD_VALIDATION_MESSAGES = {
  minLength: '비밀번호가 너무 짧습니다.',
  maxLength: '비밀번호가 너무 깁니다. 15자 이하로 입력해주세요.',
  pattern: '영문, 숫자, 특수문자를 조합해주세요.',
  mismatch: '비밀번호가 일치하지 않습니다.',
  updateFailed: '비밀번호 변경에 실패했습니다.',
} as const;

/**
 * 비밀번호 필드 description
 */
export const PASSWORD_DESCRIPTIONS = {
  newPassword: '8자 이상의 영문, 숫자, 특수문자를 조합해주세요.',
  newPasswordConfirm: '새 비밀번호를 다시 한 번 입력해주세요.',
} as const;

/**
 * react-hook-form validation 규칙
 */
export const PASSWORD_VALIDATION_RULES = {
  minLength: {
    value: PASSWORD_VALIDATION.minLength,
    message: PASSWORD_VALIDATION_MESSAGES.minLength,
  },
  maxLength: {
    value: PASSWORD_VALIDATION.maxLength,
    message: PASSWORD_VALIDATION_MESSAGES.maxLength,
  },
  pattern: {
    value: PASSWORD_VALIDATION.pattern,
    message: PASSWORD_VALIDATION_MESSAGES.pattern,
  },
} as const;
