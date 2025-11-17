import FormSection from '@/features/mypage/components/edit/editform/FormSection';
import EditContainer from '@/features/mypage/components/editContainer/EditContainer';
import Backbtn from '@/features/mypage/components/back/Backbtn';
import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';

function InfoChange() {
  const [isDirty, setIsDirty] = useState(false);

  const blocker = useBlocker(isDirty);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const answer = confirm('정말 페이지를 나가시겠어요? 변경 내용이 사라집니다.');
      if (answer) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker.state]);

  return (
    <div className="page-layout mt-10 max-w-200">
      <EditContainer>
        <h2 className="text-2xl font-bold text-primary">내 정보 수정</h2>
        <FormSection onDirtyChange={setIsDirty} />
        <Backbtn />
      </EditContainer>
    </div>
  );
}

export default InfoChange;
