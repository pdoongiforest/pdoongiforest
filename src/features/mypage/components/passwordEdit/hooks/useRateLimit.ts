import { useState, useRef, useEffect } from 'react';
import { RATE_LIMIT } from '../constants/passwordLoginValidation';

/**
 * Rate limiting 로직 hook
 */
export const useRateLimit = () => {
  const [attemptCount, setAttemptCount] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const lockoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Lockout 타이머 정리
  useEffect(() => {
    return () => {
      if (lockoutTimerRef.current) {
        clearTimeout(lockoutTimerRef.current);
      }
    };
  }, []);

  /**
   * Rate limit 체크
   */
  const checkRateLimit = (): { isLocked: boolean; remainingMinutes?: number } => {
    const now = Date.now();
    if (lockoutUntil && now < lockoutUntil) {
      const remainingMinutes = Math.ceil((lockoutUntil - now) / 60000);
      return { isLocked: true, remainingMinutes };
    }
    return { isLocked: false };
  };

  /**
   * 실패 시 시도 횟수 증가 및 lockout 처리
   */
  const handleFailedAttempt = (): boolean => {
    const now = Date.now();
    const newAttemptCount = attemptCount + 1;

    if (newAttemptCount >= RATE_LIMIT.maxAttempts) {
      const newLockoutUntil = now + RATE_LIMIT.lockoutDuration;
      setLockoutUntil(newLockoutUntil);
      setAttemptCount(0);

      // Lockout 타이머 설정
      if (lockoutTimerRef.current) {
        clearTimeout(lockoutTimerRef.current);
      }
      lockoutTimerRef.current = setTimeout(() => {
        setLockoutUntil(null);
      }, RATE_LIMIT.lockoutDuration);

      return true; // lockout 발생
    }

    setAttemptCount(newAttemptCount);
    return false; // lockout 없음
  };

  /**
   * 성공 시 리셋
   */
  const reset = () => {
    setAttemptCount(0);
    setLockoutUntil(null);
    if (lockoutTimerRef.current) {
      clearTimeout(lockoutTimerRef.current);
      lockoutTimerRef.current = null;
    }
  };

  /**
   * 현재 lockout 상태 확인
   */
  const isLocked = (): boolean => {
    if (!lockoutUntil) return false;
    return Date.now() < lockoutUntil;
  };

  /**
   * 남은 시간(분) 계산
   */
  const getRemainingMinutes = (): number | null => {
    if (!lockoutUntil) return null;
    const now = Date.now();
    if (now >= lockoutUntil) return null;
    return Math.ceil((lockoutUntil - now) / 60000);
  };

  return {
    checkRateLimit,
    handleFailedAttempt,
    reset,
    isLocked,
    getRemainingMinutes,
  };
};
