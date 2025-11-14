import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';

export const selectWriterInfo = async (
  profileId: string
): Promise<Tables<'user_profile'> | null> => {
  try {
    const { data: selectWriterInfo, error: selectWriterError } = await supabase
      .from('user_profile')
      .select('*')
      .eq('profile_id', profileId)
      .single();
    if (selectWriterError) throw new Error();
    return selectWriterInfo;
  } catch (error) {
    console.error('프로필 조회 중 에러가 발생하였습니다.');
    return null;
  }
};
