import { useAuth } from '@/features/auth/AuthProvider';
import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';
import { useRef, useState } from 'react';

type ThreadWithUser = Tables<'thread'> & {
  user_profile: Tables<'user_profile'> & {
    user_base: Tables<'user_base'>;
  };
};

interface Props {
  setThreadData: React.Dispatch<React.SetStateAction<ThreadWithUser[]>>;
  id: string;
}

function ThreadInput({ setThreadData, id }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [updateContent, setUpdateContent] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { profileId } = useAuth();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!updateContent.trim()) return;
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!updateContent.trim()) return;

    const { error } = await supabase.from('thread').insert([
      {
        study_id: id,
        profile_id: profileId,
        contents: updateContent,
      },
    ]);

    if (error) console.log(error.message);
    if (!error) setUpdateContent('');
    const { data, error: dataError } = await supabase
      .from('thread')
      .select('*')
      .eq('study_id', id)
      .order('created_at', { ascending: false });
    if (dataError) console.error(dataError);
    if (data) setThreadData(data);
  };

  return (
    <div className="fixed z-10 bottom-0 h-35 w-full py-10 bg-bgc">
      {isOpen && (
        <div className="absolute bottom-33 left-5.5 flex gap-3.5">
          <button
            type="button"
            className="rounded-full bg-border-gray w-10 h-10 flex items-center justify-center"
            title="사진 첨부하기"
            aria-label="사진 첨부하기"
          >
            <img
              src="/src/shared/assets/photo.svg"
              className="w-5 h-5"
              alt="사진 첨부"
              title="사진 첨부하기"
            />
          </button>
          <button
            type="button"
            className="rounded-full bg-border-gray w-10 h-10 flex items-center justify-center"
            title="동영상 첨부하기"
            aria-label="동영상 첨부하기"
          >
            <img
              src="/src/shared/assets/video.svg"
              className="w-5 h-5"
              alt="동영상 첨부"
              title="동영상 첨부하기"
            />
          </button>
        </div>
      )}
      <form className="absolute bottom-10 w-full max-w-[1200px] flex justify-between px-5 gap-5 items-center border py-4 rounded-lg border-gray/50">
        <button
          type="button"
          className="rounded-full bg-border-gray w-11 h-10 items-center"
          title="파일 업로드하기"
          aria-label="파일 업로드하기"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <p className="text-3xl text-gray">+</p>
        </button>
        <input
          type="text"
          className="w-full min-h-10 focus:outline-none"
          ref={inputRef}
          value={updateContent}
          placeholder="내용을 입력해 주세요"
          onChange={(e) => setUpdateContent(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>{' '}
        <button type="button" onClick={handleSubmit}>
          <img src="/src/shared/assets/send.svg" alt="전송" title="전송하기" />
        </button>
      </form>
    </div>
  );
}
export default ThreadInput;
