import { useState } from 'react';

function ScrapFilterButton() {
  const [isClick, setIsClick] = useState(false);

  const handelFilterClick = () => {
    setIsClick((prev) => !prev);
  };
  return (
    <button
      type="button"
      className={`flex gap-1 items-center border rounded-xl py-1 px-2 ${isClick ? 'bg-white text-[#61744A] border-[#61744A]' : 'bg-none text-black border-gray-500'}`}
      aria-label="스크랩 필터링 버튼"
      onClick={handelFilterClick}
    >
      <p>스크랩한 글</p>
    </button>
  );
}
export default ScrapFilterButton;
