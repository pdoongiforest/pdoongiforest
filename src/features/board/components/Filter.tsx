import { useState } from 'react';

interface Props {
  label: string;
}

function Filter({ label }: Props) {
  const [isClick, setIsClick] = useState(false);

  const handelFilterClick = () => {
    setIsClick((prev) => !prev);
  };

  return (
    <button
      type="button"
      className={`flex gap-1 items-center border rounded-xl py-1 px-2 ${isClick ? 'bg-white text-[#61744A] border-[#61744A]' : 'bg-none text-black border-gray-500'}`}
      aria-label={`${label} 필터링 버튼`}
      onClick={handelFilterClick}
    >
      <p>{label}</p>
      <img
        src="/icons/dropdownArrow.svg"
        alt="필터링 아이콘"
        className={`w-2 h-2 ${isClick ? 'rotate-180' : 'rotate-0'}`}
      />
    </button>
  );
}
export default Filter;
