import Backbtn from '@/features/mypage/components/back/Backbtn';
import EditContainer from '@/features/mypage/components/editContainer/EditContainer';
import PasswordLogin from '@/features/mypage/components/passwordEdit/PasswordLogin';
import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';

function PasswordChange() {
  const [isDirty, setIsDirty] = useState(false);

  const blocker = useBlocker(isDirty);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const answer = confirm('정말 페이지를 나가시겠어요? 변경 내용이 사라집니다.');
      if (answer) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);

  return (
    <div className="page-layout mt-10 max-w-200">
      <EditContainer>
        <h2 className="text-2xl font-bold text-primary">비밀번호 변경</h2>
        <PasswordLogin onDirtyChange={setIsDirty} />
        <Backbtn />
      </EditContainer>
    </div>
  );
}

export default PasswordChange;
