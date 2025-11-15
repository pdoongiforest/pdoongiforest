import BoardButtonArea from '@/features/boardWrite/BoardButtonArea';
import BoardEdit from '@/features/boardWrite/BoardEdit';
import { BoardProvider } from '@/features/boardWrite/context/useBoardContext';

function BoardCreate() {
  return (
    <BoardProvider>
      <div className="w-screen flex flex-col justify-between items-center pt-10">
        <h2 className="sr-only">스터디/프로젝트 작성 페이지</h2>
        <div className="max-w-[1200px] w-[90%] flex flex-col sm:flex-row gap-3 relative">
          <aside className="flex flex-col gap-5 border border-[#B99470] rounded-sm sm:absolute sm:-left-10 sm:bottom-[15%]">
            <BoardButtonArea />
          </aside>
          <BoardEdit />
        </div>
      </div>
    </BoardProvider>
  );
}
export default BoardCreate;
