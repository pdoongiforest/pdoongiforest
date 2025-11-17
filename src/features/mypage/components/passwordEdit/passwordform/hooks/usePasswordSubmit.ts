import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UseFormSetError } from 'react-hook-form';
import { updatePassword } from '@/features/mypage/api/updatePassword';
import { PASSWORD_VALIDATION_MESSAGES } from '../constants/passwordValidation';
import { useToast } from '@/shared/utils/useToast';

interface PasswordFormData {
  newPassword: string;
  newPasswordConfirm: string;
}

interface UsePasswordSubmitProps {
  profileId: string | null;
  setError: UseFormSetError<PasswordFormData>;
  onSuccess?: () => void;
}

/**
 * 비밀번호 변경 폼 제출 로직 hook
 */
export const usePasswordSubmit = ({ profileId, setError, onSuccess }: UsePasswordSubmitProps) => {
  const navigate = useNavigate();
  const { success, error: errorToast } = useToast();

  const onSubmit = useCallback(
    async (data: PasswordFormData) => {
      if (!profileId) {
        setError('newPassword', {
          type: 'manual',
          message: '프로필 정보를 불러올 수 없습니다.',
        });
        return;
      }

      try {
        await updatePassword(data.newPassword);

        // submit 성공 시 콜백 호출
        onSuccess?.();

        // navigate는 다음 이벤트 루프에서 실행하여 상태가 확실히 반영되도록 함
        setTimeout(() => {
          navigate(`/mypage/${profileId}`);
        }, 0);
        success('비밀번호가 변경되었습니다.');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : PASSWORD_VALIDATION_MESSAGES.updateFailed;
        setError('newPassword', {
          type: 'manual',
          message,
        });
        errorToast('비밀번호 변경에 실패했습니다.');
        throw error;
      }
    },
    [profileId, setError, navigate, onSuccess]
  );

  return { onSubmit };
};
