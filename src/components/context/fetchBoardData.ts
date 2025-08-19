import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';

export type Board = Tables<'board'> & { board_tag: Tables<'board_tag'>[] };

export async function fetchBoardData(): Promise<Board[]> {
  const { data, error } = await supabase
    .from('board')
    .select('*,board_tag(*)')
    .eq('active', true)
    .order('create_at', { ascending: false });
  if (error) console.error();
  return data ?? [];
}
export default fetchBoardData;
