import supabase from '@/supabase/supabase';

export async function getUserData(profile_id: string) {
  const { data, error } = await supabase
    .from('user_profile')
    .select('*')
    .eq('profile_id', profile_id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return [];
  console.log(data);
  return data;
}
