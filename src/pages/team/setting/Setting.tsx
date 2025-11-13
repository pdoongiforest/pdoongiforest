import ApproveMember from '@/features/team/components/setting/ApproveMember';
import Management from '@/features/team/components/setting/Management';

function Setting() {
  return (
    <main className="flex flex-col gap-10 ">
      <section className="flex flex-col gap-3">
        <p>채널 명</p>
        <label htmlFor="editname" className="sr-only">
          스터디 명 변경하기
        </label>
        <input type="text" id="editname" className="bg-white px-1 py-2 w-fit" value="스터디 명" />
      </section>
      <section className="flex flex-col gap-3">
        <ApproveMember />
      </section>
      <section className="flex flex-col gap-3">
        <Management />
      </section>
    </main>
  );
}
export default Setting;
