import type { Tables } from '@/supabase/database.types';
import MemberCard from './MemberCard';
import { useEffect, useState } from 'react';
import supabase from '@/supabase/supabase';
import { useAuth } from '@/features/auth/AuthProvider';

type Approve = Tables<'study_approve'> & {
  nickname: Profile['nickname'];
  profile_images: Profile['profile_images'];
};
type Profile = Tables<'user_profile'>;

function ApproveMember() {
  const { profileId } = useAuth();
  const [approveMember, setApproveMember] = useState<Approve[] | null>([]);

  const requestMember = approveMember?.filter((v) => v.status === '0');

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('study_approve').select('*,user_profile(*)');
      if (error) console.log('가입 요청 불러오기 실패');
      if (data) setApproveMember(data);
    };
    fetch();
  }, []);

  return (
    <>
      <h2 className="text-2xl">가입요청</h2>
      <ul>
        {requestMember?.map(({ id, nickname, profile_images }) => (
          <li key={id}>
            <MemberCard
              variants="approve"
              profileId={profileId ?? ''}
              nickname={nickname ?? '멤버'}
              src={profile_images ?? ''}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
export default ApproveMember;
