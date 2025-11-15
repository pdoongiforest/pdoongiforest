import { debounce } from '@/shared/utils/debounce';
import Filter from './components/Filter';
import ScrapFilterButton from './components/ScrapFilterButton';

interface Props {
  onSearch: (searchText: string) => void;
}

function BoardOption({ onSearch }: Props) {
  const handleChangeSearchText = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    console.log(target.value);
    onSearch(target.value);
  });

  return (
    <section className="w-full gap-9 flex flex-col">
      <h2 className="sr-only">스터디/프로젝트 찾기 필터/검색 영역</h2>
      <div>
        <ul className="flex gap-5 text-[24px] font-semibold">
          <li className="text-black">
            <button type="button">전체</button>
          </li>
          <li className="text-[#858585]">
            <button type="button">프로젝트</button>
          </li>
          <li className="text-[#858585]">
            <button type="button">스터디</button>
          </li>
        </ul>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="flex gap-1 items-center border rounded-xl py-1 px-2">
            <select name="" id="" className="outline-0">
              <option value="" className="underline">
                가입 구분
              </option>
              <option value="free">자유 가입</option>
              <option value="approve">승인 가입</option>
            </select>
            <img src="/icons/dropdownArrow.svg" alt="필터링 아이콘" className={`w-2 h-2`} />
          </div>
          <Filter label="최신순" />
          <Filter label="마감순" />
          <ScrapFilterButton />
        </div>
        <div className="flex items-center gap-1 border border-gray-500 rounded-[50px] px-2">
          <div>
            <img src="/icons/Search.svg" alt="" />
          </div>
          <input
            className=" w-[500px]"
            type="text"
            placeholder="스터디/프로젝트를 검색해보세요"
            onChange={handleChangeSearchText}
          />
        </div>
      </div>
    </section>
  );
}
export default BoardOption;
