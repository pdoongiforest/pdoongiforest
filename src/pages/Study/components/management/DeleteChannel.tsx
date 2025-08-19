import supabase from '@/supabase/supabase';
import S from './ManagementChannel.module.css';
import { showSuccessDeleteAlert, showWarningDeleteAlert } from '@/utils/sweetAlert';
import { useNavigate } from 'react-router-dom';

function DeleteChannel({ board_id }: { board_id: string }) {
  const navigate = useNavigate();
  const handleDeleteChannel = () => {
    showWarningDeleteAlert(
      '정말 삭제하시겠습니까?',
      '채널의 데이터가 모두 삭제됩니다 되돌릴 수 없습니다'
    ).then((result) => {
      if (result.isConfirmed) {
        const deleteChannel = async () => {
          const { error } = await supabase.from('board').delete().eq('board_id', board_id);

          if (error) {
            console.error('채널 삭제 실패 : ', error.message);
          }

          showSuccessDeleteAlert('삭제가 완료되었습니다', '잠시후 메인으로 이동합니다');
          setTimeout(() => {
            navigate('/');
          }, 500);
        };
        deleteChannel();
      }
    });
  };
  return (
    <section className={S.deleteSection}>
      <h2 className={S.sectionHeader}>채널 제거</h2>
      <button className={S.deleteButton} type="button" onClick={handleDeleteChannel}>
        채널 삭제하기
      </button>
    </section>
  );
}
export default DeleteChannel;
