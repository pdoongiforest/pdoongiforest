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
