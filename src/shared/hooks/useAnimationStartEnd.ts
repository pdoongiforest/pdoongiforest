import { useEffect, useState } from 'react';
import gsap from 'gsap';

type AnimationConfig = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

type Props = {
  ref: React.RefObject<HTMLElement | null>;
  configOpen: AnimationConfig;
  configClose: AnimationConfig;
  showModal: boolean;
};

export function useAnimationStartEnd({ ref, configOpen, configClose, showModal }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (showModal) {
      setVisible(true);
      const tl = gsap.timeline();
      gsap.set(ref.current, { ...configOpen.from });
      tl.to(ref.current, {
        ...configOpen.to,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else if (visible) {
      // ✅ 닫을 때도 새로 만들기
      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      });
      tl.to(ref.current, {
        ...configClose.to,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }, [showModal, ref, configOpen, configClose, visible]);

  return { visible, setVisible };
}
