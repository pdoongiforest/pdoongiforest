import { useBoardContext } from '../context/useBoardContext';

function ApproveCls() {
  const { postData, setPostData } = useBoardContext();

  const handleClsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const claValue = target.value;
    setPostData((prev) => ({ ...prev, approveCls: claValue }));
  };
  return (
    <div className="flex flex-col gap-2 border-r border-[#D9D9D9] px-3">
      <h3 className="font-semibold">가입 구분</h3>
      <div className="flex gap-2 text-sm">
        <div className="flex gap-1">
          <input
            type="radio"
            name="join-name"
            value="free"
            id="join_free"
            defaultChecked
            checked={postData?.approveCls === 'free' ? true : false}
            onChange={handleClsChange}
          />
          <label htmlFor="join_free">자유 가입</label>
        </div>
        <div className="flex gap-1">
          <input
            type="radio"
            name="join"
            value="approve"
            id="join_approve"
            checked={postData?.approveCls === 'approve' ? true : false}
            onChange={handleClsChange}
          />
          <label htmlFor="join_approve">승인 가입</label>
        </div>
      </div>
    </div>
  );
}
export default ApproveCls;
