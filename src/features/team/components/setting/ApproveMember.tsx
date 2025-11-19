import type { TeamOutlet } from '../../types/types';
import MemberCard from './MemberCard';
import { useOutletContext } from 'react-router-dom';

function ApproveMember() {
  const { approves } = useOutletContext<TeamOutlet>();

  const requestMember = approves.filter((user) => user.status === '0').map((a) => a.user_profile);
  return (
    <>
      <h2 className="text-2xl">가입요청</h2>
      <ul>
        {requestMember.length > 0 ? (
          requestMember.map(({ user_id, profile_id, nickname, profile_images }) => (
            <li key={user_id}>
              <MemberCard
                variants="approve"
                profileId={profile_id}
                nickname={nickname}
                src={profile_images}
              />
            </li>
          ))
        ) : (
          <li>가입 요청이 없습니다.</li>
        )}
      </ul>
    </>
  );
}
export default ApproveMember;
