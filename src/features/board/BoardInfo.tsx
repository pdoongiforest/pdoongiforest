import Dday from './components/Dday';
import OptionItem from './components/OptionItem';
import Profile from './components/Profile';
import SettingButton from './components/SettingButton';

function BoardInfo() {
  return (
    <div>
      <div className="flex justify-between border-b border-gray-800">
        <div className="flex gap-3 py-2">
          <p className="text-3xl font-semibold">제목</p>
          <Dday />
          <SettingButton />
        </div>
        <div className="flex items-center">
          <Profile />
          <p className="text-gray">| 2025-10-28</p>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-items-center pt-4 gap-4">
        <OptionItem title="모집 구분" value="프로젝트" />
        <OptionItem title="모집 마감일" value="2025-10-29" />
        <OptionItem title="가입 방법" value="자유가입" />
        <OptionItem title="모집 인원" value="3명" />
      </div>
      <div className="flex justify-between border-b border-gray-800 py-2 pt-13">
        <div className="flex flex-1 gap-3 mb-2">
          <div className="py-1 px-6 bg-[#B99470]/20 border border-[#B99470] text-[#B99470] rounded flex justify-center items-center">
            Next.js
          </div>
          <div className="py-1 px-6 bg-[#B99470]/20 border border-[#B99470] text-[#B99470] rounded flex justify-center items-center">
            React
          </div>
          <div className="py-1 px-6 bg-[#B99470]/20 border border-[#B99470] text-[#B99470] rounded flex justify-center items-center">
            Tailwind
          </div>
        </div>
        <button className="border border-[#61744A] text-[#61744A] py-2 px-5 rounded-md bg-[#FFFFFF]">
          가입 신청하기
        </button>
      </div>
    </div>
  );
}
export default BoardInfo;
