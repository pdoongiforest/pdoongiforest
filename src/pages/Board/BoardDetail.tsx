import BoardComment from '@/features/board/BoardComment';
import BoardInfo from '@/features/board/BoardInfo';
import MarkDownConvert from '@/shared/components/MarkDownConvert';

function BoardDetail() {
  const contents =
    " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
  return (
    <div className="w-screen flex flex-col justify-between items-center">
      <h2 className="sr-only">스터디/프로젝트 구인 글 상세 페이지</h2>
      <section className="w-[1200px]">
        <BoardInfo />
        <div className="p-10">
          <MarkDownConvert markdown={contents} />
        </div>
        <BoardComment />
      </section>
    </div>
  );
}
export default BoardDetail;
