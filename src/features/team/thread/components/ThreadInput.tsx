import { useRef, useState, type ChangeEvent, type MouseEvent } from 'react';

import supabase from '@/supabase/supabase';
import { useAuth } from '@/features/auth/AuthProvider';
import { showWarningAlert } from '@/shared/utils/sweetAlert';
import type { Tables } from '@/supabase/database.types';

import UploadFile from './UploadFile';
import { checktype } from '../utils/checktype';
import { Swiper, SwiperSlide } from 'swiper/react';

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
  const inputRef = useRef<HTMLDivElement | null>(null);
  const { profileId } = useAuth();
  const [files, setFiles] = useState<File[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const contents = inputRef.current?.innerText.trim() ?? '';
    if (!contents && files.length == 0) return;

    let uploadedPaths: string[] = [];
    if (files.length > 0) {
      uploadedPaths = await insertStorage(files);
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

    const { error } = await supabase.from('thread').insert([
      {
        study_id: id,
        profile_id: profileId,
        contents,
        file: fileList,
      },
    ]);

    if (error) console.log('thread 등록 실패 : ', error.message);
    const { data, error: dataError } = await supabase
      .from('thread')
      .select('*')
      .eq('study_id', id)
      .order('created_at', { ascending: false });
    if (dataError) console.error('thread 등록 후 불러오기 실패 : ', dataError);
    if (data) setThreadData(data);
    setFiles([]);

    if (inputRef.current) {
      inputRef.current.innerHTML = '';
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('image : ', e.target.files);
    if (!e.target.files) return;

    const imageList = Array.from(e.target.files);
    if (files.length + imageList.length > 5) {
      showWarningAlert('파일은 5개까지만 등록이 가능합니다');
      return;
    }
    setFiles((prev) => [...prev, ...imageList]);
    e.target.value = '';
  };

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('video : ', e.target.files);
    if (!e.target.files) return;

    const videoList = Array.from(e.target.files);
    if (files.length + videoList.length > 5) {
      showWarningAlert('파일은 5개까지만 등록이 가능합니다');
      return;
    }
    setFiles((prev) => [...prev, ...videoList]);
    e.target.value = '';
  };

  const insertStorage = async (fileList: File[]) => {
    const uploadResults = await Promise.all(
      fileList.map(async (file) => {
        const filepath = `${profileId}/${crypto.randomUUID()}-${file.name}`;
        const { error } = await supabase.storage.from('thread').upload(filepath, file);

        if (error) return null;
        return filepath;
      })
    );

    return uploadResults.filter(Boolean) as string[];
  };

  const handleDeleteFile = (e: MouseEvent<HTMLButtonElement>) => {
    const img = e.target as HTMLImageElement;
    const index = Number(img.closest('button')?.dataset.index);
    // console.log(index);
    const copy = [...files];
    const filterFiles = copy.filter((_file, idx) => idx !== index);
    // console.log(filterFiles);
    setFiles(filterFiles);
  };

  return (
    <div className="flex flex-col w-full">
      {isOpen && <UploadFile onImageChange={handleImageUpload} onVideoChange={handleVideoUpload} />}

      <form className="flex justify-between px-5 gap-5 items-center border py-4 rounded-lg border-gray/50">
        <button
          type="button"
          className="rounded-full bg-border-gray min-w-10 h-10 items-center"
          title="파일 업로드하기"
          aria-label="파일 업로드하기"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <p className="text-3xl text-gray">+</p>
        </button>
        <div className="flex flex-col w-full overflow-y-auto max-h-[200px]">
          {files.length > 0 && (
            <Swiper
              slidesPerView="auto"
              spaceBetween={15}
              pagination={{
                clickable: true,
              }}
              className="mySwiper h-[190px] max-w-[1100px] w-full pt-5"
            >
              {files.map((file, index) => {
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
                      <img src="/src/shared/assets/close.svg" alt="" className="w-full h-full" />
                    </button>
                    {file.type.endsWith('mp4') ||
                    file.type.endsWith('mov') ||
                    file.type.endsWith('webm') ? (
                      <video src={url} muted autoPlay className="h-full w-auto object-contain" />
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
        <button type="button" onClick={handleSubmit}>
          <img src="/src/shared/assets/send.svg" alt="전송" title="전송하기" />
        </button>
      </form>
    </div>
  );
}
export default ThreadInput;
