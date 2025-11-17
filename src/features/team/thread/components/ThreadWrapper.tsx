import ThreadInput from './ThreadInput';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ThreadList from './ThreadListRefactor';
import type { ThreadWithUser } from '../threadType';
// import ThreadList from './ThreadList';

function ThreadWrapper() {
  // wrapper -> ThreadList -> ThreadContent -> ThreadReplyComponents
  // 개별 스레드 안에 우측에서 열리게?
  const [threadData, setThreadData] = useState<ThreadWithUser[]>([]);
  const [isReplyPress, setIsReplyPress] = useState(false);
  const { id } = useParams();
  // cva로 DOM 조건 통제하기

  return (
    <>
      {isReplyPress ? (
        <div className="h-screen w-2/3">
          <div className="overflow-y-auto h-[calc(100%-200px)] pb-[100px] w-full">
            <ThreadList
              threadData={threadData}
              setThreadData={setThreadData}
              id={id ?? ''}
              isReplyPress={isReplyPress}
              setIsReplyPress={setIsReplyPress}
            />
          </div>
          <div className="fixed z-10 bottom-50 inset-x-0 h-35 w-2/3 py-10 bg-bgc px-3">
            <ThreadInput setThreadData={setThreadData} id={id ?? ''} />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[1200px] mx-auto pt-[80px] pb-[140px]">
          <div className="overflow-y-auto h-[calc(100%-200px)] pb-[100px] w-full">
            <ThreadList
              threadData={threadData}
              setThreadData={setThreadData}
              id={id ?? ''}
              isReplyPress={isReplyPress}
              setIsReplyPress={setIsReplyPress}
            />
          </div>
          <div className="fixed bottom-0 left-0 w-full h-[140px] z-40 bg-bgc px-3">
            <ThreadInput setThreadData={setThreadData} id={id ?? ''} />
          </div>
        </div>
      )}
    </>
  );
}
export default ThreadWrapper;
