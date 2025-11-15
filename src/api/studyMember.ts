import supabase from '@/supabase/supabase';

export const insertStudyMember = async (profileId: string, studyId: string, authority: string) => {
  if (!profileId || profileId === '') return;
  try {
    const { error: studyInsertError } = await supabase.from('study_member').insert({
      profile_id: profileId,
      study_id: studyId,
      authority,
    });
    if (studyInsertError) {
      throw new Error('채널 멤버 등록 중 에러가 발생하였습니다.');
    }
    return { result: 'success' };
  } catch (error) {
    console.error('채널 멤버 등록중 에러가 발생하였습니다.');
    return { result: 'error' };
  }
};
