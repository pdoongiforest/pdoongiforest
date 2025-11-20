import { useLoaderData } from 'react-router-dom';
import type { StudyWithBoard } from '../../types/types';

function StudyTitle() {
  const { study } = useLoaderData() as { study: StudyWithBoard };
  const { title, board_cls } = study.board;
  return (
    <header className="flex flex-col gap-1">
      <p className="font-light">{board_cls === 'study' ? '스터디' : '프로젝트'}</p>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
}
export default StudyTitle;
