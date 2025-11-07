import BoardCard from './components/BoardCard';

function BoardGrid() {
  return (
    <section className="w-full pt-6">
      <h2 className="sr-only">스터디/프로젝트 찾기 카드 그리드 영역</h2>
      <div className="grid grid-cols-4">
        <BoardCard />
      </div>
    </section>
  );
}
export default BoardGrid;
