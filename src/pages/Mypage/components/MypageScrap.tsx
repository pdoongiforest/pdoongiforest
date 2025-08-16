import { useEffect, useState } from 'react';
import type { Tables } from 'src/supabase/database.types';
import supabase from '@/supabase/supabase';
import useFetchUserData from '../hooks/useFetchUserData';
import RenderPostAndScrap from './RenderPostAndScrap';


type Board = Tables<'board'>;

interface Props {
  profileId: string;
}

function MypageScrap({ profileId }: Props) {
  const [boards, setBoards] = useState<Board[] | null>(null);
  const scraps = useFetchUserData('scrap',profileId);

  useEffect(() => {
    const fetchBoards = async () => {
      if (!scraps) return;
      const data = await Promise.all(
        scraps.map(async (scrap) => {
          const { data, error } = await supabase
            .from('board')
            .select('*')
            .eq('board_id', scrap.board_id)
            .single();

          if (error) return console.error('보드 불러오기 실패');

          return data;
        })
      );
      if (!data) return;
      setBoards(data);
    };

    fetchBoards();
  }, [scraps]);

  return (
      <RenderPostAndScrap category='scrap' data={boards}/>
  );
}
export default MypageScrap;
