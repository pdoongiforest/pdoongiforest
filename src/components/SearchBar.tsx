import { debounce } from '@/utils/debounce';
import type { Tables } from '@/supabase/database.types';
import primary from './SearchBar.module.css';
import mainVarient from './SearchBarMain.module.css';

type Board = Tables<'board'>;
type CardProps = Board & {
  board_tag: Tables<'board_tag'>[];
};

type Varient = 'primary' | 'mainVarient';

interface Props {
  cardData: CardProps[];
  originData: CardProps[];
  setCardData: (v: CardProps[]) => void;
  varient: Varient;
}

const stylesMap = {
  primary,
  mainVarient,
};

function SearchBar({ cardData, setCardData, originData, varient }: Props) {
  const S = stylesMap[varient];
  const debouncedSearch = debounce((value: string) => {
    if (!value) setCardData(cardData);
    const lowerValue = value.toLowerCase().trim();
    const filtered = [...originData].filter(
      (card) =>
        card.title.toLowerCase().includes(lowerValue) ||
        card.contents.toLowerCase().includes(lowerValue) ||
        card.address?.toLowerCase().includes(lowerValue) ||
        card.board_tag.some((tag) => tag.hash_tag?.toLowerCase().includes(lowerValue))
    );
    setCardData(filtered);
  }, 400);

  return (
    <form className={S.searchBox}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className={S.studySearch}
        onChange={(e) => {
          debouncedSearch(e.target.value);
        }}
      />
      <button type="submit" className={S.searchBtn}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_276_3490)">
            <path
              d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
              fill="#555555"
              fillOpacity="0.7"
            />
          </g>
          <defs>
            <clipPath id="clip0_276_3490">
              <rect width="24" height="24" fill="transparent" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </form>
  );
}
export default SearchBar;
