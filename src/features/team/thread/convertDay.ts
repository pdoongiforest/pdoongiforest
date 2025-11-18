export function convertDay(dateString: string): string {
  const created = new Date(dateString);

  const day = created.getDate();
  const dayOfWeekNum = created.getDay();
  const months = created.getMonth();
  const years = created.getFullYear();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeekStr = days[dayOfWeekNum];

  return `${years}년 ${months}월 ${day}일 ${dayOfWeekStr}요일`;
}
