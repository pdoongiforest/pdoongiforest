import Backbtn from '../back/Backbtn';
import EditContainer from '../editContainer/EditContainer';
import PasswordForm from './passwordform/PasswordForm';

function PasswordChange() {
  return (
    <div className="page-layout mt-30 max-w-200">
      <EditContainer>
        <h2 className="text-2xl font-bold text-primary">비밀번호 변경</h2>
        <PasswordForm />
        <Backbtn />
      </EditContainer>
    </div>
  );
}

export default PasswordChange;
