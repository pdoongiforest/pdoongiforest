import { useOutletContext } from 'react-router-dom';
import type { TeamOutlet } from '../../types/types';
import MemberCard from './MemberCard';

interface Props {
  adminId: string;
}

function Management({ adminId }: Props) {
  const { members } = useOutletContext<TeamOutlet>();

  const studyMember = members.map((a) => a.user_profile).filter((a) => a.profile_id !== adminId);

  return (
    <>
      <h2 className="text-2xl">멤버 관리</h2>
      <ul className="flex flex-wrap gap-3">
        {studyMember.length > 0 ? (
          studyMember.map(({ user_id, profile_id, profile_images, nickname }) => (
            <li key={user_id}>
              <MemberCard
                key={user_id}
                profileId={profile_id}
                src={profile_images}
                nickname={nickname}
                variants="member"
              />
            </li>
          ))
        ) : (
          <li>멤버가 없습니다.</li>
        )}
      </ul>
    </>
  );
}
export default Management;
