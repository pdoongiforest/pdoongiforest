import { deleteScrap, insertScrap, selectScrap } from '@/api/scrap';
import { useAuth } from '@/features/auth/AuthProvider';
import { showErrorAlert } from '@/shared/utils/sweetAlert';
import { useEffect, useState } from 'react';

interface Props {
  boardId: string;
}

function Scrap({ boardId }: Props) {
  const { profileId } = useAuth();
  const [isScrap, setIsScrap] = useState(false);

  useEffect(() => {
    if (!profileId) return;
    const selectIsScrap = async () => {
      const data = await selectScrap(boardId, profileId);

      if (data && data?.length > 0) {
        setIsScrap(true);
      }
    };
    selectIsScrap();
  }, [profileId]);

  const handleScrap = async () => {
    if (!profileId) {
      await showErrorAlert('게시글 스크랩 실패', '로그인이 필요한 서비스 입니다.');
      return;
    }
    const previousIsScrap = isScrap;
    try {
      setIsScrap((prev) => !prev);
      if (previousIsScrap) {
        const data = await deleteScrap(boardId, profileId);
        if (!data) throw new Error();
      } else {
        const data = await insertScrap(boardId, profileId);
        if (!data) throw new Error();
      }
    } catch (error) {
      setIsScrap(previousIsScrap);
    }
  };
  return (
    <div>
      <button type="button" onClick={handleScrap} aria-lable="개시글 스크랩">
        <img
          src={isScrap ? '/icons/scrapActiveicon.svg' : '/icons/scrapicon.svg'}
          className="fill-amber-300"
          alt="스크랩 아이콘"
        />
      </button>
    </div>
  );
}
export default Scrap;
