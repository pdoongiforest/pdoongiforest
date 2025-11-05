import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type AnimationConfig = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

type Props = {
  ref: React.RefObject<HTMLElement | null>;
  config: AnimationConfig;
  showModal: boolean;
  setVisible: (visible: boolean) => void;
};

export function useAnimationStartEnd({ ref, config, showModal, setVisible }: Props) {
  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (ref.current && !tweenRef.current) {
      tweenRef.current = gsap.timeline({ paused: true }).fromTo(ref.current, config.from, {
        ...config.to,
        onReverseComplete: () => {
          setTimeout(() => {
            setVisible(false);
          }, 300);
        },
      });
    }

    if (showModal) {
      setVisible(true);
      if (tweenRef.current) {
        tweenRef.current.play();
      }
    } else {
      if (tweenRef.current) {
        tweenRef.current.reverse();
      } else {
        // timteline이 아직 생성되지 않았다면 항상 false
        setVisible(false);
      }
    }
  }, [showModal, ref, config]);
}
