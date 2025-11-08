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
  }, [userID, user?.id]);

  useEffect(() => {
    const channel = supabase
      .channel(`status-${userID ?? user?.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_base',
          filter: `user_id=eq.${userID ?? user?.id}`,
        },
        (payload) => {
          console.log(payload);
          const updatedUser = payload.new;
          console.log('Status updated:', updatedUser);
          // if (updatedUser.user_id === user?.id) {
          //   setStatus(updatedUser.status);
          // }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userID, user?.id]);

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
