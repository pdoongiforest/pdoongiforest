import type {
  FieldError,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
} from 'react-hook-form';
import TextInput from '../../textInput/TextInput';
import type { ProfileFormData } from './FormSection';
import { useAgeValidation } from './hooks/useAgeValidation';
import { AGE_VALIDATION, AGE_DESCRIPTION } from './constants/ageValidation';

interface Props {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldError | undefined;
  setError: UseFormSetError<ProfileFormData>;
  clearErrors: UseFormClearErrors<ProfileFormData>;
}

function AgeSection({ register, errors, setError, clearErrors }: Props) {
  const { handleChange, validateAge } = useAgeValidation({
    setError,
    clearErrors,
  });

  return (
    <TextInput
      id="age"
      name="age"
      label="나이"
      description={!errors?.message ? AGE_DESCRIPTION : undefined}
      type="number"
      autoComplete="on"
      register={register}
      onChange={handleChange}
      validation={{
        ...AGE_VALIDATION,
        validate: validateAge,
      }}
      error={errors}
    />
  );
}

export default AgeSection;
