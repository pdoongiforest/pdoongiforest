import useFetchUserData from '../hooks/useFetchUserData';
import RenderPostAndScrap from './RenderPostAndScrap';

interface Props {
  profileId: string;
}

function MypagePost({ profileId }: Props) {
  const posts = useFetchUserData('board', profileId);

  return <RenderPostAndScrap category="post" data={posts} />;
}
export default MypagePost;
