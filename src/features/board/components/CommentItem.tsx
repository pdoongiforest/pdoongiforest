import type { Tables } from '@/supabase/database.types';
import Profile from './Profile';

interface Props {
  commentItem: Tables<'comment'>;
}

function CommentItem({ commentItem }: Props) {
  return (
    <li className="flex flex-col gap-2 mb-10">
      <div className="flex items-center gap-1">
        <Profile writerId={commentItem.profile_id} />
        <p className="text-xs text-gray">14분전</p>
      </div>
      <div className="ml-10 flex flex-col gap-1 ">
        <p>{commentItem.content}</p>
        {/* <div className="text-gray text-xs font-light">
          <button type="button">↪ Reply</button>
          <span>1</span>
        </div> */}
      </div>
      {/* <ul className="ml-10">
        <li>
          <div className="flex items-center gap-1">
            <Profile />
            <p className="text-xs text-gray">14분전</p>
          </div>
          <div className="ml-10 flex flex-col gap-1">
            <p>가입신청했습니다~~</p>
          </div>
        </li>
      </ul> */}
    </li>
  );
}
export default CommentItem;
