import HashTag from '@/shared/components/HashTag';
import RecruitCls from './components/RecruitCls';
import RecruitTime from './components/RecruitTime';
import RecruitMemberCount from './components/RecruitMemberCount';
import BoardContents from './BoardContents';
import SwitchBoard from './components/SwitchBoard';
import { useEffect, useState } from 'react';
import BoardPreview from './BoardPreview';
import BoardTitle from './components/BoardTitle';
import { useBoardContext } from './context/useBoardContext';
import { useAuth } from '../auth/AuthProvider';
import { deleteBoardSave, insertBoardSave, selectBoardSave } from '@/api/boardSave';
import { format } from 'date-fns';
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from '@/shared/utils/sweetAlert';
import { insertBoard } from '@/api/board';
import { useNavigate } from 'react-router-dom';

interface BaseTagData {
  value: string;
}

function BoardEdit() {
  const { postData, setPostData } = useBoardContext();
  const { profileId } = useAuth();
  const navigate = useNavigate();
  const [switchMarkDown, setSwitchMarkDown] = useState<'Write' | 'Preview'>('Write');

  useEffect(() => {
    if (!profileId) return;
    const selectSaveData = async () => {
      const data = await selectBoardSave(profileId);
      console.log(data);
      if (data) {
        const updateTime = format(data.update_at, 'yyyy-MM-dd HH:mm:ss');
        showConfirmAlert(updateTime, '작성하던 글이 있습니다 불러오시겠습니까?').then((result) => {
          if (result.isConfirmed) {
            setPostData({
              title: data.title,
              contents: data.contents,
              recruitCls: data.board_cls,
              recruitCount: data.recruitment_number,
              recruitTime: data.deadline,
              hashTag: data.hash_tag,
            });
          }
        });
      }
    };
    selectSaveData();
  }, [profileId]);

  const handleHashTag = (hashTag: BaseTagData[]) => {
    const hashTagArr = hashTag.map((tag) => tag.value);
    setPostData((prev) => ({ ...prev, hashTagArr }));
  };

  const handleSave = async () => {
    if (profileId && postData) {
      const saveData = await selectBoardSave(profileId);
      if (!saveData) {
        await deleteBoardSave(profileId);
      }
      const data = await insertBoardSave(profileId, postData);
      if (data?.result === 'success') {
        await showSuccessAlert('임시 저장 성공!', '게시글이 저장 되었습니다.');
      } else {
        await showErrorAlert(
          '임시 저장 실패',
          '임시 저장에 실패하였습니다. 잠시 후 다시 시도해주세요'
        );
      }
    }
  };

  const handleSubmitBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (profileId && postData) {
      const data = await insertBoard(profileId, postData);
      if (data?.result === 'success') {
        await deleteBoardSave(profileId);
        await showSuccessAlert('게시글 등록 성공!', '게시글이 등록 되었습니다.');
        navigate('/board');
      } else {
        await showErrorAlert(
          '게시글 등록 실패',
          '게시글 등록에 실패하였습니다. 잠시 후 다시 시도해주세요'
        );
      }
    }
  };
  return (
    <form className="flex-1 flex flex-col gap-2 items-end" onSubmit={handleSubmitBoard}>
      <div className="flex-1 flex flex-col gap-7 max-w-[1200px] w-full bg-[#F5F2EB] border border-[#B99470] rounded-xl px-5">
        <BoardTitle />
        <section className="flex sm:flex-row lg:gap-0 flex-col gap-5">
          <h2 className="sr-only">게시글 상세 정보 영역</h2>
          <RecruitCls />
          <RecruitTime />
          <RecruitMemberCount />
        </section>
        {postData?.hashTag && <HashTag defaultList={postData?.hashTag} callBack={handleHashTag} />}
        {!postData?.hashTag && <HashTag callBack={handleHashTag} />}
        <section>
          <h2 className="sr-only">글 작성 및 미리보기 영역</h2>
          <SwitchBoard
            switchMarkDown={switchMarkDown}
            onChange={(switchText: 'Write' | 'Preview') => {
              setSwitchMarkDown(switchText);
            }}
          />
          {switchMarkDown === 'Write' && (
            <BoardContents
              className={switchMarkDown === 'Write' ? 'overflow-y-auto' : 'overflow-hidden'}
            />
          )}
          {switchMarkDown === 'Preview' && (
            <BoardPreview
              className={switchMarkDown === 'Preview' ? 'overflow-y-auto' : 'overflow-hidden'}
            />
          )}
        </section>
      </div>
      <div className="flex gap-1">
        <button
          type="button"
          className="border-2 border-[#859853] text-[#859853] rounded-lg w-25 h-10"
          onClick={handleSave}
        >
          임시 저장
        </button>
        <button type="submit" className=" bg-[#859853] rounded-lg w-25 h-10">
          글 게시
        </button>
      </div>
    </form>
  );
}
export default BoardEdit;
