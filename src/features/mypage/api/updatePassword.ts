import supabase from '@/supabase/supabase';

/**
 * 비밀번호 업데이트
 */
export const updatePassword = async (newPassword: string): Promise<void> => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message || '비밀번호 변경에 실패했습니다.');
  }
};
