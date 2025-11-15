import supabase from '@/supabase/supabase';

export const insertScrap = async (boardId: string, profileId: string) => {
  try {
    const { error: insertScrapError } = await supabase.from('scrap').insert({
      profile_id: profileId,
      board_id: boardId,
    });
    if (insertScrapError) {
      throw new Error('게시글 스크랩을 실패했습니다.');
    }
    return { result: 'success' };
  } catch (error) {
    console.error('게시글 스크랩을 실패했습니다.');
    return null;
  }
};
export const deleteScrap = async (boardId: string, profileId: string) => {
  try {
    const { error: deleteScrapError } = await supabase.from('scrap').delete().match({
      board_id: boardId,
      profile_id: profileId,
    });
    if (deleteScrapError) {
      throw new Error('게시글 스크랩 삭제를 실패했습니다.');
    }
    return { result: 'success' };
  } catch (error) {
    console.error('게시글 스크랩 삭제를 실패했습니다.');
    return null;
  }
};

export const selectScrap = async (boardId: string, profileId: string) => {
  try {
    const { data: selectScrapData, error: selectScrapError } = await supabase
      .from('scrap')
      .select('*')
      .match({
        board_id: boardId,
        profile_id: profileId,
      });

    if (selectScrapError) {
      throw new Error('게시글 스크랩 조회를 실패했습니다.');
    }
    return selectScrapData;
  } catch (error) {
    console.error('게시글 스크랩 조회를 실패했습니다.');
    return null;
  }
};
