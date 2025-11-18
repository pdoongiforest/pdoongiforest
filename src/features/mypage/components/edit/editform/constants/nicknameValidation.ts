/**
 * 닉네임 validation 규칙 상수
 */
export const NICKNAME_VALIDATION = {
  minLength: { value: 2, message: '최소 2자 이상 입력해주세요.' },
  maxLength: { value: 8, message: '최대 8자 이하 입력해주세요.' },
  pattern: {
    value: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]+$/,
    message: '한글, 영문, 숫자만 입력해주세요.',
  },
} as const;

export const NICKNAME_DESCRIPTION = '다른 사용자에게 표시될 이름입니다. (최대 8자)';
