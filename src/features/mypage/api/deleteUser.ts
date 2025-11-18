import supabase from '@/supabase/supabase';

/**
 * 회원 탈퇴 API 호출
 * @param userId - 삭제할 사용자 ID
 * @returns 성공 여부
 */
export const deleteUser = async (userId: string): Promise<void> => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  // 현재 세션에서 access_token 가져오기
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('세션 토큰을 가져올 수 없습니다.');
  }

  const res = await fetch(`${supabaseUrl}/functions/v1/delete-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || '회원 탈퇴 실패');
  }
};
