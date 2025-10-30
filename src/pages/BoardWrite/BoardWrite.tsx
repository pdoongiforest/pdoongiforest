import BoardForm from './BoardForm';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import BoardUpdate from './BoardUpdate';
import { useAuth } from '@/features/auth/AuthProvider';
import { showErrorAlert } from '@/shared/utils/sweetAlert';
import { ProfileImageProvider } from '@/shared/context/useProfileImage';
import { BoardProvider } from '@/shared/context/useBoardContext';
import { HashTagProvider } from '@/shared/context/useHashTag';

function BoardWrite() {
  const { id: boardId } = useParams();
  const { user, isLoading, profileId } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>('');

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        showErrorAlert('로그인 후 이용해주세요');
        navigate('/login');
        return;
      } else if (user) {
        setUserId(profileId);
      }
    }
  }, [user, profileId, isLoading]);

  return (
    <ProfileImageProvider>
      <BoardProvider>
        <HashTagProvider>
          {userId && boardId && <BoardUpdate boardId={boardId} userId={userId} />}
          {userId && !boardId && <BoardForm userId={userId} />}
        </HashTagProvider>
      </BoardProvider>
    </ProfileImageProvider>
  );
}
export default BoardWrite;
