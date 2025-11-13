import supabase from '@/supabase/supabase';
import { useToast } from '@/shared/utils/useToast';
import { useBoardContext } from './context/useBoardContext';

const BUTTON_LIST = [
  { tag: 'h1', text: '\n# ' },
  { tag: 'h2', text: '\n## ' },
  { tag: 'h3', text: '\n### ' },
  { tag: 'bold', text: '\n**TEXT**' },
  { tag: 'italic', text: '\n*TEXT*' },
  { tag: 'cancelline', text: '\n~~TEXT~~' },
  { tag: 'Quote', text: '\n> ' },
  { tag: 'Picture', text: '' },
  { tag: 'Link', text: '\n[TEXT](Link)' },
  { tag: 'Code', text: '\n```\nText\n```' },
];
interface MarkdownOption {
  tag: string;
  text: string;
}
function BoardButtonArea() {
  const { setPostData } = useBoardContext();
  const { error: errorPop } = useToast();

  const handleMarkdownMenu = (icons: MarkdownOption) => {
    setPostData((prev) => {
      return {
        ...prev,
        contents: prev.contents + icons.text,
      };
    });
  };

  const handleChange = async (file: File) => {
    const fileExt = file.name.split('.').pop(); // 확장자 추출
    const fileName = `${Date.now()}.${fileExt}`; // 중복 방지를 위한 이름

    const { error } = await supabase.storage
      .from('boardimage')
      .upload(`markdownImage/${fileName}`, file);

    if (error) {
      errorPop('이미지 업로드에 실패하였습니다.');

      throw new Error(error.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from('boardimage')
      .getPublicUrl(`markdownImage/${fileName}`);

    const imageUrl = publicUrlData.publicUrl;

    setPostData((prev) => {
      return {
        ...prev,
        contents: prev.contents + `\n![${file.name}](${imageUrl})`,
      };
    });
  };
  return (
    <ul className="flex sm:flex-col flex-row justify-center items-center gap-4 p-1">
      {BUTTON_LIST.map((icons) => {
        const src = `/icons/${icons.tag}.svg`;
        return (
          <li key={icons.tag} className="w-5 h-5">
            {icons.tag !== 'Picture' ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleMarkdownMenu(icons);
                }}
              >
                <img src={src} alt="마크다운 삽입버튼" className="w-5 h-5" />
              </a>
            ) : (
              <label htmlFor="markdownPicture">
                <input
                  type="file"
                  id="markdownPicture"
                  hidden
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (!target.files) return;
                    const file = target.files[0];
                    handleChange(file);
                  }}
                />
                <img src={src} alt="마크다운 삽입버튼" className="w-5 h-5" />
              </label>
            )}
          </li>
        );
      })}
    </ul>
  );
}
export default BoardButtonArea;
