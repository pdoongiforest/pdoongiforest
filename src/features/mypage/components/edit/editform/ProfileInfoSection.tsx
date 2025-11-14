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
}

function ProfileInfoSection({ register, errors, setError, clearErrors, profileData }: Props) {
  const { handleChange, validateNickname } = useNicknameValidation({
    setError,
    clearErrors,
    currentNickname: profileData?.nickname,
  });

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
      onChange={handleChange}
      validation={{
        ...NICKNAME_VALIDATION,
        validate: validateNickname,
      }}
    />
  );
}

export default ProfileInfoSection;
