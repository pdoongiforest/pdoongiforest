import Pencil from '/icons/edit_pencil.svg';
import S from './EditPencil.module.css';
import { useCallback } from 'react';

interface Props {
  onClick: () => void;
}

function EditPencil({ onClick }: Props) {
  const handleFunction = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <>
      <button type="button" className={S.button} onClick={handleFunction}>
        <img src={Pencil} />
      </button>
    </>
  );
}

export default EditPencil;
