import type {
  FieldError,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
} from 'react-hook-form';
import TextInput from '../../textInput/TextInput';
import type { ProfileData, ProfileFormData } from './FormSection';
import { useNicknameValidation } from './hooks/useNicknameValidation';
import { NICKNAME_VALIDATION, NICKNAME_DESCRIPTION } from './constants/nicknameValidation';

interface Props {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldError | undefined;
  setError: UseFormSetError<ProfileFormData>;
  clearErrors: UseFormClearErrors<ProfileFormData>;
  profileData: ProfileData | null;
  onDirtyChange: () => void;
}

function ProfileInfoSection({
  register,
  errors,
  setError,
  clearErrors,
  profileData,
  onDirtyChange,
}: Props) {
  const { handleChange, validateNickname } = useNicknameValidation({
    setError,
    clearErrors,
    currentNickname: profileData?.nickname,
  });

  // nickname 필드에 대한 validation 래퍼
  const nicknameValidation = async (value: unknown): Promise<boolean | string> => {
    if (typeof value === 'string' || typeof value === 'number' || value === null || value === '') {
      return validateNickname(value as string);
    }
    if (value === undefined) {
      return true;
    }
    return '닉네임은 문자열만 입력 가능합니다.';
  };

  return (
    <TextInput
      id="nickname"
      name="nickname"
      label="닉네임"
      description={!errors?.message ? NICKNAME_DESCRIPTION : undefined}
      maxLength={7}
      type="text"
      autoComplete="on"
      register={register}
      error={errors}
      onChange={(e) => {
        handleChange(e);
        onDirtyChange();
      }}
      validation={{
        ...NICKNAME_VALIDATION,
        validate: nicknameValidation,
      }}
    />
  );
}

export default ProfileInfoSection;
