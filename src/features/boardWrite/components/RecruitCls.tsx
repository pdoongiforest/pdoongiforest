import { useBoardContext } from '../context/useBoardContext';

function RecruitCls() {
  const { setPostData } = useBoardContext();

  const handleClsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const claValue = target.value;
    setPostData((prev) => ({ ...prev, recruitCls: claValue }));
  };
  return (
    <div className="flex flex-col gap-2 border-r border-[#D9D9D9] px-3">
      <p>모집 구분</p>
      <div className="flex gap-2">
        <div className="flex gap-1">
          <input
            type="radio"
            name="group-name"
            value="study"
            id="option1"
            defaultChecked
            onChange={handleClsChange}
          />
          <label htmlFor="option1">스터디</label>
        </div>
        <div className="flex gap-1">
          <input
            type="radio"
            name="group-name"
            value="project"
            id="option2"
            onChange={handleClsChange}
          />
          <label htmlFor="option2">프로젝트</label>
        </div>
      </div>
    </div>
  );
}
export default RecruitCls;
