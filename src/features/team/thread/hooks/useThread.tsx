import { useContext } from 'react';
import { ThreadContext } from '../context/ThreadContext';

export const useThread = () => {
  const ctx = useContext(ThreadContext);
  if (!ctx) {
    throw new Error('useThread must be used within a ThreadProvider');
  }
  return ctx;
};
