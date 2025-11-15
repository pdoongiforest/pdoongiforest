import type { FieldError, Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import EditPencil from '/icons/edit_pencil.svg';
import { useRef, useState } from 'react';
import type { ProfileData, ProfileFormData } from './FormSection';

interface Props {
  errors: FieldError | undefined;
  control: Control<ProfileFormData>;
  profileData: ProfileData | null;
  onDirtyChange: () => void;
}

function ImageSection({ errors, control, profileData, onDirtyChange }: Props) {
  const profileImageRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // 이미지 소스 결정: 새로 선택한 파일 > 폼의 값 > 기본 프로필 이미지
  const getImageSrc = (formValue: File | string | null) => {
    if (imageFile) return URL.createObjectURL(imageFile); // 새로 업로드한 파일 우선
    if (typeof formValue === 'string' && formValue) return formValue; // form value 우선
    return '/images/너굴.png'; // 최종 fallback
  };

  return (
    <div className="relative w-40 h-40 rounded-lg bg-white">
      <Controller
        key={profileData?.profile_images || '/images/너굴.png'}
        control={control}
        name="profile_images"
        defaultValue={profileData?.profile_images}
        render={({ field: { value, onChange } }) => (
          <>
            <img
              src={getImageSrc(value)}
              alt="프로필 이미지"
              className="w-40 h-40 rounded-lg bg-white object-cover"
            />
            <button
              type="button"
              className="absolute -bottom-3 -right-4 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
              onClick={() => profileImageRef.current?.click()}
              aria-label="프로필 이미지 변경"
            >
              <img src={EditPencil} alt="edit-pencil" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={profileImageRef}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  setImageFile(file);
                  onChange(file);
                  onDirtyChange();
                }
              }}
              className="hidden"
            />
          </>
        )}
      />
      {errors && <span className="text-red-500 text-sm">{errors.message}</span>}
    </div>
  );
}

export default ImageSection;
