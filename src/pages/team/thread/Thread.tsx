import MemberList from '@/features/team/thread/components/MemberList';
import ThreadWrapper from '@/features/team/thread/components/ThreadWrapper';

function Thread() {
  // document.body.style.overflow = 'hidden';
  return (
    <div className="relative w-screen h-screen items-center">
      <MemberList />
      <ThreadWrapper />
    </div>
  );
}
export default Thread;
