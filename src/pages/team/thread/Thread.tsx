import MemberList from '@/features/team/thread/components/MemberList';
import ThreadWrapper from '@/features/team/thread/components/ThreadWrapper';
import { useState } from 'react';

function Thread() {
  const [isReplyPress, setIsReplyPress] = useState(false);
  return (
    <div className="relative w-full">
      <MemberList isReplyPress={isReplyPress} />
      <ThreadWrapper isReplyPress={isReplyPress} setIsReplyPress={setIsReplyPress} />
    </div>
  );
}
export default Thread;
