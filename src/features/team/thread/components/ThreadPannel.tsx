import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import ProfileIcon from '@/shared/assets/character.png';
import { useIsMine } from '@/shared/context/useIsMine';
import supabase from '@/supabase/supabase';
import UploadFile from './UploadFile';
import { showConfirmAlert, showWarningAlert } from '@/shared/utils/sweetAlert';
import { checktype } from '../utils/checktype';
import { useAuth } from '@/features/auth/AuthProvider';
import { commentTime } from '../commentTime';
import { IsMineProvider } from '@/shared/context/isMine';
import ThreadReplyComponent from './ThreadReplyComponent';
import type { ThreadFile } from '../threadType';
import { useThread } from '../hooks/useThread';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  setIsReplyPress: React.Dispatch<React.SetStateAction<boolean>>;
}

function ThreadPannel({ setIsReplyPress }: Props) {
  const {
    data,
    userData,
    setContent,
    content,
    onDelete,
    files,
    setFiles,
    setReply,
    reply,
    isOpen,
    setIsOpen,
  } = useThread();
  const { isMine } = useIsMine();
  const { profileId } = useAuth();
  const { created_at, thread_id } = data;
  const [isEditing, setIsEditing] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const editRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const replyInputRef = useRef<HTMLDivElement | null>(null);
  const timeStamp = commentTime(created_at ?? '');

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent
  ) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const editContent = editRef.current?.innerText.trim() ?? '';
    if (!editContent) setIsEditing(false);

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

  const insertStorage = async (fileList: File[]) => {
    const uploadResults = await Promise.all(
      fileList.map(async (file) => {
        const filepath = `${profileId}/${crypto.randomUUID()}`;
        const { error } = await supabase.storage.from('thread').upload(filepath, file);

        if (error) return null;
        return filepath;
      })
    );

    return uploadResults.filter(Boolean) as string[];
  };

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

  const handleSubmitReply = async () => {
    const contents = inputRef.current?.innerText.trim() ?? '';
    if (!contents && mediaFiles.length == 0) return;

    let uploadedPaths: string[] = [];
    if (mediaFiles.length > 0) {
      uploadedPaths = await insertStorage(mediaFiles);
    }

    const publicURLs = uploadedPaths.map((path) => {
      const { data } = supabase.storage.from('thread').getPublicUrl(path);
      return data.publicUrl;
    });

    const fileList = publicURLs?.map((url, index) => ({
      url,
      type: checktype(url),
      order: index,
    }));

    const { error } = await supabase.from('thread_reply').insert([
      {
        thread_id,
        profile_id: profileId,
        contents,
        file: fileList,
      },
    ]);
    if (error) console.log(error.message);

    const { data: replies } = await supabase
      .from('thread_reply')
      .select('*,user_profile(*,user_base(*))')
      .eq('thread_id', thread_id);
    if (!replies) return;
    setReply(replies);
    setMediaFiles([]);

    if (inputRef.current) {
      inputRef.current.innerHTML = '';
    }

    if (!replyInputRef.current) return;
    const el = replyInputRef.current;
    el.scrollTo({ top: el.scrollHeight + 50 });
  };

  const handleReplyDelete = (targetId: string) => {
    setReply(reply.filter((item) => item.reply_id !== targetId));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitReply();
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave(e);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('image : ', e.target.files);
    if (!e.target.files) return;

    const imageList = Array.from(e.target.files);
    if (mediaFiles.length + imageList.length > 5) {
      showWarningAlert('파일은 5개까지만 등록이 가능합니다');
      return;
    }
    setMediaFiles((prev) => [...prev, ...imageList]);
    e.target.value = '';
  };

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('video : ', e.target.files);
    if (!e.target.files) return;

    const videoList = Array.from(e.target.files);
    if (mediaFiles.length + videoList.length > 5) {
      showWarningAlert('파일은 5개까지만 등록이 가능합니다');
      return;
    }
    setMediaFiles((prev) => [...prev, ...videoList]);
    e.target.value = '';
  };

  const handleDeleteFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    const img = e.target as HTMLImageElement;
    const target = Number(img.closest('button')?.dataset.index);
    const copy = [...mediaFiles];
    const filterFiles = copy.filter((_file, idx) => idx !== target);
    setMediaFiles(filterFiles);
  };

  const handleEditFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = await showConfirmAlert('정말로 삭제하시겠습니까?', '확인을 누르면 삭제됩니다');
    if (!answer.isConfirmed) return;

    const img = e.target as HTMLImageElement;
    const target = Number(img.closest('button')?.dataset.index);
    const fileList = data.file as ThreadFile[];

    const removeFileList = fileList?.filter((_, index) => index !== target);
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

    const newFiles = files?.filter((_, index) => index !== target) || [];
    setFiles(newFiles);
  };

  // const handleReply = () => {
  //   setIsReplyPress(!isReplyPress);
  // };

  useEffect(() => {
    if (isEditing && editRef.current) editRef.current.innerText = content ?? '';
  }, [isEditing, content]);

  return (
    // <div className="w-1/3 h-[calc(100%-120px)] bg-bgc border-l-2 px-8 overflow-y-scroll">
    <div className="fixed z-30 top-20 w-full md:w-120 right-0 bg-bgc  shadow-[-4px_0px_3px_0px_rgba(0,0,0,0.12)] flex flex-col">
      {/* 패널 헤더 */}
      <div className="fixed z-30 flex flex-row items-center gap-6 py-3 w-full px-8 bg-bgc">
        <button type="button" onClick={() => setIsReplyPress(false)}>
          <img
            src="/src/shared/assets/threadBack.svg"
            alt="뒤로가기"
            title="뒤로가기"
            aria-label="뒤로가기"
          />
        </button>
        <p className="text-2xl">스레드</p>
      </div>

      <div className="overflow-y-auto pt-14 px-8 h-[calc(100vh-230px)] pb-10" ref={replyInputRef}>
        <div className="flex justify-between items-center w-full">
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
                  className="mySwiper h-[190px]"
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
        <div className="flex items-center py-8 gap-2">
          <p className="whitespace-nowrap">{reply.length}개의 댓글</p>
          <div className="flex-1 border-b border-border-gray w-full"></div>
        </div>

        {reply &&
          reply.map((item) => {
            return (
              <IsMineProvider key={item.reply_id} writerProfileId={item.profile_id}>
                <ThreadReplyComponent
                  key={item.reply_id}
                  reply={item}
                  onDelete={() => handleReplyDelete(item.reply_id)}
                />
              </IsMineProvider>
            );
          })}
      </div>

      {/* 인풋 */}
      <div className="w-full md:w-120 h-[300px] bg-bgc px-8">
        <div className="fixed bottom-0 w-[calc(100%-60px)] md:w-104 mx-auto max-h-[300px] z-40 pt-5 pb-10 flex flex-col bg-bgc">
          {isOpen && (
            <UploadFile onImageChange={handleImageUpload} onVideoChange={handleVideoUpload} />
          )}
          <form
            onSubmit={handleSubmitReply}
            className="flex justify-between px-5 gap-5 items-center border py-4 rounded-lg border-gray/50"
          >
            <button
              type="button"
              className="rounded-full bg-border-gray min-w-10 h-10 items-center "
              title="파일 업로드하기"
              aria-label="파일 업로드하기"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <p className="text-3xl text-gray">+</p>
            </button>
            <div className="flex flex-col w-full max-h-[200px] overflow-y-auto">
              {mediaFiles.length > 0 && (
                <Swiper
                  slidesPerView="auto"
                  spaceBetween={15}
                  pagination={{
                    clickable: true,
                  }}
                  className="mySwiper h-[190px] w-full pt-5"
                >
                  {mediaFiles.map((file, index) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <SwiperSlide
                        key={index}
                        className="relative h-[190px] w-auto! items-center flex justify-center mt-2"
                      >
                        <button
                          type="button"
                          className="absolute -top-2 -right-3 w-7 h-7"
                          onClick={handleDeleteFile}
                          data-index={index}
                        >
                          <img
                            src="/src/shared/assets/close.svg"
                            alt=""
                            className="w-full h-full"
                          />
                        </button>
                        {file.type.endsWith('mp4') ||
                        file.type.endsWith('mov') ||
                        file.type.endsWith('webm') ? (
                          <video
                            src={url}
                            muted
                            autoPlay
                            className="h-full w-auto object-contain"
                          />
                        ) : (
                          <img
                            src={url}
                            alt={file.name.split('.')[0]}
                            className="h-full w-auto object-contain"
                          />
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
              <div
                aria-placeholder="내용을 입력해주세요"
                contentEditable="true"
                className="w-full min-h-10 focus:outline-none max-h-20 items-center py-2 wrap-break-word block"
                ref={inputRef}
                onKeyDown={handleKeyDown}
              ></div>
            </div>
            <button type="button" onClick={handleSubmitReply}>
              <img src="/src/shared/assets/send.svg" alt="전송" title="전송하기" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ThreadPannel;
