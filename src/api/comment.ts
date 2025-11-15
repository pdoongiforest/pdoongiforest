import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';

export const insertComment = async (boardId: string, profileId: string, content: string) => {
  try {
    const { error: insertCommentError } = await supabase.from('comment').insert({
      board_id: boardId,
      profile_id: profileId,
      content: content,
    });
    if (insertCommentError) {
      throw new Error('댓글 등록 중 에러가 발생했습니다.');
    }
    return { result: 'success' };
  } catch (error) {
    console.error('댓글 등록 중 에러가 발생했습니다.');
    return null;
  }
};

export const selectCommentList = async (boardId: string): Promise<Tables<'comment'>[] | null> => {
  try {
    const { data: selectCommentList, error: selectCommentError } = await supabase
      .from('comment')
      .select('*')
      .eq('board_id', boardId)
      .order('created_at', { ascending: false });
    if (selectCommentError) {
      throw new Error('댓글 등록 중 에러가 발생했습니다.');
    }
    return selectCommentList;
  } catch (error) {
    console.error('댓글 등록 중 에러가 발생했습니다.');
    return null;
  }
};
