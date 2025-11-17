import { useCallback, useEffect } from 'react';
import type { UseFormSetError } from 'react-hook-form';
import supabase from '@/supabase/supabase';
import { LOGIN_ERROR_MESSAGES, RATE_LIMIT } from '../constants/passwordLoginValidation';
import { useToast } from '@/shared/utils/useToast';
import { useAuth } from '@/features/auth/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

interface UsePasswordLoginProps {
  user: { id: string; email: string } | null;
  setError: UseFormSetError<LoginFormData>;
  checkRateLimit: () => { isLocked: boolean; remainingMinutes?: number };
  handleFailedAttempt: () => boolean;
  resetRateLimit: () => void;
  onSuccess: () => void;
}

/**
 * 비밀번호 변경 전 재인증 로직 hook
 */
export const usePasswordLogin = ({
  user,
  setError,
  checkRateLimit,
  handleFailedAttempt,
  resetRateLimit,
  onSuccess,
}: UsePasswordLoginProps) => {
  const { profileId: loginId } = useAuth();
  const { id: profileId } = useParams();
  const { success, error: errorToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginId !== profileId) {
      navigate(`/mypage/${profileId}`);
      errorToast('잘못된 접근 입니다.');
      return;
    }
  }, [loginId, profileId]);

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      // 1. 현재 로그인한 사용자 검증
      if (!user) {
        setError('password', {
          type: 'manual',
          message: LOGIN_ERROR_MESSAGES.loginRequired,
        });
        return;
      }

      // 2. Rate limiting 체크
      const rateLimitCheck = checkRateLimit();
      if (rateLimitCheck.isLocked) {
        setError('password', {
          type: 'manual',
          message: LOGIN_ERROR_MESSAGES.lockoutRemaining(rateLimitCheck.remainingMinutes || 0),
        });
        return;
      }

      // 3. 로그인 시도 (서버에서 이메일 검증)
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email: user.email, // 항상 현재 로그인한 사용자의 이메일 사용
        password: data.password,
      });

      if (error) {
        // 4. Rate limiting: 실패 시 시도 횟수 증가
        const isLocked = handleFailedAttempt();

        if (isLocked) {
          setError('password', {
            type: 'manual',
            message: LOGIN_ERROR_MESSAGES.lockout(RATE_LIMIT.lockoutDuration / 60000),
          });
          return;
        }

        setError('password', {
          type: 'manual',
          message: LOGIN_ERROR_MESSAGES.passwordIncorrect,
        });
        return;
      }

      // 5. 로그인 성공: 세션 검증
      if (loginData?.session) {
        // 세션이 유효하고 현재 사용자와 일치하는지 확인
        if (loginData.session.user.id === user.id) {
          resetRateLimit();
          onSuccess();
          success('비밀번호 재인증 성공');
        } else {
          setError('password', {
            type: 'manual',
            message: LOGIN_ERROR_MESSAGES.sessionMismatch,
          });
          errorToast('비밀번호 재인증 실패');
          // 다른 사용자로 로그인한 경우 세션 종료
          await supabase.auth.signOut();
        }
      }
    },
    [user, setError, checkRateLimit, handleFailedAttempt, resetRateLimit, onSuccess]
  );

  return { onSubmit };
};
