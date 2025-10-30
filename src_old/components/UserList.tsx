import E from './UserList.module.css';
import { useEffect, useState } from 'react';
import supabase from '@/supabase/supabase';
import type { User } from '@/pages/Mypage/Mypage';
import UserProfile from './UserProfile';
import type UserProfileProp from '@/@types/user';

function UserList() {
  const [userData, setUserData] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: fetchData, error: fetchError } = await supabase
        .from('user_base')
        .select(` *, profile: user_profile(*)`);

      if (fetchData) {
        const filterData = fetchData.filter(
          (user) => user.profile[0].profile_id !== '163205a8-db22-4ed6-b44d-2e12718acb17'
        );
        setUserData(filterData);
      }
      if (fetchError) {
        console.log(fetchError);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('status-list')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_base',
        },
        (payload) => {
          const updatedUser = payload.new;
          if (updatedUser) {
            setUserData((prevData) => {
              if (!prevData) return prevData;
              return prevData.map((user) =>
                user.id === updatedUser.id
                  ? {
                      ...user,
                      status: updatedUser.status,
                    }
                  : user
              );
            });
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const profileData = (user: User): UserProfileProp => {
    return {
      profileImage: user.profile[0].profile_images,
      nickName: user.nickname,
      status: user.status,
      profileId: user.profile[0].profile_id,
      role: user.role,
      age: user.profile[0].age,
    };
  };

  return (
    <ul className={E.recentEnterUser}>
      {userData &&
        userData.map((user) => (
          <li key={user.id} style={{ position: 'relative' }}>
            <UserProfile user={profileData(user)} />
          </li>
        ))}
    </ul>
  );
}

export default UserList;
