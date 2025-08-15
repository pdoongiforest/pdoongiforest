import { useCallback } from 'react';
import S from './SaveCancel.module.css';

interface Props {
  save: string;
  cancel: string;
  onSaveClick: () => void;
  onCancelClick: () => void;
}

function SaveCancel({ save, cancel, onSaveClick, onCancelClick }: Props) {
  const handleSave = useCallback(() => {
    onSaveClick();
  }, [onSaveClick]);

  const handleCancel = useCallback(() => {
    onCancelClick();
  }, [onCancelClick]);

  return (
    <div className={S.buttons}>
      <button onClick={handleSave}>{save}</button>
      <button onClick={handleCancel}>{cancel}</button>
    </div>
  );
}

export default SaveCancel;
