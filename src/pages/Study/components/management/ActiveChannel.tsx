import supabase from '@/supabase/supabase';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import S from './ManagementChannel.module.css';

interface Props {
  board_id: string;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ActiveChannel({ board_id, isActive, setIsActive }: Props) {
  const handleActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'active') {
      setIsActive(true);
      toast.success('채널이 활성화되었습니다.', {
        autoClose: 1500,
      });
    } else {
      setIsActive(false);
      toast.success('채널이 비활성화되었습니다.', { autoClose: 1500 });
    }
  };

  useEffect(() => {
    const updateActive = async () => {
      const { error } = await supabase
        .from('board')
        .update({ active: isActive })
        .eq('board_id', board_id);

      if (error) console.error(error);
    };
    updateActive();
  }, [isActive]);

  return (
    <>
      <h1>채널 관리</h1>
      <section className={S.activeGroup}>
        <h2 className={S.sectionHeader}>모집 활성화</h2>
        <section className={S.isActive}>
          <div className={S.active}>
            <input
              type="radio"
              name="isActive"
              id="active"
              checked={isActive === true}
              onChange={handleActive}
            />
            <label htmlFor="active">활성화</label>
          </div>
          <div className={S.inactive}>
            <input
              type="radio"
              name="isActive"
              id="inactive"
              checked={isActive === false}
              onChange={handleActive}
            />
            <label htmlFor="inactive">비활성화</label>
          </div>
        </section>
      </section>
    </>
  );
}
export default ActiveChannel;
