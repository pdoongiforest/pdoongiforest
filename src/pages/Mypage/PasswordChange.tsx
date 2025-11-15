import Backbtn from '@/features/mypage/components/back/Backbtn';
import EditContainer from '@/features/mypage/components/editContainer/EditContainer';
import PasswordForm from '@/features/mypage/components/passwordEdit/passwordform/PasswordForm';

function PasswordChange() {
  return (
    <div className="page-layout mt-10 max-w-200">
      <EditContainer>
        <h2 className="text-2xl font-bold text-primary">비밀번호 변경</h2>
        <PasswordForm />
        <Backbtn />
      </EditContainer>
    </div>
  );
}

export default PasswordChange;
