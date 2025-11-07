function RecruitMemberCount() {
  return (
    <div className="flex flex-col gap-2 px-3">
      <h2>모집 인원</h2>
      <div className="flex items-center gap-12 bg-white rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <button className="bg-[#999] rounded-tl-sm rounded-bl-sm w-7 h-7" type="button">
          -
        </button>
        <div>1</div>
        <button className="bg-[#999] rounded-tr-sm rounded-br-sm w-7 h-7" type="button">
          +
        </button>
      </div>
    </div>
  );
}
export default RecruitMemberCount;
