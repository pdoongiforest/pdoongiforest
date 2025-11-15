interface Props {
  deadLine: string;
}

function Dday({ deadLine }: Props) {
  const deadLineDate = new Date(deadLine);
  const today = new Date();
  const diffMs = deadLineDate.getTime() - today.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

  console.log(diffDays); // 예: 5 (5일 남음) 또는 -3 (3일 지남)

  return (
    <div className="flex justify-center items-center gap-1 text-2xl font-semiBold">
      <p className="flex justify-center items-center bg-[#B99470] text-white w-10 h-10 rounded-sm">
        D
      </p>
      -
      {diffDays <= 0 && (
        <>
          <p className="flex justify-center items-center bg-[#B99470] text-white w-10 h-10 rounded-sm">
            D
          </p>
          <p className="flex justify-center items-center bg-[#B99470] text-white w-10 h-10 rounded-sm">
            A
          </p>
          <p className="flex justify-center items-center bg-[#B99470] text-white w-10 h-10 rounded-sm">
            Y
          </p>
        </>
      )}
      {diffDays > 0 && (
        <>
          <p className="flex justify-center items-center bg-[#B99470] text-white w-10 h-10 rounded-sm">
            {diffDays >= 100 ? String(diffDays).slice(0, 1) : 0}
          </p>
          <p className="flex justify-center items-center bg-[#B99470] text-white w-10 h-10 rounded-sm">
            {diffDays >= 10 ? String(diffDays).slice(1, 2) : 0}
          </p>
          <p className="flex justify-center items-center bg-[#B99470] text-white w-10 h-10 rounded-sm">
            {String(diffDays).slice(-1)}
          </p>
        </>
      )}
    </div>
  );
}
export default Dday;
