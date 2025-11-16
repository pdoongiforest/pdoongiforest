import { useAuth } from '@/features/auth/AuthProvider';
import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';
import { useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import { checktype } from '../utils/checktype';
import UploadFile from './UploadFile';

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
  // const [filePath, setFilePath] = useState<string[]>([]);

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
    // setFilePath([]);
    setFiles([]);

    if (inputRef.current) {
      inputRef.current.innerHTML = '';
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('image : ', e.target.files);
    if (!e.target.files) return;

    const imageList = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...imageList]);
    e.target.value = '';
  };

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('video : ', e.target.files);
    if (!e.target.files) return;

    const videoList = Array.from(e.target.files);
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
    <div className="fixed z-10 bottom-50 inset-x-0 h-35 w-full py-10 bg-bgc px-3">
      <div className="flex flex-col w-full max-w-[1200px] mx-auto">
        {isOpen && (
          <UploadFile onImageChange={handleImageUpload} onVideoChange={handleVideoUpload} />
        )}

        <form className="flex justify-between px-5 gap-5 items-center border py-4 rounded-lg border-gray/50">
          <button
            type="button"
            className="rounded-full bg-border-gray w-11 h-10 items-center"
            title="파일 업로드하기"
            aria-label="파일 업로드하기"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p className="text-3xl text-gray">+</p>
          </button>
          <div className="flex flex-col w-full gap-5">
            <div
              contentEditable="true"
              className="w-full min-h-10 focus:outline-none"
              ref={inputRef}
              onKeyDown={handleKeyDown}
            ></div>
            <div className="flex flex-row gap-5 outline">
              {files.map((file, index) => {
                const url = URL.createObjectURL(file);
                console.log({ url });
                return (
                  <div key={index} className="h-[190px] relative">
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
                  </div>
                );
              })}
            </div>
          </div>
          <button type="button" onClick={handleSubmit}>
            <img src="/src/shared/assets/send.svg" alt="전송" title="전송하기" />
          </button>
        </form>
      </div>
    </div>
  );
}
export default ThreadInput;
