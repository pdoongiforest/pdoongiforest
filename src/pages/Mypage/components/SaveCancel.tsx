import { useCallback } from 'react';
import S from './SaveCancel.module.css';

interface Props {
  onSaveClick: () => void;
  onCancelClick: () => void;
}

function SaveCancel({ onSaveClick, onCancelClick }: Props) {
  const handleSave = useCallback(() => {
    onSaveClick();
  }, [onSaveClick]);

  const handleCancel = useCallback(() => {
    onCancelClick();
  }, [onCancelClick]);

  return (
    <div className={S.buttons}>
      <button onClick={handleSave}>저장</button>
      <button onClick={handleCancel}>취소</button>
    </div>
  );
}

export default SaveCancel;
