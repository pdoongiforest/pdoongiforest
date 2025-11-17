import supabase from '@/supabase/supabase';

const getProfileData = async (profileId: string | undefined) => {
  if (!profileId) return null;
  const { data, error } = await supabase
    .from('user_profile')
    .select('*, social: user_social(*)')
    .eq('profile_id', profileId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export default getProfileData;
