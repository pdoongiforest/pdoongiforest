import { useEffect, useState } from 'react';
import MemberCard from './MemberCard';
import supabase from '@/supabase/supabase';
import type { Tables } from '@/supabase/database.types';
import { useAuth } from '@/features/auth/AuthProvider';

type Study = Tables<'study_member'> & {
  nickname: Profile['nickname'];
  profile_images: Profile['profile_images'];
};
type Profile = Tables<'user_profile'>;

function Management() {
  const { profileId } = useAuth();
  const [member, setMember] = useState<Study[] | null>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('study_member').select('*,user_profile(*)');
      if (error) console.log('가입 멤버 불러오기 실패');
      if (data) setMember(data);
    };
    fetch();
  }, []);

  return (
    <>
      <h2 className="text-2xl">멤버 관리</h2>
      <div className="flex flex-wrap gap-3">
        {member &&
          member.map(({ member_id, profile_images, nickname }) => (
            <MemberCard
              key={member_id}
              profileId={profileId ?? ''}
              src={profile_images ?? ''}
              nickname={nickname ?? '멤버'}
              variants="member"
            />
          ))}
      </div>
    </>
  );
}
export default Management;
