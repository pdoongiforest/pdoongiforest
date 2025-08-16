import useFetchUserData from '../hooks/useFetchUserData';
import RenderBoardList from './RenderBoardList';

interface Props {
  profileId: string;
}

function MypagePost({ profileId }: Props) {
  const posts = useFetchUserData('board',profileId);

  return (
      <RenderBoardList category='post' data={posts}/>
  );
}
export default MypagePost;
