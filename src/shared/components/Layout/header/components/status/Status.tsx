import { useAuth } from '@/features/auth/AuthProvider';
import { statusList } from './statusList';
import { useEffect, useState } from 'react';
import { getUserStatus } from '../../api/getUser';
import supabase from '@/supabase/supabase';

export type StatusCode = '0' | '1' | '2' | '3' | null;

interface Props {
  userID?: string;
}

function Status({ userID }: Props) {
  const [status, setStatus] = useState<StatusCode | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;
    const fetchUserStatus = async () => {
      const status = await getUserStatus(userID ?? user?.id);
      if (status) {
        setStatus(status);
      }
    };
    fetchUserStatus();
  }, [user?.id, userID]);

  useEffect(() => {
    const channel = supabase
      .channel(`status-${user?.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_base',
        },
        (payload) => {
          if (payload.new.user_id === user?.id) {
            const updatedUser = payload.new;
            setStatus(updatedUser.status);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return (
    <img
      src={statusList.find((item) => item.code === status)?.icon}
      alt={statusList.find((item) => item.code === status)?.name}
      className="w-4 h-4 absolute -bottom-1 -right-1  rounded-full"
      aria-label={`${statusList.find((item) => item.code === status)?.name} 상태`}
    />
  );
}

export default Status;
