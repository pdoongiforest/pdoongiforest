import { useAuth } from '@/features/auth/AuthProvider';
import { statusList } from './statusList';
import { useEffect, useState } from 'react';
import { getUserStatus } from '../../api/getUser';
import supabase from '@/supabase/supabase';

export type StatusCode = '0' | '1' | '2' | '3' | null;

function Status() {
  const [status, setStatus] = useState<StatusCode | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;
    const fetchUserStatus = async () => {
      const status = await getUserStatus(user?.id);
      if (status) {
        setStatus(status);
      }
    };
    fetchUserStatus();
  }, [user?.id]);

  useEffect(() => {
    const channel = supabase
      .channel(`status-${user?.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_base',
          filter: `user_id=eq.${user?.id}`,
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
  }, [user?.id]);

  return (
    <img
      src={statusList.find((item) => item.code === status)?.icon}
      alt={statusList.find((item) => item.code === status)?.name}
      className="w-4 h-4 absolute -bottom-1 -right-1  rounded-full"
    />
  );
}

export default Status;
