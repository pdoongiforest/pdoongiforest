import { selectWriterInfo } from '@/api/userProfile';
import type { Tables } from '@/supabase/database.types';
import { useEffect, useState } from 'react';

interface Props {
  writerId: string;
}

function Profile({ writerId }: Props) {
  const [writerInfo, setWriterInfo] = useState<Tables<'user_profile'> | null>(null);

  useEffect(() => {
    if (!writerId) return;
    const selectWriter = async () => {
      const data = await selectWriterInfo(writerId);
      if (data) {
        setWriterInfo(data);
      }
    };
    selectWriter();
  }, [writerId]);
  return (
    <div className="flex gap-1 items-center">
      <div className="rounded-lg shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] p-1">
        <img
          src={writerInfo?.profile_images ? writerInfo?.profile_images : '/icons/person.svg'}
          alt="글 작성자 프로필 사진"
        />
      </div>
      <p>{writerInfo?.nickname ?? '프둥이'}</p>
    </div>
  );
}
export default Profile;
