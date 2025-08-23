import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';
import { useEffect, useState } from 'react';

export type Board = Tables<'board'> & { board_tag: Tables<'board_tag'>[] };

export function useFetchBoardData() {
  const [postData, setPostData] = useState<Board[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('board')
        .select('*,board_tag(*)')
        .eq('active', true)
        .order('create_at', { ascending: false });
      if (!data) return;
      if (error) console.error();

      setPostData(data);
    };
    fetchData();
  }, []);

  return postData;
}
export default useFetchBoardData;
