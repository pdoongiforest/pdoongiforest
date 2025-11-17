import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';

export const insertStudy = async (
  profileId: string,
  boardId: string
): Promise<Tables<'study'> | null> => {
  if (!profileId || profileId === '') return null;
  try {
    const { data: studyInsertData, error: studyInsertError } = await supabase
      .from('study')
      .insert({
        profile_id: profileId,
        board_id: boardId,
      })
      .select('*')
      .single();
    if (studyInsertError) {
      throw new Error('채널 생성 중 에러가 발생하였습니다.');
    }
    return studyInsertData;
  } catch (error) {
    console.error('채널 생성 중 에러가 발생하였습니다.');
    return null;
  }
};

export const selectStudy = async (boardId: string): Promise<Tables<'study'> | null> => {
  try {
    const { data: selectStudyData, error: selectStudyError } = await supabase
      .from('study')
      .select('*')
      .eq('board_id', boardId)
      .single();
    if (selectStudyError) {
      throw new Error('채널 조회 중 에러가 발생하였습니다.');
    }
    return selectStudyData;
  } catch (error) {
    console.error('채널 조회 중 에러가 발생하였습니다.');
    return null;
  }
};
