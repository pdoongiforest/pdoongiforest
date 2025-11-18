import supabase from '@/supabase/supabase';

/**
 * 닉네임 중복 체크 API 함수
 * @param nickname - 체크할 닉네임
 * @param currentNickname - 현재 사용자의 닉네임 (자신의 닉네임은 중복으로 간주하지 않음)
 * @returns 중복 여부 (true: 중복됨, false: 중복 안됨)
 */
export const checkNicknameDuplicate = async (
  nickname: string,
  currentNickname?: string | null
): Promise<boolean> => {
  const trimmedValue = nickname.trim();
  if (!trimmedValue) return false; // 빈 값은 중복 아님

  const { data } = await supabase
    .from('user_profile')
    .select('nickname')
    .eq('nickname', trimmedValue);

  // 나오는 값이 중복된 값이면 true && 내 이전 아이디면 상관 없음
  return !!(data && data.length > 0 && data[0].nickname !== currentNickname);
};
