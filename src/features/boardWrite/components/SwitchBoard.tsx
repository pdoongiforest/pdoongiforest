function SwitchBoard() {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        className="text-white rounded-tl-lg rounded-tr-lg border-2 border-b-0 border-[#636362] bg-[#858482] w-25 h-10"
      >
        Write
      </button>
      <button
        type="button"
        className="text-[#636362] rounded-tl-lg rounded-tr-lg border-2 border-b-0 border-[#636362] w-25 h-10"
      >
        Preview
      </button>
    </div>
  );
}
export default SwitchBoard;
