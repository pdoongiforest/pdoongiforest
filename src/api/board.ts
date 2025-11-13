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

export const insertBoard = async (profileId: string, postData: BoardType) => {
  if (!profileId || profileId === '') return;
  try {
    const { error: boardInsertError } = await supabase.from('board').insert({
      profile_id: profileId,
      title: postData.title,
      contents: postData.contents,
      board_cls: postData.recruitCls,
      deadline: postData.recruitTime,
      recruitment_number: postData.recruitCount,
      hash_tag: postData.hashTag,
    });
    if (boardInsertError) {
      throw new Error('게시글 작성중 에러가 발생하였습니다.');
    }
    return { result: 'success' };
  } catch (error) {
    console.error('게시글 작성 중 에러가 발생하였습니다.');
    return { result: 'error' };
  }
};
