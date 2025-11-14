import { useEffect, useState } from 'react';
import MemberCard from './MemberCard';
import supabase from '@/supabase/supabase';

function Management() {
  const [member, setMember] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('study_member').select('*');
      if (error) console.error();
      if (data) setMember(data);
    };
    fetch();
  }, []);

  console.log(member);

  return (
    <>
      <h2>멤버 관리</h2>
      <div className="flex flex-wrap gap-3">
        {member.map((i) => (
          <MemberCard key={i} variants="member" />
        ))}
      </div>
    </>
  );
}
export default Management;
