import { useCallback } from 'react';
import type { UseFormClearErrors, UseFormSetError } from 'react-hook-form';
import type { ProfileFormData } from '../FormSection';
import { MIN_AGE, MAX_AGE } from '../constants/ageValidation';

interface UseAgeValidationProps {
  setError: UseFormSetError<ProfileFormData>;
  clearErrors: UseFormClearErrors<ProfileFormData>;
}

/**
 * 나이 validation을 위한 custom hook
 */
export const useAgeValidation = ({ setError, clearErrors }: UseAgeValidationProps) => {
  // 실시간 validation 핸들러
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      // 빈 값이면 에러 클리어 (비공개 설정 가능)
      if (!value) {
        clearErrors('age');
        return;
      }

      // 숫자로 변환
      const numValue = Number(value);

      // NaN 체크
      if (isNaN(numValue)) {
        setError('age', { message: '나이는 숫자만 입력 가능합니다.' });
        return;
      }

      // 정수 체크
      if (!Number.isInteger(numValue)) {
        setError('age', { message: '나이는 정수만 입력 가능합니다.' });
        return;
      }

      // 범위 체크
      if (numValue < MIN_AGE) {
        setError('age', { message: `최소 ${MIN_AGE}세 이상 입력해주세요.` });
        return;
      }

      if (numValue > MAX_AGE) {
        setError('age', { message: `최대 ${MAX_AGE}세 이하 입력해주세요.` });
        return;
      }

      // 모든 validation 통과 시 에러 클리어
      clearErrors('age');
    },
    [setError, clearErrors]
  );

  // 비동기 validation 함수 (제출 시 최종 검증용)
  const validateAge = useCallback(
    (
      value:
        | string
        | number
        | string[]
        | { social: string; social_link: string }
        | { social: string; social_link: string }[]
        | File
        | null
    ): boolean | string => {
      // 빈 값은 허용 (비공개 설정 가능)
      if (value === null || value === undefined || value === '') {
        return true;
      }

      // number 타입 체크
      if (typeof value !== 'number' && typeof value !== 'string') {
        return '나이는 숫자만 입력 가능합니다.';
      }

      // 문자열인 경우 숫자로 변환
      const numValue = typeof value === 'string' ? Number(value) : value;

      // NaN 체크
      if (isNaN(numValue)) {
        return '나이는 숫자만 입력 가능합니다.';
      }

      // 정수 체크
      if (!Number.isInteger(numValue)) {
        return '나이는 정수만 입력 가능합니다.';
      }

      // 범위 체크
      if (numValue < MIN_AGE) {
        return `최소 ${MIN_AGE}세 이상 입력해주세요.`;
      }

      if (numValue > MAX_AGE) {
        return `최대 ${MAX_AGE}세 이하 입력해주세요.`;
      }

      return true;
    },
    []
  );

  return {
    handleChange,
    validateAge,
  };
};
