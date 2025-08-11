import { useContext } from 'react';
import NotificationContext from './NotificationContext';

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      'useNotification must be used within NotificationProvider'
    );
  return ctx;
}
