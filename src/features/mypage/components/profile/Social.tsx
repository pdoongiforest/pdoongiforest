import InterestSection from './InterestSection';
import SocialSection from './SocialSection';

interface Props {
  social: { social: string; social_link: string }[];
  interest: string[];
}

function Social({ social, interest }: Props) {
  return (
    <div className="flex gap-5 justify-between mt-5 md:flex-row flex-col">
      <SocialSection social={social} />
      <InterestSection interest={interest} />
    </div>
  );
}

export default Social;
