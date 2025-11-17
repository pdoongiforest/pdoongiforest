import { useState } from 'react';

function SettingButton() {
  const [isShow, setIsShow] = useState(false);

  const handleDropDown = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <div className="relative">
      <button type="button" aria-label="설정 버튼" onClick={handleDropDown}>
        <img src="/icons/setting.svg" alt="설정 이미지" className="w-8 h-8" />
      </button>
      {isShow && (
        <div className="absolute w-fit bg-white rounded-lg shadow-[2px_2px_2px_0_rgba(0,0,0,0.25)]">
          <ul className="flex flex-col items-center gap-2 p-2">
            <li className="w-20">수정하기</li>
            <li className="w-20">삭제하기</li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default SettingButton;
