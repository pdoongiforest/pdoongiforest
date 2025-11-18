import S from './Team.module.css';
import { useEffect, useState } from 'react';
import supabase from '@/supabase/supabase';
import { useAuth } from '@/features/auth/AuthProvider';
import BoardCard from '@/features/board/components/BoardCard';
import type { Tables } from '@/supabase/database.types';

type Board = Tables<'board'>;
interface Study {
  board: Board;
  profile_id: string;
  board_id: string;
}

function TeamPage() {
  const { profileId } = useAuth();
  const [myTeams, setMyTeams] = useState<Study[] | null>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('study').select('*,board(*)');
      if (error) console.error('참여 중 스터디 데이터 가져오기 실패');
      if (data) setMyTeams(data);
    };
    fetch();
  }, [profileId]);

  return (
    <div className={S.container}>
      <ul className={S.teamList}>
        {myTeams?.map((team) => (
          <li key={team.board_id}>
            <BoardCard boardInfo={team.board} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamPage;
