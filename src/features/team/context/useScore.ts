import { useContext } from 'react';
import ScoreContext, { type Score } from './ScoreContext';

export function useScore(): Score {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error('ScoreContext 에러');
  return ctx;
}
