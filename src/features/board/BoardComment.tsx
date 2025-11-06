import Profile from './components/Profile';

function BoardComment() {
  return (
    <div className="bg-white rounded-2xl px-7 py-4 mb-10 shadow-[2px_2px_2px_0_rgba(0,0,0,0.25)]">
      <div className="mb-8">
        <form className="w-full py-4 px-7 bg-[#F5F5F5] shadow-[-1px_-1px_1px_0_rgba(0,0,0,0.25)] rounded-2xl flex flex-col items-end">
          <textarea placeholder="댓글을 적어주세요" className="w-full h-min-[200px]"></textarea>
          <button type="submit" className="bg-[#B99470] rounded-xl text-white py-1 px-9">
            댓글
          </button>
        </form>
      </div>
      <hr className="mb-4" />
      <div className="pt-4">
        <div>
          댓글 <span className="bg-[#EADFD5] text-[#B99470] px-3">29</span>
        </div>
        <ul className="pt-6">
          <li className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Profile />
              <p className="text-xs text-gray">14분전</p>
            </div>
            <div className="ml-10 flex flex-col gap-1">
              <p>가입신청했습니다~~</p>
              <div className="text-gray text-xs font-light">
                <button type="button">↪ Reply</button>
                <span>1</span>
              </div>
            </div>
            <ul className="ml-10">
              <li>
                <div className="flex items-center gap-1">
                  <Profile />
                  <p className="text-xs text-gray">14분전</p>
                </div>
                <div className="ml-10 flex flex-col gap-1">
                  <p>가입신청했습니다~~</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default BoardComment;
