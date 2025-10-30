import type { Tables } from '@/supabase/database.types';

import { useEffect } from 'react';
import S from './MypageSocialConvert.module.css';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import type { User } from '../Mypage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Instagram from '@/shared/assets/instagram.svg';
import Github from '@/shared/assets/github.svg';
import Discord from '@/shared/assets/discord.svg';
import Slack from '@/shared/assets/slack.svg';
import Linkedin from '@/shared/assets/linkedin.png';
import Facebook from '@/shared/assets/facebook.png';
import Line from '@/shared/assets/line.png';
import Youtube from '@/shared/assets/youtube.png';
import DefaultIcon from '/images/너굴.png';
import compareUserId from '@/shared/utils/compareUserId';

interface Props {
  user: User | null;
  socialData: Social[] | null;
  setSocialData: React.Dispatch<React.SetStateAction<Social[] | null>>;
}

type Social = Tables<'user_social'>;

function MypageSocialConvert({ user, socialData, setSocialData }: Props) {
  const [copiedText, setCopy] = useCopyToClipboard();
  const navigate = useNavigate();

  const userSocial = user?.profile?.[0]?.social?.[0] || null;

  useEffect(() => {
    const fetchSocial = async () => {
      const social = user?.profile?.[0]?.social?.[0];
      if (!social?.profile_id) return;

      const result = await compareUserId(social.profile_id, 'user_social');
      setSocialData(result);
    };
    fetchSocial();
  }, [user]);

  useEffect(() => {
    if (copiedText) {
      toast.success(`복사 완료!`, {
        onClose() {
          navigate(`/mypage/${userSocial?.profile_id}`);
        },
        autoClose: 1500,
      });
      toast.info(copiedText, {
        onClose() {
          navigate(`/mypage/${userSocial?.profile_id}`);
        },
        autoClose: 1500,
      });
    }
  }, [copiedText]);

  return (
    <section className={S.socialContainer}>
      {socialData &&
        socialData.map(({ social, social_id, social_link }) => (
          <div className={S.social} key={social_id}>
            <button
              type="button"
              onClick={() => {
                setCopy(social_link);
              }}
              className={S.socialLink}
              title="복사하기"
            >
              {social === 'instagram' ? (
                <img src={Instagram} alt="instagram" />
              ) : social === 'github' ? (
                <img src={Github} alt="github" />
              ) : social === 'discord' ? (
                <img src={Discord} alt="discord" />
              ) : social === 'slack' ? (
                <img src={Slack} alt="slack" />
              ) : social === 'facebook' ? (
                <img src={Facebook} alt="facebook" />
              ) : social === 'line' ? (
                <img src={Line} alt="line" />
              ) : social === 'youtube' ? (
                <img src={Youtube} alt="youtube" />
              ) : social === 'linkedin' ? (
                <img src={Linkedin} alt="linkedin" />
              ) : (
                <img src={DefaultIcon} alt="personal website" />
              )}
            </button>
          </div>
        ))}
    </section>
  );
}
export default MypageSocialConvert;
