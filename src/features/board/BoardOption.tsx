import Filter from './components/Filter';

function BoardOption() {
  return (
    <section className="w-full gap-9 flex flex-col">
      <h2 className="sr-only">스터디/프로젝트 찾기 필터/검색 영역</h2>
      <div>
        <ul className="flex gap-5 text-[24px] font-semibold">
          <li className="text-black">전체</li>
          <li className="text-[#858585]">프로젝트</li>
          <li className="text-[#858585]">스터디</li>
        </ul>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Filter label="가입구분" />
          <Filter label="최신순" />
          <Filter label="마감순" />
          <Filter label="스크랩한 글" />
        </div>
        <div className="flex border border-gray-500 rounded-[50px] px-2">
          <input className=" w-[500px]" type="text" placeholder="스터디/프로젝트를 검색해보세요" />
          <button type="button">
            <img src="/icons/Search.svg" alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}
export default BoardOption;
