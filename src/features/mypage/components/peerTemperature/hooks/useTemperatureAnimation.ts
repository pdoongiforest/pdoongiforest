import gsap from 'gsap';
import { useEffect, useRef } from 'react';

/**
 * 온도 바 애니메이션을 관리하는 hook
 */
export const useTemperatureAnimation = (score: number) => {
  const temperatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (temperatureRef.current) {
      gsap.to(temperatureRef.current, {
        width: `${score}%`,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, [score]);

  return temperatureRef;
};
