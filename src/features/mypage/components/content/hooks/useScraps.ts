import { useState, useEffect, useCallback } from 'react';
import { getScraps, type ScrapData } from '@/features/mypage/api/getScraps';

/**
 * 스크랩 목록 조회 hook
 */
export const useScraps = (profileId: string | undefined) => {
  const [scraps, setScraps] = useState<ScrapData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScraps = useCallback(async () => {
    if (!profileId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getScraps(profileId);
      setScraps(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : '스크랩 목록을 불러오는데 실패했습니다.';
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => {
    fetchScraps();
  }, [fetchScraps]);

  return { scraps, loading, error, refetch: fetchScraps };
};
