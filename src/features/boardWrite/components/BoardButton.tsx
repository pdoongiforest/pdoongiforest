function BoardButton() {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        className="border-2 border-[#859853] text-[#859853] rounded-lg w-25 h-10"
      >
        임시 저장
      </button>
      <button type="button" className=" bg-[#859853] rounded-lg w-25 h-10">
        글 게시
      </button>
    </div>
  );
}
export default BoardButton;
