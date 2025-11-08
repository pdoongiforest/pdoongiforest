import { useState } from 'react';
import TextInput from '../../textInput/TextInput';
import SelectInput from '../../textInput/SelectInput';
import TextareaInput from '../../textInput/TextareaInput';
import SocialLinksField from './SocialLinksField';
import FormActions from './FormActions';

const roleOptions = [
  { value: 'frontend', label: 'Front-end Developer' },
  { value: 'backend', label: 'Back-end Developer' },
  { value: 'aiBackend', label: 'AI Back-end Developer' },
  { value: 'fullstack', label: 'Full-stack Developer' },
  { value: 'dataEngineer', label: 'Data Engineer' },
  { value: 'dataAnalyst', label: 'Data Analyst' },
  { value: 'etc', label: '기타' },
];

function FormSection() {
  const [socialLinks, setSocialLinks] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
  };

  const handleDelete = () => {
    // 회원 탈퇴 로직
  };

  return (
    <form
      className="flex flex-col gap-6 w-full"
      aria-label="프로필 정보 수정 폼"
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset className="flex flex-col gap-6">
        <legend className="sr-only">프로필 정보</legend>

        <TextInput
          id="nickName"
          name="nickName"
          label="닉네임"
          description="다른 사용자에게 표시될 이름입니다. (최대 8자)"
          maxLength={8}
          type="text"
          autoComplete="on"
        />

        <SelectInput
          id="role"
          name="role"
          label="직무"
          description="현재 담당하고 있는 직무를 선택해주세요."
          options={roleOptions}
          placeholder="직무를 선택해주세요."
        />

        <TextInput
          id="age"
          name="age"
          label="나이"
          description="나이를 입력하거나 비공개로 설정할 수 있습니다."
          min={1}
          max={100}
          type="number"
          autoComplete="on"
        />

        <TextInput
          id="interest"
          name="interest"
          label="관심 분야"
          description="관심 있는 기술이나 분야를 입력해주세요. 쉼표로 구분할 수 있습니다."
          placeholder="예: JavaScript, React, Node.js"
          autoComplete="on"
          type="text"
        />
      </fieldset>

      <SocialLinksField links={socialLinks} onLinksChange={setSocialLinks} />

      <fieldset>
        <legend className="sr-only">자기소개</legend>
        <TextareaInput
          id="introduce"
          name="introduce"
          label="자기소개"
          description="다른 사용자에게 자신을 소개할 수 있는 내용을 작성해주세요. (최대 500자)"
          placeholder="자신을 소개해주세요."
          maxLength={500}
          rows={5}
        />
      </fieldset>

      <FormActions onDelete={handleDelete} />
    </form>
  );
}

export default FormSection;
