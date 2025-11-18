import ApproveMember from '@/features/team/components/setting/ApproveMember';
import Management from '@/features/team/components/setting/Management';
import type { StudyWithBoard } from '@/shared/@types/global';
import { useOutletContext } from 'react-router-dom';

function Setting() {
  const { study } = useOutletContext<StudyWithBoard>();

  const { study_id, profile_id } = study;
  return (
    <main className="flex flex-col gap-10 ">
      <section className="flex flex-col gap-3">
        <p className="text-2xl">채널 명</p>
        <label htmlFor="editname" className="sr-only">
          스터디 명 변경하기
        </label>
        <input
          type="text"
          id="editname"
          value={study.board.title}
          className="bg-white px-1 py-2 w-fit"
          placeholder="스터디 명"
        />
      </section>
      <section className="flex flex-col gap-3">
        <ApproveMember studyId={study_id} />
      </section>
      <section className="flex flex-col gap-3">
        <Management studyId={study_id} adminId={profile_id} />
      </section>
    </main>
  );
}
export default Setting;
