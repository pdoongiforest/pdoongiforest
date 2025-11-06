import supabase from '@/supabase/supabase';
import type { ProfileData } from '../components/profileModal/ProfileModal';

export const getUserProfile = async (userId: string | undefined): Promise<ProfileData | null> => {
  const { data, error } = await supabase
    .from('user_profile')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const getUserStatus = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_base')
    .select('status')
    .eq('user_id', userId)
    .single();
  if (error) {
    console.error(error);
    return null;
  }

  return data.status;
};
