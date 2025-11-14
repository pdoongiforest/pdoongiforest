import FormSection from './editform/FormSection';
import EditContainer from '../editContainer/EditContainer';
import Backbtn from '../back/Backbtn';

function InfoChange() {
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
