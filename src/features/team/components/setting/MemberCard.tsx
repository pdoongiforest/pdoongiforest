import { useToast } from '@/shared/utils/useToast';
import supabase from '@/supabase/supabase';

interface Props {
  variants: 'approve' | 'member';
  src: string;
  nickname: string;
  profileId: string;
  studyId: string;
}

function MemberCard({ variants, src, nickname, profileId, studyId }: Props) {
  const { success, error } = useToast();
  const handleAccept = async () => {
    try {
      const { error: approveError } = await supabase
        .from('study_approve')
        .update({ status: '1' })
        .eq('profile_id', profileId);
      if (approveError) throw new Error('업데이트 요청 실패');

      const { error: insertError } = await supabase.from('study_member').insert({
        profile_id: profileId,
        study_id: studyId,
        authority: '1',
      });
      success('멤버를 승인하였습니다.');
      if (insertError) throw new Error('승인 요청 실패');
    } catch (err) {
      error('예상치 못한 에러가 발생했습니다.');
      console.error('예기치 못한 에러가 발생했습니다', err);
    }
  };

  const handleReject = async () => {
    const { error } = await supabase
      .from('study_approve')
      .update({
        status: 2,
      })
      .eq('profile_id', profileId);
    if (error) throw new Error('거절 요청 실패');
    success('거절하였습니다.');
  };

  const handleEmission = async () => {
    const { error: approveError } = await supabase
      .from('study_approve')
      .delete()
      .eq('profile_id', profileId);
    if (approveError) throw new Error('거절 요청 실패');

    const { error: emmisionError } = await supabase
      .from('study_member')
      .delete()
      .eq('profile_id', profileId);
    if (emmisionError) throw new Error('거절 요청 실패');
    success('추방에 성공했습니다.');
  };

  return (
    <div className="rounded-sm bg-white px-3 py-4 flex items-center justify-between h-17 w-full md:w-72 drop-shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={src} alt="멤버 카드 이미지" />
        </div>
        <div>
          <p>{nickname}</p>
          <span>피어온도</span>
        </div>
      </div>
      {variants == 'approve' ? (
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-sm bg-[#27C840] w-6 h-6 flex-center"
            aria-label="수락"
            onClick={handleAccept}
          >
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.59 10.58L1.42 6.41L0 7.82L5.59 13.41L17.59 1.41L16.18 0L5.59 10.58Z"
                fill="#fff"
              />
            </svg>
          </button>
          <button
            type="submit"
            className="rounded-sm bg-[#ea1714] w-6 h-6"
            aria-label="거절"
            onClick={handleReject}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9998 13.4008L7.0998 18.3008C6.91647 18.4841 6.68314 18.5758 6.3998 18.5758C6.11647 18.5758 5.88314 18.4841 5.6998 18.3008C5.51647 18.1174 5.4248 17.8841 5.4248 17.6008C5.4248 17.3174 5.51647 17.0841 5.6998 16.9008L10.5998 12.0008L5.6998 7.10078C5.51647 6.91745 5.4248 6.68411 5.4248 6.40078C5.4248 6.11745 5.51647 5.88411 5.6998 5.70078C5.88314 5.51745 6.11647 5.42578 6.3998 5.42578C6.68314 5.42578 6.91647 5.51745 7.0998 5.70078L11.9998 10.6008L16.8998 5.70078C17.0831 5.51745 17.3165 5.42578 17.5998 5.42578C17.8831 5.42578 18.1165 5.51745 18.2998 5.70078C18.4831 5.88411 18.5748 6.11745 18.5748 6.40078C18.5748 6.68411 18.4831 6.91745 18.2998 7.10078L13.3998 12.0008L18.2998 16.9008C18.4831 17.0841 18.5748 17.3174 18.5748 17.6008C18.5748 17.8841 18.4831 18.1174 18.2998 18.3008C18.1165 18.4841 17.8831 18.5758 17.5998 18.5758C17.3165 18.5758 17.0831 18.4841 16.8998 18.3008L11.9998 13.4008Z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div>
          <button
            type="submit"
            aria-label="추방"
            className="text-[#ea1714]"
            onClick={handleEmission}
          >
            추방하기
          </button>
        </div>
      )}
    </div>
  );
}
export default MemberCard;
