import FormSection from './editform/FormSection';
import EditContainer from '../editContainer/EditContainer';
import Backbtn from '../back/Backbtn';
import { useNavigate } from 'react-router-dom';

function InfoChange() {
  const navigate = useNavigate();
  console.log(navigate);

  return (
    <div className="page-layout mt-30 max-w-200">
      <EditContainer>
        <h2 className="text-2xl font-bold text-primary">내 정보 수정</h2>
        <FormSection />
        <Backbtn />
      </EditContainer>
    </div>
  );
}

export default InfoChange;
