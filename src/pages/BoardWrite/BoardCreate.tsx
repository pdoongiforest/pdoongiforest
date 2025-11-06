import BoardButtonArea from '@/features/boardWrite/BoardButtonArea';
import BoardEdit from '@/features/boardWrite/BoardEdit';

function BoardCreate() {
  return (
    <div className="w-[1200px] flex flex-col justify-between items-center">
      <h2 className="sr-only">스터디/프로젝트 작성 페이지</h2>
      <section className="flex gap-3 relative">
        <div className="flex flex-col gap-5 border border-[#B99470] rounded-sm absolute -left-10 bottom-[15%]">
          <BoardButtonArea />
        </div>
        <BoardEdit />
      </section>
    </div>
  );
}
export default BoardCreate;
