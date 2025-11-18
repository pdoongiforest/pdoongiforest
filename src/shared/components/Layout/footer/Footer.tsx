import Github from '../../../../shared/assets/github.svg';

function Footer() {
  return (
    <div
      className="w-full h-20 bg-transparent text-sm text-gray-500 flex md:flex-row flex-col justify-between items-center px-5 md:mb-0 mb-5"
      aria-label="푸터"
    >
      <p className="text-center" aria-label="저작권 정보">
        © 2025 모여봐요 프둥이숲. All rights reserved.
      </p>
      <div className="bg-white rounded-full p-1" aria-label="깃허브 링크">
        <a
          href="https://github.com/gatherinpdoongiforest"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Github} alt="깃허브 아이콘" className="w-8 h-8" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
