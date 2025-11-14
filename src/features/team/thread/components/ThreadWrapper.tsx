import type { Tables } from '@/supabase/database.types';
import ThreadInput from './ThreadInput';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ThreadList from './ThreadList';
type ThreadWithUser = Tables<'thread'> & {
  user_profile: Tables<'user_profile'> & {
    user_base: Tables<'user_base'>;
  };
};
function ThreadWrapper() {
  // wrapper -> ThreadList -> ThreadContent -> ThreadReplyComponents
  // 개별 스레드 안에 우측에서 열리게?
  const [threadData, setThreadData] = useState<ThreadWithUser[]>([]);
  const { id } = useParams();

  return (
    <div className="h-screen w-full">
      <div className="overflow-y-auto h-[calc(100%-200px)] pb-[200px] w-full">
        <ThreadList threadData={threadData} setThreadData={setThreadData} id={id ?? ''} />
      </div>

      <ThreadInput setThreadData={setThreadData} id={id ?? ''} />
    </div>
  );
}
export default ThreadWrapper;
