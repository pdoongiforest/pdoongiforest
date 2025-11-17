import { useForm, type FieldError } from 'react-hook-form';
import TextInput from '../../textInput/TextInput';
import { useAuth } from '@/features/auth/AuthProvider';
import { useState } from 'react';
import { usePasswordSubmit } from './hooks/usePasswordSubmit';
import {
  PASSWORD_VALIDATION,
  PASSWORD_VALIDATION_RULES,
  PASSWORD_VALIDATION_MESSAGES,
  PASSWORD_DESCRIPTIONS,
} from './constants/passwordValidation';

interface PasswordFormData {
  newPassword: string;
  newPasswordConfirm: string;
}

interface PasswordFormProps {
  onDirtyChange?: (isDirty: boolean) => void;
}

function PasswordForm({ onDirtyChange }: PasswordFormProps) {
  const { profileId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<PasswordFormData>();

  const newPassword = watch('newPassword');

  const { onSubmit } = usePasswordSubmit({
    profileId,
    setError,
    onSuccess: () => {
      setIsSubmitting(false);
      onDirtyChange?.(false);
    },
  });

  const handleFormSubmit = async (data: PasswordFormData) => {
    // submit 시작 시 즉시 dirty 상태 초기화 (navigate 전에 blocker 비활성화)
    onDirtyChange?.(false);
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-full"
      aria-label="비밀번호 변경 폼"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <fieldset className="flex flex-col gap-6">
        <legend className="sr-only">비밀번호 변경 정보</legend>

        <TextInput
          id="newPassword"
          name="newPassword"
          label="새 비밀번호"
          description={errors.newPassword?.message || PASSWORD_DESCRIPTIONS.newPassword}
          required
          type="password"
          autoComplete="off"
          minLength={PASSWORD_VALIDATION.minLength}
          register={register}
          error={errors.newPassword as FieldError | undefined}
          validation={PASSWORD_VALIDATION_RULES}
          onChange={() => onDirtyChange?.(true)}
        />

        <TextInput
          id="newPasswordConfirm"
          name="newPasswordConfirm"
          label="새 비밀번호 확인"
          description={
            errors.newPasswordConfirm?.message || PASSWORD_DESCRIPTIONS.newPasswordConfirm
          }
          required
          type="password"
          autoComplete="off"
          minLength={PASSWORD_VALIDATION.minLength}
          register={register}
          error={errors.newPasswordConfirm as FieldError | undefined}
          validation={{
            validate: (value) => {
              return value === newPassword || PASSWORD_VALIDATION_MESSAGES.mismatch;
            },
          }}
          onChange={() => onDirtyChange?.(true)}
        />
      </fieldset>

      <button
        type="submit"
        className="w-full bg-primary text-white h-10 px-2 rounded-lg mt-10 disabled:bg-gray-300 disabled:cursor-not-allowed"
        aria-label="비밀번호 변경하기"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
      >
        {isSubmitting ? '변경 중...' : '비밀번호 변경'}
      </button>
    </form>
  );
}

export default PasswordForm;
