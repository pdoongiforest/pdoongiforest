import MemberList from '@/features/team/thread/components/MemberList';
import ThreadWrapper from '@/features/team/thread/components/ThreadWrapper';

function Thread() {
  return (
    <div className="w-[1200px] h-screen items-center outline-1 ">
      <MemberList />
      <ThreadWrapper />
    </div>
  );
}
export default Thread;
