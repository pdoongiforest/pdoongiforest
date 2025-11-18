import { useState } from 'react';
import type { ReplyWithUser, Thread, ThreadFile, UserData } from '../threadType';
import { ThreadContext } from './ThreadContext';
import { commentTime } from '../commentTime';

interface Props {
  children: React.ReactNode;
  data: Thread;
  onDelete: () => void;
  replyData?: ReplyWithUser[];
}

export function ThreadProvider({ children, data, onDelete, replyData }: Props) {
  const { contents, created_at, thread_id, like_user } = data;
  const [content, setContent] = useState(contents);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [files, setFiles] = useState<ThreadFile[] | null>(data.file as ThreadFile[]);
  const [reply, setReply] = useState<ReplyWithUser[]>(replyData ?? []);
  const [isReplyPress, setIsReplyPress] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timeStamp = commentTime(created_at ?? '');

  const value = {
    data,
    onDelete,
    replyData,
    timeStamp,
    thread_id,
    like_user,
    created_at,
    content,
    setContent,
    userData,
    setUserData,
    files,
    setFiles,
    reply,
    setReply,
    isReplyPress,
    setIsReplyPress,
    isOpen,
    setIsOpen,
  };
  return <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>;
}
