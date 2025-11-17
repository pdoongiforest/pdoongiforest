import 'swiper/css';
import '@/features/team/thread/components/swiperCustom.css';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import supabase from '@/supabase/supabase';
import ProfileIcon from '@/shared/assets/character.png';
import { useIsMine } from '@/shared/context/useIsMine';
import { showConfirmAlert, showWarningAlert } from '@/shared/utils/sweetAlert';

import LikeBtn from './LikeBtn';
import { getUserData } from '../hooks/getUserData';
import { convertDay } from '../convertDay';
import { useThread } from '../hooks/useThread';
import type { ThreadFile } from '../threadType';

interface Props {
  isReplyPress: boolean;
  setIsReplyPress: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenThreadId: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ThreadContent({ isReplyPress, setIsReplyPress, setOpenThreadId }: Props) {
  const { isMine } = useIsMine();
  const {
    data,
    setContent,
    replyData,
    setUserData,
    userData,
    setReply,
    thread_id,
    onDelete,
    content,
    created_at,
    timeStamp,
    like_user,
    reply,
  } = useThread();
  const [isEditing, setIsEditing] = useState(false);
  const threadRef = useRef<HTMLLIElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<ThreadFile[] | null>(data.file as ThreadFile[]);

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUserData(data.profile_id);
      setUserData(result);
    };
    fetchUserData();
  }, [data]);

  useEffect(() => {
    if (!threadRef.current) return;
    gsap.fromTo(
      threadRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
    );
  }, []);

  useEffect(() => {
    if (!replyData) return;
    setReply(replyData);
  }, [replyData]);

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent
  ) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const editContent = editRef.current?.innerText.trim() ?? '';
    if (!editContent) {
      setIsEditing(false);
    }

    if (editContent.length === 0 && files?.length === 0) {
      showWarningAlert(
        '빈 내용을 등록할 수 없습니다',
        '한 글자 또는 하나 이상의 파일을 등록해주세요'
      );
      setIsEditing(false);
      return;
    }

    const { error } = await supabase
      .from('thread')
      .update({
        contents: editContent,
      })
      .eq('thread_id', thread_id);
    setContent(editContent);
    setIsEditing(!isEditing);
    if (error) console.error();

    console.log({ threadRef });
    threadRef.current?.scrollIntoView({
      block: 'end',
    });
  };

  const handleReply = () => {
    setOpenThreadId(thread_id);
    setIsReplyPress(!isReplyPress);
  };

  const handleDelete = () => {
    showConfirmAlert('정말로 삭제하시겠습니까?', '확인을 누르면 삭제됩니다').then((result) => {
      if (result.isConfirmed) dataDelete();
    });
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

      const { error } = await supabase.from('thread').delete().eq('thread_id', thread_id);
      if (error) console.error(error);
      if (!error) onDelete?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave(e);
    }
  };

  const handleEditFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = await showConfirmAlert('정말로 삭제하시겠습니까?', '확인을 누르면 삭제됩니다');
    if (!answer.isConfirmed) return;
    if (files?.length === 1 && content?.length === 0) {
      showWarningAlert(
        '빈 내용을 등록할 수 없습니다',
        '한 글자 또는 하나 이상의 파일을 등록해주세요'
      );
      setIsEditing(false);
      return;
    }

    const img = e.target as HTMLImageElement;
    const target = Number(img.closest('button')?.dataset.index);

    const removeFileList = files?.filter((_, index) => index !== target);
    if (!removeFileList) return;
    const newFileList = removeFileList.map((file, index) => ({
      ...file,
      order: index,
    }));
    console.log(newFileList);

    const { error } = await supabase
      .from('thread')
      .update({
        file: newFileList,
      })
      .eq('thread_id', thread_id);
    if (error) console.error();

    setFiles(newFileList);
  };

  useEffect(() => {
    if (isEditing && editRef.current) editRef.current.innerText = content ?? '';
  }, [isEditing, content]);

  return (
    <li ref={threadRef} className="py-8">
      {data.isFirstThread === true && (
        <div className="relative flex w-full mb-4">
          <div className="border-b border-border-gray w-full"></div>
          <div className="absolute left-[calc(50%-108px)] -top-4 px-6 w-fit bg-gray-300 rounded-2xl text-center py-1">
            <p className="whitespace-nowrap">{convertDay(created_at ?? '')}</p>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        {/* 프로필, 닉네임, 시간 */}
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
            <p className="text-center text-gray-400 text-xs">{timeStamp}</p>
          </div>
        </div>
        {isMine && (
          <div className="space-x-1 text-sm relative">
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
              <button type="button" onClick={() => setIsEditing(!isEditing)}>
                수정
              </button>
            )}
            <button type="submit" onClick={handleDelete}>
              삭제
            </button>
          </div>
        )}
      </div>

      <div className="pl-11">
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
              <Swiper
                slidesPerView="auto"
                spaceBetween={15}
                pagination={{
                  clickable: true,
                }}
                className="mySwiper h-[190px] max-w-[1100px] w-full"
              >
                {files.map(({ url, type, order }) => (
                  <SwiperSlide
                    key={order}
                    className="relative h-[190px] w-auto! items-center flex justify-center mt-2"
                  >
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
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </>
        ) : (
          <>
            <p className="whitespace-pre-wrap text-xs pb-4">{content}</p>

            {files && files.length > 0 && (
              <Swiper
                slidesPerView="auto"
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                className="mySwiper h-[190px] max-w-[1100px]"
              >
                {files.map(({ url, type, order }) => (
                  <SwiperSlide
                    key={order}
                    className="relative h-[190px] w-auto! items-center flex justify-center select-none"
                  >
                    {type === 'video' ? (
                      <video src={url} muted autoPlay className="h-full w-auto object-contain" />
                    ) : (
                      <img src={url} className="h-full w-auto object-contain" />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </>
        )}
      </div>

      <div className="flex flex-row gap-7 items-center pl-11 pt-4">
        <LikeBtn
          likeUser={like_user ?? []}
          targetId={thread_id}
          table="thread"
          columnId="thread_id"
        />

        <button type="button" onClick={handleReply} className=" flex flex-row gap-2">
          <img src="/src/shared/assets/reply.svg" alt="댓글" />
          <span>{reply.length}</span>
        </button>
      </div>
    </li>
  );
}
export default ThreadContent;
