import { createContext, useRef } from 'react';

export interface Score {
  handleScore: (id: number) => void;
  getAverage: string;
}
const ScoreContext = createContext<Score | undefined>(undefined);

export function ScoreProvider({ children }: { children: React.ReactNode }) {
  const score = useRef<number>(0);

  const handleScore = (id: number) => {
    score.current += id;
  };

  const getAverage = (score.current / 4).toFixed(1);

  return (
    <ScoreContext.Provider value={{ handleScore, getAverage }}>{children}</ScoreContext.Provider>
  );
}

export default ScoreContext;
