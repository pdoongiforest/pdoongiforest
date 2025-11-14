import type { FieldError, UseFormRegister } from 'react-hook-form';
import TextareaInput from '../../textInput/TextareaInput';
import type { ProfileFormData } from './FormSection';
import { useState } from 'react';

interface Props {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldError | undefined;
}

function IntroduceSection({ register, errors }: Props) {
  const [IntroduceCount, setIntroduceCount] = useState(0);

  return (
    <TextareaInput
      id="introduce"
      name="introduce"
      label="자기소개"
      description={`다른 사용자에게 자신을 소개할 수 있는 내용을 작성해주세요. ( ${IntroduceCount} / 500 )`}
      placeholder="자신을 소개해주세요."
      onChange={(e) => setIntroduceCount(e.target.value.length)}
      maxLength={499}
      rows={5}
      register={register}
      error={errors}
    />
  );
}

export default IntroduceSection;
