import { useBoardContext } from '../context/useBoardContext';

function BoardTitle() {
  const { postData, setPostData } = useBoardContext();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const title = target.value;
    setPostData((prev) => ({ ...prev, title }));
  };

  return (
    <section className="pt-5">
      <h2 className="sr-only">게시글 제목 영역</h2>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        className="w-full text-3xl border-b border-[#B99470]"
        value={postData?.title}
        onChange={handleChangeTitle}
      />
    </section>
  );
}
export default BoardTitle;
