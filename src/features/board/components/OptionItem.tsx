interface Props {
  title: string;
  value: string;
}

function OptionItem({ title, value }: Props) {
  return (
    <div className="flex gap-46 w-[400px] justify-between text-[20px]">
      <p className="text-gray-600">{title}</p>
      <p>{value}</p>
    </div>
  );
}
export default OptionItem;
