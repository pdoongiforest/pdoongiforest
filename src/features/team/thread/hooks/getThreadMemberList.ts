import supabase from '@/supabase/supabase';

type Member = {
  profile_id: string;
  user_profile: {
    user_id: string;
    nickname: string | null;
    profile_images: string | null;
  };
};

export async function getThreadMemberList(threadID: string) {
  const { data, error } = await supabase
    .from('study_member')
    .select('profile_id, user_profile!inner(user_id, nickname, profile_images)')
    .eq('study_id', threadID)
    .returns<Member[]>();
  if (error) throw error;
  if (!data) return [];
  // console.log(data);
  return await getTheradMemberStatus(data);
}

async function getTheradMemberStatus(
  memberList: {
    profile_id: string;
    user_profile: {
      user_id: string;
      nickname: string | null;
      profile_images: string | null;
    };
  }[]
) {
  const statusList = await Promise.all(
    memberList.map(async ({ profile_id, user_profile }) => {
      // console.log(user_profile.user_id);
      const { data, error } = await supabase
        .from('user_base')
        .select('status')
        .eq('user_id', user_profile.user_id)
        .single();
      if (error) throw error;
      if (!data) return null;
      return {
        profile_id,
        user_id: user_profile.user_id,
        nickname: user_profile.nickname ?? null,
        profile_images: user_profile.profile_images ?? null,
        status: data.status,
      };
    })
  );
  // console.log(statusList);
  return statusList;
}
