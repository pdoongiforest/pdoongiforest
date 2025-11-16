import { useEffect, useRef, useState } from 'react';
import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';
import { useIsMine } from '@/shared/context/useIsMine';
import { showConfirmAlert } from '@/shared/utils/sweetAlert';
import { commentTime } from '../commentTime';
import { getUserData } from '../hooks/getUserData';
import ProfileIcon from '@/shared/assets/character.png';
import LikeBtn from './LikeBtn';

type ThreadReply = Tables<'thread_reply'>;
interface Prop {
  reply: ThreadReply;
  onDelete: () => void;
}
type UserData = Tables<'user_profile'>;

type ThreadFile = {
  url: string;
  type: 'image' | 'video';
  order: number;
};

function ThreadReplyComponent({ reply, onDelete }: Prop) {
  const { created_at, contents, reply_id } = reply;
  const { isMine } = useIsMine();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(contents);
  const commentTimeCheck = commentTime(created_at ?? '');
  const [userData, setUserData] = useState<UserData>();
  const threadRef = useRef<HTMLLIElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<ThreadFile[] | null>(reply.file as ThreadFile[]);

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUserData(reply.profile_id);
      setUserData(result);
    };
    fetchUserData();
  }, [reply]);
  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent
  ) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const editContent = editRef.current?.innerText.trim() ?? '';
    if (!editContent) setIsEditing(false);

    const { error } = await supabase
      .from('thread_reply')
      .update({
        contents: editContent,
      })
      .eq('reply_id', reply_id);
    setContent(editContent);
    setIsEditing(!isEditing);
    if (error) console.error();

    console.log({ threadRef });
    threadRef.current?.scrollIntoView({
      block: 'end',
    });
  };

  const handleDelete = () => {
    showConfirmAlert('정말로 댓글을 삭제하시겠습니까', '확인을 누르면 삭제됩니다').then(
      (result) => {
        if (result.isConfirmed) dataDelete();
      }
    );
  };

  function extractPath(publicUrl: string) {
    const prefix = `/object/public/thread/`;
    const idx = publicUrl.indexOf(prefix);
    return publicUrl.substring(idx + prefix.length);
  }

  const dataDelete = async () => {
    try {
      const paths = files && files.map((file) => extractPath(file.url));

      if (paths && paths.length > 0) {
        await supabase.storage.from('thread').remove(paths);
      }

      const { error } = await supabase.from('thread_reply').delete().eq('reply_id', reply_id);
      if (error) console.error(error);
      if (!error) onDelete?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // if (!editReply.trim()) return;
      handleSave(e);
    }
  };

  const handleEditFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = await showConfirmAlert('정말로 삭제하시겠습니까?', '확인을 누르면 삭제됩니다');
    if (!answer.isConfirmed) return;

    const img = e.target as HTMLImageElement;
    const target = Number(img.closest('button')?.dataset.index);
    const fileList = reply.file as ThreadFile[];

    const removeFileList = fileList?.filter((_, index) => index !== target);
    const newFileList = removeFileList.map((file, index) => ({
      ...file,
      order: index,
    }));
    console.log(newFileList);

    const { error } = await supabase
      .from('thread_reply')
      .update({
        file: newFileList,
      })
      .eq('reply_id', reply_id);
    if (error) console.error();

    const newFiles = files?.filter((_, index) => index !== target) || [];
    setFiles(newFiles);
  };

  useEffect(() => {
    if (isEditing && editRef.current) editRef.current.innerText = content ?? '';
  }, [isEditing, content]);
  return (
    <li ref={threadRef}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-10 h-10 mb-1 flex items-center justify-center rounded-full cursor-pointer bg-white relative"
          >
            <img
              src={userData?.profile_images ?? ProfileIcon}
              alt={'프로필 이미지'}
              className="object-cover w-full h-full"
            />
          </button>
          <div className="flex items-center gap-1">
            <p className="text-center">{userData?.nickname}</p>
            <p className="text-center text-gray-400 text-xs">{commentTimeCheck}</p>
          </div>
        </div>
        {isMine && (
          <div className="space-x-1 text-sm">
            {isEditing ? (
              <>
                <button type="submit" onClick={handleSave}>
                  저장
                </button>
                <button type="button" onClick={() => setIsEditing(!isEditing)}>
                  취소
                </button>
              </>
            ) : (
              <button type="submit" onClick={() => setIsEditing(!isEditing)}>
                수정
              </button>
            )}

            <button type="submit" onClick={handleDelete}>
              삭제
            </button>
          </div>
        )}
      </div>
      <div className="pl-11 pb-4">
        {isEditing ? (
          <>
            <div
              ref={editRef}
              className="w-full px-3 whitespace-pre-wrap text-xs pb-4"
              contentEditable="true"
              onKeyDown={handleEditKeyDown}
              autoFocus
            />
            {files && files.length > 0 && (
              <div className="flex flex-row gap-5 h-[190px] pb-4">
                {files.map(({ url, type, order }) => (
                  <div key={order} className="relative">
                    <button
                      type="button"
                      className="absolute -top-2 -right-3 w-7 h-7"
                      onClick={(e) => handleEditFile(e)}
                      data-index={order}
                    >
                      <img src="/src/shared/assets/close.svg" alt="" className="w-full h-full" />
                    </button>
                    {type === 'video' ? (
                      <video src={url} muted autoPlay className="h-full w-auto object-contain" />
                    ) : (
                      <img src={url} className="h-full w-auto object-contain" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <p className="whitespace-pre-wrap text-xs pb-4">{content}</p>

            {files && files.length > 0 && (
              <div className="flex flex-row gap-3 h-[190px] pb-4">
                {files.map(({ url, type, order }) => (
                  <div key={order}>
                    {type === 'video' ? (
                      <video src={url} muted autoPlay className="h-full w-auto object-contain" />
                    ) : (
                      <img src={url} className="h-full w-auto object-contain" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex flex-row gap-7 items-center pl-11">
        <LikeBtn
          likeUser={reply.like_user ?? []}
          targetId={reply.thread_id}
          table="thread"
          columnId="thread_id"
        />
      </div>
    </li>
  );
}
export default ThreadReplyComponent;
