import HashTag from '@/shared/components/HashTag';
import RecruitCls from './components/RecruitCls';
import RecruitTime from './components/RecruitTime';
import RecruitMemberCount from './components/RecruitMemberCount';
import BoardContents from './BoardContents';
import SwitchBoard from './components/SwitchBoard';
import BoardButton from './components/BoardButton';

function BoardEdit() {
  return (
    <div className="flex flex-col gap-2 items-end">
      <div className="flex-1 flex flex-col gap-7 w-[1200px] bg-[#F5F2EB] border border-[#B99470] rounded-xl px-5">
        <div className="pt-5">
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className="w-full text-3xl border-b border-[#B99470]"
          />
        </div>
        <div className="flex">
          <RecruitCls />
          <RecruitTime />
          <RecruitMemberCount />
        </div>
        <HashTag />
        <div>
          <SwitchBoard />
          <BoardContents />
        </div>
      </div>
      <BoardButton />
    </div>
  );
}
export default BoardEdit;
