import { useContext } from 'react';
import { type Score } from './peerReviewContext';
import peerReviewContext from './peerReviewContext';

export function useReview(): Score {
  const ctx = useContext(peerReviewContext);
  if (!ctx) throw new Error('ScoreContext 에러');
  return ctx;
}
