import { useBoardContext } from '../context/useBoardContext';

function RecruitMemberCount() {
  const { postData, setPostData } = useBoardContext();
  const handleCountUp = () => {
    setPostData((prev) => {
      const count = prev.recruitCount + 1;
      return { ...prev, recruitCount: count };
    });
  };
  const handleCountDown = () => {
    setPostData((prev) => {
      const count = prev.recruitCount - 1 <= 0 ? 0 : prev.recruitCount - 1;
      return { ...prev, recruitCount: count };
    });
  };
  return (
    <div className="flex flex-col gap-2 px-3">
      <h2>모집 인원</h2>
      <div className="flex items-center gap-12 bg-white rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <button
          className="bg-[#999] rounded-tl-sm rounded-bl-sm w-7 h-7"
          type="button"
          onClick={handleCountDown}
        >
          -
        </button>
        <div>{postData?.recruitCount}</div>
        <button
          className="bg-[#999] rounded-tr-sm rounded-br-sm w-7 h-7"
          type="button"
          onClick={handleCountUp}
        >
          +
        </button>
      </div>
    </div>
  );
}
export default RecruitMemberCount;
