import { createContext } from 'react';
import type { ThreadContextValue } from '../threadType';

export const ThreadContext = createContext<ThreadContextValue | null>(null);
