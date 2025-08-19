import type { Tables } from '@/supabase/database.types';
import { createPortal } from 'react-dom';
import type { User } from '../Mypage';
import { useCallback, useEffect, useRef, useState } from 'react';
import supabase from '@/supabase/supabase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import S from './Popup.module.css';
import closeBtn from '/icons/edit_close.svg';
import gsap from 'gsap';

type ImageType = 'profile-backgrounds' | 'profile';

interface Props {
  type: ImageType;
  prevImage: string;
  setPrevImage: (value: string) => void;
  popup: boolean;
  setPopup: (value: boolean) => void;
  profileData: Tables<'user_profile'>;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
}

function Popup({
  type,
  prevImage,
  setPrevImage,
  setPopup,
  popup,
  profileData,
  setUserData,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const container = document.getElementById('standard-container');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popup && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: -20, scale: 0.95, xPercent: -50 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power3.out',
        }
      );
    } else if (!popup && popupRef.current) {
      gsap.to(popupRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [popup]);

  const handleFileUpload = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files.length > 0) {
      const lastFile = files[files.length - 1];
      setFile(lastFile);
      setPrevImage(URL.createObjectURL(lastFile));
    } else {
      setFile(null);
      setPrevImage(prevImage);
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleFileApply = async () => {
    if (!profileData) return;
    const { profile_id } = profileData;

    const default_image =
      type === 'profile'
        ? 'https://tgpjaysqzywmgztzavxe.supabase.co//storage/v1/object/public/profileimages/profile/e564cf92-7719-43db-9803-100bd6cf23f6-profile-1753406546405.jpg'
        : 'https://tgpjaysqzywmgztzavxe.supabase.co/storage/v1/object/public/backgroundimages/profile-backgrounds/e564cf92-7719-43db-9803-100bd6cf23f6-1753344498261.jpg';

    let imageUrl: string | null = null;

    if (!file) {
      imageUrl = default_image;
    } else {
      const fileName = `${profile_id}-${type}-${Date.now()}.jpg`;

      const updateField = type === 'profile' ? 'profileimages' : 'backgroundimages';

      const { error: uploadError } = await supabase.storage
        .from(updateField)
        .upload(`${type}/${fileName}`, file);

      if (uploadError) {
        toast.error('첫번째 업로드 실패!', { autoClose: 1000 });
        return;
      }

      // 파일 URL 생성
      imageUrl =
        type === 'profile'
          ? `https://tgpjaysqzywmgztzavxe.supabase.co/storage/v1/object/public/profileimages/profile/${fileName}`
          : `https://tgpjaysqzywmgztzavxe.supabase.co/storage/v1/object/public/backgroundimages/profile-backgrounds/${fileName}`;
    }

    const updateUrl =
      type === 'profile' ? { profile_images: imageUrl } : { background_images: imageUrl };

    const { error: updateError } = await supabase
      .from('user_profile')
      .update(updateUrl)
      .eq('profile_id', profile_id);

    if (updateError) {
      toast.error('업로드 실패!', { autoClose: 1000 });
      return;
    }

    setUserData((prev) => {
      if (!prev || !prev.profile || !prev.profile.length) {
        console.warn('profile[0] 없음:', prev);
        return prev; // 또는 초기값 만들어서 넣어줘도 됨
      }

      const updatedProfile = {
        ...prev.profile[0],
        ...(type === 'profile-backgrounds'
          ? { background_images: imageUrl }
          : { profile_images: imageUrl }),
      };

      return {
        ...prev,
        profile: [updatedProfile],
      };
    });

    toast.info(
      type === 'profile' ? '프로필 이미지가 적용되었습니다.' : '배경이미지가 적용되었습니다',
      {
        onClose() {
          navigate(`/mypage/${profileData.profile_id}`);
        },
        autoClose: 1500,
      }
    );
    setPopup(false);
  };

  const handleDeleteBtn = () => {
    setPrevImage(type === 'profile' ? '/images/애플.png' : '/images/default_cover.png');

    toast.info('삭제 후 적용버튼을 꼭 눌러주세요.', {
      onClose() {
        navigate(`/mypage/${profileData.profile_id}`);
      },
      autoClose: 1500,
    });
  };

  const handleCloseBtn = () => {
    setPopup(false);
  };

  if (!container) return;

  return createPortal(
    <div className={S.wrapper}>
      <div ref={popupRef} className={type === 'profile' ? S.container : S.backgroundEditContainer}>
        <div className={S.header}>
          <h1>{type === 'profile' ? '프로필 이미지' : '배경 이미지'}</h1>
          <button className={S.closeBtn}>
            <img src={closeBtn} onClick={handleCloseBtn} />
          </button>
        </div>
        <img src={prevImage} className={S.profileImg} />
        <div className={S.buttons}>
          <button type="button" onClick={handleDeleteBtn}>
            삭제
          </button>
          <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="button" onClick={handleFileUpload}>
            업로드
          </button>
          <button type="button" onClick={handleFileApply}>
            적용
          </button>
        </div>
      </div>
    </div>,
    container
  );
}

export default Popup;
