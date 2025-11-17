import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import { deleteUser } from '@/features/mypage/api/deleteUser';
import { useToast } from '@/shared/utils/useToast';

/**
 * 회원 탈퇴 hook
 */
export const useDeleteUser = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { success, error: errorToast } = useToast();

  const handleDelete = useCallback(async () => {
    if (!user?.id) {
      errorToast('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    const result = confirm('정말 회원 탈퇴하시겠습니까?');
    if (!result) return;

    try {
      await deleteUser(user.id);
      success('회원 탈퇴가 완료되었습니다.');
      await logout();
      navigate('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : '회원 탈퇴 중 오류가 발생했습니다.';
      errorToast(message);
      console.error('회원 탈퇴 실패:', error);
    }
  }, [user?.id, logout, navigate, success, errorToast]);

  return { handleDelete };
};
