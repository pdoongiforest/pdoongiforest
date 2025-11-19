import { useAuth } from '@/features/auth/AuthProvider';
import ApproveMember from '@/features/team/components/setting/ApproveMember';
import ChannelName from '@/features/team/components/setting/ChannelName';

import Management from '@/features/team/components/setting/Management';
import type { StudyWithBoard } from '@/features/team/types/types';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Setting() {
  const { study } = useOutletContext<StudyWithBoard>();
  const { profileId } = useAuth();
  const navigate = useNavigate();
  const { profile_id } = study;

  if (profile_id !== profileId) {
    // alert('운영자만 접근할 수 있습니다.');
    navigate(-1);
    return;
  }
  return (
    <main className="flex flex-col gap-10 ">
      <section className="flex flex-col gap-3">
        <ChannelName study={study} />
      </section>
      <section className="flex flex-col gap-3">
        <ApproveMember />
      </section>
      <section className="flex flex-col gap-3">
        <Management adminId={profile_id} />
      </section>
    </main>
  );
}
export default Setting;
