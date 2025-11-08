import FormSection from './editform/FormSection';
import EditContainer from '../editContainer/EditContainer';
import Backbtn from '../back/Backbtn';
import EditPencil from '/icons/edit_pencil.svg';

function InfoChange() {
  return (
    <div className="page-layout mt-30 max-w-200">
      <EditContainer>
        <h2 className="text-2xl font-bold text-primary">내 정보 수정</h2>
        <div className="flex items-center gap-4 flex-col">
          <div className="relative w-40 h-40 rounded-lg bg-white">
            {/* <img src="" alt="" className="w-40 h-40 rounded-lg bg-white" /> */}
            <button
              type="button"
              className="absolute -bottom-3 -right-4 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
            >
              <img src={EditPencil} alt="edit-pencil" />
            </button>
          </div>
        </div>
        <FormSection />
        <Backbtn />
      </EditContainer>
    </div>
  );
}

export default InfoChange;
