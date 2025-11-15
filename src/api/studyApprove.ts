import supabase from '@/supabase/supabase';

export const insertStudyApprove = async (profileId: string, studyId: string, status: string) => {
  if (!profileId || profileId === '') return;
  try {
    const { error: approveInsertError } = await supabase.from('study_approve').insert({
      study_id: studyId,
      profile_id: profileId,
      status,
    });
    if (approveInsertError) {
      throw new Error('스터디 가입 신청 등록 중 에러가 발생하였습니다.');
    }
    return { result: 'success' };
  } catch (error) {
    console.error('스터디 가입 신청 등록 중 에러가 발생하였습니다.');
    return { result: 'error' };
  }
};
