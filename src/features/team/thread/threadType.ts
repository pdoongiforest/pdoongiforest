import type { Tables } from '@/supabase/database.types';

export type User = Tables<'user_profile'> & {
  user_base: Tables<'user_base'>;
};

export type ReplyWithUser = ThreadReply & {
  user_profile: User;
};

export type Thread = Tables<'thread'> & {
  isFirstThread: boolean;
};
export type ThreadReply = Tables<'thread_reply'>;

export type ThreadFile = {
  url: string;
  type: 'image' | 'video';
  order: number;
};

export type UserData = Tables<'user_profile'>;

export type ThreadWithUser = Tables<'thread'> & {
  user_profile: Tables<'user_profile'> & {
    user_base: Tables<'user_base'>;
  };
};

export type ThreadContextValue = {
  data: Thread;
  onDelete: () => void;
  replyData?: ReplyWithUser[];
  timeStamp: string;
  thread_id: string;
  created_at: string | null;
  like_user: string[] | null;
  content: string | null;
  setContent: React.Dispatch<React.SetStateAction<string | null>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  files: ThreadFile[] | null;
  setFiles: React.Dispatch<React.SetStateAction<ThreadFile[] | null>>;
  reply: ReplyWithUser[];
  setReply: React.Dispatch<React.SetStateAction<ReplyWithUser[]>>;
  isReplyPress: boolean;
  setIsReplyPress: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
