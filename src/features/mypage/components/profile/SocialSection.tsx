import Github from '@/shared/assets/icons/github.svg';
import Instagram from '@/shared/assets/icons/instagram.svg';
import Blog from '@/shared/assets/icons/blog.svg';
import Etc from '@/shared/assets/icons/link.svg';
import Linkedin from '@/shared/assets/icons/linkedin.png';
import Youtube from '@/shared/assets/icons/youtube.png';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { useEffect } from 'react';

interface Props {
  social: { social: string; social_link: string }[];
}

function SocialSection({ social }: Props) {
  const [copiedText, setCopy] = useCopyToClipboard();

  useEffect(() => {
    if (copiedText) {
      const result = confirm('복사되었습니다. 바로 링크를 열까요?');
      if (result) {
        window.open(copiedText, '_blank');
      }
    }
  }, [copiedText]);

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    youtube: Youtube,
    blog: Blog,
    etc: Etc,
  };

  return (
    <div className="md:w-1/2 flex flex-col gap-2 w-full overflow-hidden no-scrollbar">
      <p className="text-xl font-bold">소셜</p>
      <ul className="flex gap-2 overflow-auto no-scrollbar w-full md:flex-wrap flex-nowrap">
        {social.map((link) => (
          <li
            key={link.social_link}
            className="min-w-13 min-h-13 max-w-13 max-h-13 flex items-center justify-center bg-primary/60 rounded-xl p-1"
          >
            <button type="button" onClick={() => setCopy(link.social_link)}>
              <img
                src={socialIcons[link.social as keyof typeof socialIcons]}
                alt={link.social}
                className="w-full h-full object-contain"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialSection;
