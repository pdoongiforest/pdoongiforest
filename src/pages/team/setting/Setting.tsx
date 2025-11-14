import Management from '@/features/team/components/setting/Management';
import MemberCard from '@/features/team/components/setting/MemberCard';

function Setting() {
  return (
    <main className="mt-5 flex flex-col gap-10 p-20">
      <section className="flex flex-col gap-3">
        <p>채널 명</p>
        <label htmlFor="editname" className="sr-only">
          스터디 명 변경하기
        </label>
        <input type="text" id="editname" className="bg-white px-1 py-2 w-fit" value="스터디 명" />
      </section>
      <section className="flex flex-col gap-3">
        <h2>가입요청</h2>
        <div>
          <MemberCard variants="approve" />
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <Management />
      </section>
    </main>
  );
}
export default Setting;
