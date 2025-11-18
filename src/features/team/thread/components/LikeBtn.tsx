import { useEffect, useRef, useState } from 'react';
import supabase from '@/supabase/supabase';
import gsap from 'gsap';
import { useAuth } from '@/features/auth/AuthProvider';

interface Props {
  likeUser: string[];
  targetId: string;
  table: string;
  columnId: string;
}

function LikeBtn({ likeUser, targetId, table, columnId }: Props) {
  const { profileId } = useAuth();
  useEffect(() => {
    const isNotPressed = likeUser.indexOf(profileId ?? '') === -1;
    setIsPressed(!isNotPressed);
  }, [profileId]);

  const [isPressed, setIsPressed] = useState(false);
  const [likeCount, setLikeCount] = useState(likeUser?.length ?? 0);
  const likeBtnRef = useRef<HTMLButtonElement>(null);

  const handleLike = async () => {
    if (likeBtnRef.current) {
      gsap.fromTo(
        likeBtnRef.current,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power1.out',
        }
      );
    }

    const newLikeUser = isPressed
      ? likeUser.filter((user) => user !== profileId)
      : [...likeUser, profileId];
    if (isPressed) {
      setLikeCount((prev) => Math.min(prev - 1, 0));
    } else {
      setLikeCount((prev) => prev + 1);
    }

    setIsPressed(!isPressed);

    console.log(columnId, targetId);
    const { error } = await supabase
      .from(table)
      .update({ like_user: newLikeUser })
      .eq(columnId, targetId);

    if (error) {
      console.error('좋아요 업데이트 실패', error.message);
      setIsPressed(!isPressed);
    }
  };

  return (
    <button onClick={handleLike} ref={likeBtnRef} className="flex gap-1">
      {isPressed ? (
        <img src="/src/shared/assets/likeActive.svg" alt="좋아요" />
      ) : (
        <img src="/src/shared/assets/like.svg" alt="좋아요" />
      )}
      <span>{likeCount}</span>
    </button>
  );
}
export default LikeBtn;
