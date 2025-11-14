import type {
  Control,
  FieldError,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import TextInput from '../../textInput/TextInput';
import type { ProfileFormData } from './FormSection';
import { useAgeValidation } from './hooks/useAgeValidation';
import { AGE_VALIDATION, AGE_DESCRIPTION } from './constants/ageValidation';

interface Props {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldError | undefined;
  setError: UseFormSetError<ProfileFormData>;
  clearErrors: UseFormClearErrors<ProfileFormData>;
  control: Control<ProfileFormData>;
}

function AgeSection({ register, errors, setError, clearErrors, control }: Props) {
  const { handleChange, validateAge } = useAgeValidation({
    setError,
    clearErrors,
  });

  // age 필드에 대한 validation 래퍼
  const ageValidation = (value: unknown): boolean | string => {
    if (typeof value === 'number' || typeof value === 'string' || value === null || value === '') {
      return validateAge(value as string | number | null);
    }
    if (value === undefined) {
      return true; // undefined는 허용 (비공개 설정 가능)
    }
    return '나이는 숫자만 입력 가능합니다.';
  };

  return (
    <div className="relative">
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
          validate: ageValidation,
        }}
        error={errors}
      />
      <Controller
        control={control}
        name="visibility"
        render={({ field: { value, onChange } }) => {
          return (
            <button
              type="button"
              className="absolute left-8 -top-[0.8px]"
              aria-label="나이 공개 여부"
              onClick={() => onChange(!value)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 ${value ? 'text-primary' : 'text-gray-300'}`}
              >
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  fill="currentColor"
                />
              </svg>
            </button>
          );
        }}
      />
    </div>
  );
}

export default AgeSection;
