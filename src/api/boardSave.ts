import supabase from '@/supabase/supabase';

interface BaseTagData {
  value: string;
}

type BoardType = {
  title: string;
  contents: string;
  recruitCls: string;
  recruitTime: string;
  recruitCount: number;
  hashTag: BaseTagData[] | null;
};

export const insertBoardSave = async (profileId: string, postData: BoardType) => {
  if (!profileId || profileId === '') return;
  try {
    const { error: boardInsertError } = await supabase.from('board_save').insert({
      profile_id: profileId,
      title: postData.title,
      contents: postData.contents,
      board_cls: postData.recruitCls,
      deadline: postData.recruitTime,
      recruitment_number: postData.recruitCount,
      hash_tag: postData.hashTag,
    });
    if (boardInsertError) {
      throw new Error('게시글 저장 중 에러가 발생하였습니다.');
    }
    return { result: 'success' };
  } catch (error) {
    console.error('게시글 작성 중 에러가 발생하였습니다.');
    return { result: 'error' };
  }
};
export const selectBoardSave = async (profileId: string) => {
  if (!profileId || profileId === '') return;
  try {
    const { data: boardSaveData, error: boardSaveError } = await supabase
      .from('board_save')
      .select('*')
      .eq('profile_id', profileId)
      .single();
    if (boardSaveError) {
      throw new Error('임시 저장 조회 중 에러가 발생하였습니다.');
    }
    return boardSaveData;
  } catch (error) {
    console.error('임시 저장 조회 중 에러가 발생하였습니다.');
    return null;
  }
};
export const deleteBoardSave = async (profileId: string) => {
  if (!profileId || profileId === '') return;
  try {
    const { error: boardSaveError } = await supabase
      .from('board_save')
      .delete()
      .eq('profile_id', profileId);
    if (boardSaveError) {
      throw new Error('임시 저장 삭제 중 에러가 발생하였습니다.');
    }
    return { result: 'success' };
  } catch (error) {
    console.error('임시 저장 삭제 중 에러가 발생하였습니다.');
    return { result: 'error' };
  }
};
