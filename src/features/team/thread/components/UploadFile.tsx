import type { ChangeEvent } from 'react';

interface Props {
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onVideoChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function UploadFile({ onImageChange, onVideoChange }: Props) {
  return (
    <div className="absolute -top-10 flex gap-3.5 pl-5">
      {/* 사진 업로드 */}
      <input
        type="file"
        id="image"
        accept=".jpg, .jpeg, .png, .gif, .avif"
        className="hidden"
        onChange={onImageChange}
        multiple
      ></input>
      <label
        htmlFor="image"
        className="shadow-[2px_2px_2.4px_0px_rgba(0,0,0,0.25)] rounded-full bg-border-gray w-10 h-10 flex items-center justify-center"
      >
        <img
          src="/src/shared/assets/photo.svg"
          className="w-5 h-5"
          alt="사진 첨부"
          title="사진 첨부하기"
        />
      </label>
      {/* 비디오 업로드 */}
      <input
        type="file"
        id="video"
        accept=".mp4, .mov, .webm"
        className="hidden"
        onChange={onVideoChange}
        multiple
      ></input>
      <label
        htmlFor="video"
        className="shadow-[2px_2px_2.4px_0px_rgba(0,0,0,0.25)] rounded-full bg-border-gray w-10 h-10 flex items-center justify-center"
      >
        <img
          src="/src/shared/assets/video.svg"
          className="w-5 h-5"
          alt="동영상 첨부"
          title="동영상 첨부하기"
        />
      </label>
    </div>
  );
}
export default UploadFile;
