import Calender2 from '@/shared/components/Calender2';
import { useBoardContext } from '../context/useBoardContext';

function RecruitTime() {
  const { postData, setPostData } = useBoardContext();

  const getDeadLine = (date: string) => {
    setPostData((prev) => ({ ...prev, recruitTime: date }));
  };

  return (
    <div className="flex flex-col gap-2  border-r border-[#D9D9D9] px-3">
      <h3 className="font-semibold">마감일</h3>
      <div className="text-sm">
        <Calender2
          isHidden={true}
          callBack={(date: string) => {
            getDeadLine(date);
          }}
          date={postData?.recruitTime}
        />
      </div>
    </div>
  );
}
export default RecruitTime;
