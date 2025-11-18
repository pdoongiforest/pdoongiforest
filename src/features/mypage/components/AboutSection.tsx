import type { ProfileData } from './edit/editform/FormSection';

interface Props {
  userData: ProfileData | null;
}

function AboutSection({ userData }: Props) {
  return (
    <div className="mx-6 mt-5 bg-primary/20 py-2 px-4 rounded-lg">
      <h2 className="text-xl font-bold">자기 소개</h2>
      <div className="mt-2 whitespace-pre-wrap">
        <p>{userData?.introduce || `안녕하세요 ${userData?.nickname || '프둥이'} 입니다.`}</p>
      </div>
    </div>
  );
}

export default AboutSection;
