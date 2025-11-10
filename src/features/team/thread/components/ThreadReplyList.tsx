import type { Tables } from '@/supabase/database.types';

type User = Tables<'user_profile'> & {
  user_base: Tables<'user_base'>;
};
type ThreadReply = Tables<'thread_reply'>;
type ReplyWithUser = ThreadReply & {
  user_profile: User;
};
interface Props {
  replyList?: ReplyWithUser[];
}

function ThreadReplyList({ replyList }: Props) {
  return <div>ThreadReplyList</div>;
}
export default ThreadReplyList;
