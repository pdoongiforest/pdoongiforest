import type { Tables } from '@/supabase/database.types';
import Dday from './components/Dday';
import OptionItem from './components/OptionItem';
import Profile from './components/Profile';
import SettingButton from './components/SettingButton';
import HashTag from '@/shared/components/HashTag';
import { selectStudy } from '@/api/study';
import { insertStudyMember } from '@/api/studyMember';
import { useAuth } from '../auth/AuthProvider';
import { insertStudyApprove } from '@/api/studyApprove';
import { showErrorAlert, showInfoAlert } from '@/shared/utils/sweetAlert';

interface Props {
  boardInfo: Tables<'board'> | null;
}

function BoardInfo({ boardInfo }: Props) {
  const { profileId } = useAuth();

  const handleRequest = async () => {
    if (!boardInfo?.board_id) return;
    if (!profileId) return;
    try {
      const studyInfo = await selectStudy(boardInfo?.board_id);
      if (!studyInfo?.study_id) return;
      if (boardInfo.approve_cls === 'free') {
        await insertStudyMember(profileId, studyInfo?.study_id, '0');
      } else {
        await insertStudyApprove(profileId, studyInfo?.study_id, '1');
      }
      showInfoAlert('가입 신청 성공!', '가입 신청이 완료되었습니다.');
    } catch (error) {
      showErrorAlert('가입 신청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <div className="flex justify-between border-b border-gray-800">
        <div className="flex items-center gap-3 py-2">
          <p className="text-3xl font-semibold">{boardInfo?.title}</p>
          {boardInfo && boardInfo?.deadline && <Dday deadLine={boardInfo?.deadline} />}
          <SettingButton />
        </div>
        <div className="flex items-center gap-1">
          <Profile writerId={boardInfo?.profile_id ?? ''} />
          <p className="text-gray">| {boardInfo?.created_at?.slice(0, 10)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-items-center pt-4 gap-4">
        <OptionItem
          title="모집 구분"
          value={boardInfo?.board_cls === 'study' ? '스터디' : '프로젝트'}
        />
        <OptionItem title="모집 마감일" value={boardInfo?.deadline?.slice(0, 10) ?? '미상'} />
        <OptionItem
          title="가입 방법"
          value={boardInfo?.approve_cls === 'free' ? '자유 가입' : '승인 가입'}
        />
        <OptionItem title="모집 인원" value={`${boardInfo?.recruitment_number ?? 0}명`} />
      </div>
      <div className="flex justify-between border-b border-gray-800 py-2 pt-13">
        <div className="flex flex-1 gap-3 mb-2">
          {boardInfo && boardInfo.hash_tag && (
            <HashTag
              taglist={boardInfo.hash_tag}
              defaultList={boardInfo.hash_tag}
              editable={false}
            />
          )}
        </div>
        <button
          className="border border-[#61744A] text-[#61744A] py-2 px-5 rounded-md bg-[#FFFFFF]"
          onClick={handleRequest}
        >
          가입 신청하기
        </button>
      </div>
    </div>
  );
}
export default BoardInfo;
