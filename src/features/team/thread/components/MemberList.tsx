import { getThreadMemberList } from '../hooks/getThreadMemberList';
import { useParams } from 'react-router-dom';
import ProfileIcon from '@/shared/assets/character.png';
import { useEffect, useState } from 'react';
import Status from '@/shared/components/Layout/header/components/status/Status';
import tw from '@/shared/utils/tw';

type MemberList = ({
  profile_id: string;
  user_id: string;
  nickname: string | null;
  profile_images: string | null;
  status: string;
} | null)[];

interface Props {
  isReplyPress: boolean;
}

function MemberList({ isReplyPress }: Props) {
  const [memberList, setMemberList] = useState<MemberList>();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getThreadMemberList(id ?? '');
      setMemberList(data);
    };
    fetchData();
  }, [id]);
  console.log(memberList);

  return (
    <div
      className={tw(
        'flex gap-3 px-3 pb-2.5 border-b border-border-gray',
        isReplyPress && 'max-w-[1000px]'
      )}
    >
      {memberList &&
        memberList.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              type="button"
              className="w-10 h-10 mb-1 flex items-center justify-center rounded-full cursor-pointer bg-white relative"
            >
              <img
                src={member?.profile_images ?? ProfileIcon}
                alt={member?.nickname ? `${member.nickname}님의 프로필 이미지` : '프로필 이미지'}
                className="object-cover w-full h-full"
              />
              <Status userID={member?.user_id} />
            </button>
            <p className="text-center text-xs">{member?.nickname}</p>
          </div>
        ))}
    </div>
  );
}
export default MemberList;
