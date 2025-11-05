interface Props {
  label: string;
}

function Filter({ label }: Props) {
  return (
    <div className="flex gap-1 items-center border border-gray-500 rounded-xl py-1 px-2">
      <p>{label}</p>
      <img src="/icons/dropdownArrow.svg" alt="" className="w-2 h-2" />
    </div>
  );
}
export default Filter;
