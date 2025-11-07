import Calender2 from '@/shared/components/Calender2';
import { useBoardContext } from '../context/useBoardContext';

function RecruitTime() {
  const { setPostData } = useBoardContext();

  const getDeadLine = (date: string) => {
    setPostData((prev) => ({ ...prev, recruitTime: date }));
  };

  return (
    <div className="flex flex-col gap-2  border-r border-[#D9D9D9] px-3">
      <p>마감일</p>
      <div className="text-sm">
        <Calender2
          isHidden={true}
          callBack={(date: string) => {
            getDeadLine(date);
          }}
        />
      </div>
    </div>
  );
}
export default RecruitTime;
