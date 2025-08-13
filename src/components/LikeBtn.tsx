import { useEffect, useRef, useState } from 'react';
import S from './LikeBtn.module.css'
import supabase from '@/supabase/supabase';
import gsap from 'gsap'


interface Props{
  likes: number | null
  targetId: string,
  table: string,
  columnId:string
}

function LikeBtn({ likes, targetId, table, columnId }: Props) {
  
  useEffect(() => {
    const storedLike = JSON.parse(localStorage.getItem(`like-${targetId}`) ?? 'false');
    setIsPressed(storedLike);
  },[targetId])

  const [cardLike, setCardLike] = useState(likes);
  const [isPressed, setIsPressed] = useState(false);
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

   const pressState = isPressed ? cardLike! - 1 : cardLike! + 1;
   const nextState = !isPressed;

   setCardLike(pressState);
   setIsPressed(!isPressed);
   localStorage.setItem(`like-${targetId}`, JSON.stringify(nextState));

   const { error } = await supabase
     .from(table)
     .update({ likes: pressState })
     .eq(columnId, targetId);

   if (error) {
     console.error('좋아요 업데이트 실패', error.message);
     setCardLike(isPressed ? cardLike! - 1 : cardLike! + 1);
     setIsPressed(!isPressed);
     localStorage.setItem(`like-${targetId}`, JSON.stringify(nextState));
   }
 };

  return (
    <button className={S.likeBtn} onClick={handleLike} ref={likeBtnRef}>
      {isPressed ? (
        <img src="/icons/likeActive.png" alt="" />
      ) : (
        <img src="/icons/like.svg" alt="" />
      )}
      {cardLike}
    </button>
  );
}
export default LikeBtn