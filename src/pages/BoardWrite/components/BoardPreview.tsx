import { useBoardContext } from '@/shared/context/useBoardContext';
import BoardOptionPreview from './BoardOptionPreview';
import S from './BoardPreview.module.css';

import { useEffect, useState } from 'react';
import MarkDownConvert from '@/shared/components/MarkDownConvert';

function BoardPreview() {
  const [markdown, setMarkDown] = useState('');
  const { postData } = useBoardContext();
  useEffect(() => {
    if (postData) {
      setMarkDown(postData.contents ?? '');
    }
  }, [postData]);
  return (
    <div className={S.boardPreview}>
      <BoardOptionPreview />
      <MarkDownConvert markdown={markdown} addClass={S.boardMarkDown} />
    </div>
  );
}
export default BoardPreview;
