interface Props {
  label: string;
}

function KeywordTag({ label }: Props) {
  return (
    <div className="border border-[#61744A] rounded-sm font-medium text-[#61744A] bg-[#F5F5F5] px-2 py-1">
      <p>{label}</p>
    </div>
  );
}
export default KeywordTag;
