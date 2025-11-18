import MemberCard from './MemberCard';
import { useEffect, useState } from 'react';

import type { Tables } from '@/supabase/database.types';
import type { Profile } from '@/shared/@types/global';
import supabase from '@/supabase/supabase';

interface Props {
  studyId: string;
}

type Approve = Tables<'study_approve'> & {
  user_profile: Profile;
};
function ApproveMember({ studyId }: Props) {
  const [approveMember, setApproveMember] = useState<Approve[]>([]);
  const requestMember = approveMember.filter((a) => a.status === '0').map((a) => a.user_profile);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('study_approve')
        .select('*,user_profile(*)')
        .eq('study_id', studyId);

      if (error) throw new Error('가입 요청 불러오기 실패');
      if (data) setApproveMember(data);
    };
    fetch();
  }, [studyId]);

  return (
    <>
      <h2 className="text-2xl">가입요청</h2>
      <ul>
        {requestMember.map(({ user_id, profile_id, nickname, profile_images }) => (
          <li key={user_id}>
            <MemberCard
              variants="approve"
              studyId={studyId}
              profileId={profile_id}
              nickname={nickname}
              src={profile_images}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
export default ApproveMember;
