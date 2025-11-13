import { useBoardContext } from './context/useBoardContext';

interface Props {
  className?: string;
}

function BoardContents({ className }: Props) {
  const { postData, setPostData } = useBoardContext();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const text = target.value;
    setPostData((prev) => ({ ...prev, contents: text }));
  };

  return (
    <div className={`w-full border-t border-[#B99470] h-110 ${className}`}>
      <textarea
        name="postContent"
        value={postData?.contents ?? ''}
        className="w-full p-4 h-100 overflow-y-auto"
        onChange={handleTextChange}
      ></textarea>
    </div>
  );
}
export default BoardContents;
