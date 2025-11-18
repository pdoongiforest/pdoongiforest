interface Props {
  interest: string[];
}

function InterestSection({ interest }: Props) {
  return (
    <div className="md:w-1/2 w-full flex flex-col gap-2">
      <p className="text-xl font-bold">관심 분야</p>
      <ul className="flex gap-2 overflow-auto no-scrollbar w-full md:flex-wrap flex-nowrap">
        {interest.map((item) => (
          <li key={item} className="bg-secondary/70 rounded-xl px-2 py-1 min-w-fit">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InterestSection;
