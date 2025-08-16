

/*
post : board, profile_id
scrap : scrap, profile_id
peerReview : peer_review, profile_id

*/

import type { Database } from "@/supabase/database.types";
import supabase from "@/supabase/supabase"
import { useEffect, useState } from "react";

type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']


function useFetchUserData<T extends keyof Database['public']['Tables']>(
  tableName:T, 
  profileId:string
):Tables<T>[]|null {
  const [userData, setUserData] = useState<Tables<T>[]|null>(null);
  
  const fetchData = async () => {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .match({
        profile_id:profileId
      });
    if(error) return console.error(`${tableName}에서 데이터 불러오기 실패`);
    setUserData(data);
  }
  useEffect(()=>{fetchData()},[tableName,profileId])
  return userData
}
export default useFetchUserData