import supabase from '@/supabase/supabase';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function StudyTitle() {
  const params = useParams();
  const [studyTitle, setStudyTitle] = useState<Board | null>(null);

  useEffect(() => {
    if (!params.id) return;
    const fetch = async () => {
      const { data, error } = await supabase
        .from('board')
        .select('*')
        .eq('board_id', params.id)
        .maybeSingle();
      if (error) throw new Error('스터디명 가져오기 실패');
      if (data) setStudyTitle(data);
    };
    fetch();
  }, [params.id]);

  if (!studyTitle) return;
  const { title, board_cls } = studyTitle;

  return (
    <header className="flex flex-col gap-1">
      <p className="font-light">{board_cls === 'study' ? '스터디' : '프로젝트'}</p>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
}
export default StudyTitle;
