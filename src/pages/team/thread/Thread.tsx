import MemberList from '@/features/team/thread/components/MemberList';
import ThreadWrapper from '@/features/team/thread/components/ThreadWrapper';

function Thread() {
  return (
    <div className="relative w-[1200px] h-screen items-center ">
      <MemberList />
      <ThreadWrapper />
    </div>
  );
}
export default Thread;
