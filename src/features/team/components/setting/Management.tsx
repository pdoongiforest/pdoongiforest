import { useEffect, useState } from 'react';
import MemberCard from './MemberCard';
import supabase from '@/supabase/supabase';
import type { Tables } from '@/supabase/database.types';
import type { Profile } from '@/shared/@types/global';

interface Props {
  studyId: string;
  adminId: string;
}

type Member = Tables<'study_member'> & {
  user_profile: Profile;
};

function Management({ studyId, adminId }: Props) {
  const [member, setMember] = useState<Member[]>([]);

  const studyMember = member.map((a) => a.user_profile).filter((a) => a.profile_id !== adminId);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('study_member')
        .select('*,user_profile(*)')
        .eq('study_id', studyId);
      if (error) throw new Error('가입 멤버 불러오기 실패');
      if (data) setMember(data);
    };
    fetch();
  }, [studyId]);

  return (
    <>
      <h2 className="text-2xl">멤버 관리</h2>
      <div className="flex flex-wrap gap-3">
        {studyMember?.map(({ user_id, profile_id, profile_images, nickname }) => (
          <MemberCard
            key={user_id}
            studyId={studyId}
            profileId={profile_id}
            src={profile_images}
            nickname={nickname}
            variants="member"
          />
        ))}
      </div>
    </>
  );
}
export default Management;
