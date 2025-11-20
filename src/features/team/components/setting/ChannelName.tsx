import type { Study } from '@/shared/@types/global';
import { useToast } from '@/shared/utils/useToast';
import supabase from '@/supabase/supabase';
import { useRef, useState } from 'react';

interface Props {
  study: Study;
}

function ChannelName({ study }: Props) {
  const { success } = useToast();
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const inputEditRef = useRef(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
    inputEditRef.current = !inputEditRef.current;
  };

  const handleCancle = () => {
    setIsEdit(false);
  };

  const handleConfirm = async () => {
    const { error } = await supabase
      .from('board')
      .update({
        title: editTitle,
      })
      .eq('board_id', study.board_id);
    if (error) throw new Error('에러');
    success('채녈명이 변경되었습니다.');
    handleEdit();
    window.location.reload();
  };
  return (
    <>
      <p className="text-2xl">채널 명</p>
      <div className="flex gap-3">
        <label htmlFor="editname" className="sr-only">
          스터디 명 변경하기
        </label>
        <input
          type="text"
          id="editname"
          className="px-1 py-2 w-fit border-b border-gray-400"
          placeholder={study.board.title}
          disabled={!inputEditRef.current}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        {isEdit ? (
          <>
            <button className="text-rose-500" onClick={handleCancle}>
              취소
            </button>
            <button onClick={handleConfirm}>확인</button>
          </>
        ) : (
          <button onClick={handleEdit}>수정</button>
        )}
      </div>
    </>
  );
}
export default ChannelName;
