import type { FieldError, UseFormRegister } from 'react-hook-form';
import SelectInput from '../../textInput/SelectInput';
import type { ProfileFormData } from './FormSection';

interface Props {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldError | undefined;
}

const roleOptions = [
  { value: 'Front-end Developer', label: 'Front-end Developer' },
  { value: 'Back-end Developer', label: 'Back-end Developer' },
  { value: 'AI Back-end Developer', label: 'AI Back-end Developer' },
  { value: 'Full-stack Developer', label: 'Full-stack Developer' },
  { value: 'Data Engineer', label: 'Data Engineer' },
  { value: 'Data Analyst', label: 'Data Analyst' },
  { value: 'etc', label: '기타' },
];

function RoleSection({ register, errors }: Props) {
  return (
    <SelectInput
      id="role"
      name="role"
      label="직무"
      description={!errors?.message ? '현재 담당하고 있는 직무를 선택해주세요.' : undefined}
      options={roleOptions}
      placeholder="직무를 선택해주세요."
      register={register}
      error={errors}
      validation={{}}
    />
  );
}

export default RoleSection;
