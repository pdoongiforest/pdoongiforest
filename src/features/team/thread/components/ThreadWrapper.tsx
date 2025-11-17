import { useState } from 'react';

import tw from '@/shared/utils/tw';

import ThreadInput from './ThreadInput';
import ThreadList from './ThreadListRefactor';
import { useParams } from 'react-router-dom';
import type { ThreadWithUser } from '../threadType';

interface Props {
  isReplyPress: boolean;
  setIsReplyPress: React.Dispatch<React.SetStateAction<boolean>>;
}
function ThreadWrapper({ isReplyPress, setIsReplyPress }: Props) {
  const [threadData, setThreadData] = useState<ThreadWithUser[]>([]);
  const { id } = useParams();

  return (
    <>
      <div
        className={tw(
          'w-full max-w-[1200px] mx-auto pt-20 pb-[140px]',
          isReplyPress && 'max-w-[1000px] mx-0'
        )}
      >
        <ThreadList
          threadData={threadData}
          setThreadData={setThreadData}
          id={id ?? ''}
          isReplyPress={isReplyPress}
          setIsReplyPress={setIsReplyPress}
        />
        <div
          className={tw(
            'fixed bottom-0 w-full max-w-[1200px] mx-auto max-h-[300px] z-10 bg-bgc pr-6 pt-5 pb-10',
            isReplyPress && 'max-w-[1000px] pr-0'
          )}
        >
          <ThreadInput setThreadData={setThreadData} id={id ?? ''} />
        </div>
      </div>
    </>
  );
}
export default ThreadWrapper;
