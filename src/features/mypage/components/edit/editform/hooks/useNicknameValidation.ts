import { useCallback } from 'react';
import type { UseFormClearErrors, UseFormSetError } from 'react-hook-form';
import { checkNicknameDuplicate } from '@/features/mypage/api/checkNicknameDuplicate';
import type { ProfileFormData } from '../FormSection';

interface UseNicknameValidationProps {
  setError: UseFormSetError<ProfileFormData>;
  clearErrors: UseFormClearErrors<ProfileFormData>;
  currentNickname?: string | null;
}

/**
 * 닉네임 validation을 위한 custom hook
 */
export const useNicknameValidation = ({
  setError,
  clearErrors,
  currentNickname,
}: UseNicknameValidationProps) => {
  // 실시간 중복 체크 핸들러
  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      // 빈 값이면 에러 클리어
      if (!value) {
        clearErrors('nickname');
        return;
      }

      // 중복 체크
      const isDuplicate = await checkNicknameDuplicate(value, currentNickname);
      if (isDuplicate) {
        setError('nickname', { message: '중복된 닉네임입니다.' });
      } else {
        clearErrors('nickname');
      }
    },
    [setError, clearErrors, currentNickname]
  );

  // 비동기 중복 체크 validation 함수
  const validateNickname = useCallback(
    async (
      value:
        | string
        | number
        | string[]
        | { social: string; social_link: string }
        | { social: string; social_link: string }[]
        | File
        | null
    ): Promise<boolean | string> => {
      // nickname은 string 타입이므로 타입 가드
      if (typeof value !== 'string') return true;

      const trimmedValue = value.trim();

      // 빈 값은 다른 validation 규칙에서 처리
      if (!trimmedValue) return true;

      const isDuplicate = await checkNicknameDuplicate(value, currentNickname);
      if (isDuplicate) {
        return '중복된 닉네임입니다.';
      }

      return true;
    },
    [currentNickname]
  );

  return {
    handleChange,
    validateNickname,
  };
};
