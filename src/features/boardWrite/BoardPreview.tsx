import MarkDownConvert from '@/shared/components/MarkDownConvert';
import { useBoardContext } from './context/useBoardContext';

interface Props {
  className?: string;
}

function BoardPreview({ className }: Props) {
  const { postData } = useBoardContext();
  return (
    <div className={`w-full border-t border-[#B99470] h-110 ${className}`}>
      <MarkDownConvert markdown={postData?.contents ?? ''} />
    </div>
  );
}
export default BoardPreview;
