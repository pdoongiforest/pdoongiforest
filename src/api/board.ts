import type { Tables } from '@/supabase/database.types';
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
  approveCls: string;
};

export const insertBoard = async (
  profileId: string,
  postData: BoardType
): Promise<Tables<'board'> | null> => {
  if (!profileId || profileId === '') return null;
  try {
    const { data: boardInsertData, error: boardInsertError } = await supabase
      .from('board')
      .insert({
        profile_id: profileId,
        title: postData.title,
        contents: postData.contents,
        board_cls: postData.recruitCls,
        deadline: postData.recruitTime,
        recruitment_number: postData.recruitCount,
        approve_cls: postData.approveCls,
        hash_tag: postData.hashTag,
      })
      .select('*')
      .single();
    if (boardInsertError) {
      throw new Error('게시글 작성중 에러가 발생하였습니다.');
    }
    return boardInsertData;
  } catch (error) {
    console.error('게시글 작성 중 에러가 발생하였습니다.');
    return null;
  }
};

export const selectBoardList = async (): Promise<Tables<'board'>[] | null> => {
  try {
    const { data: selectBoardList, error: selectBoardError } = await supabase
      .from('board')
      .select('*');
    if (selectBoardError) {
      throw new Error('게시글 조회 중 에러가 발생하였습니다.');
    }
    return selectBoardList;
  } catch (error) {
    console.error('게시글 조회 중 에러가 발생하였습니다.');
    return null;
  }
};
export const selectBoardInfo = async (boardId: string): Promise<Tables<'board'> | null> => {
  try {
    const { data: selectBoardInfo, error: selectBoardError } = await supabase
      .from('board')
      .select('*')
      .eq('board_id', boardId)
      .single();
    if (selectBoardError) {
      throw new Error('상세 조회 중 에러가 발생하였습니다.');
    }
    return selectBoardInfo;
  } catch (error) {
    console.error('상세 조회 중 에러가 발생하였습니다.');
    return null;
  }
};
export const selectBoardWithScrap = async (profileId: string): Promise<Tables<'board'> | null> => {
  try {
    const { data: selectBoardInfo, error: selectBoardError } = await supabase
      .from('board')
      .select('*,scrap(profile_id)')
      .eq('scrap.profile_id', profileId)
      .single();
    if (selectBoardError) {
      throw new Error('상세 조회 중 에러가 발생하였습니다.');
    }
    return selectBoardInfo;
  } catch (error) {
    console.error('상세 조회 중 에러가 발생하였습니다.');
    return null;
  }
};
