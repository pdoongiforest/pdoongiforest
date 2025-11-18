import { useForm, type FieldError } from 'react-hook-form';
import TextInput from '../textInput/TextInput';
import { useState, useEffect } from 'react';
import PasswordForm from './passwordform/PasswordForm';
import { useAuth } from '@/features/auth/AuthProvider';
import { useRateLimit } from './hooks/useRateLimit';
import { usePasswordLogin } from './hooks/usePasswordLogin';
import { LOGIN_DESCRIPTIONS, BUTTON_TEXTS } from './constants/passwordLoginValidation';

interface LoginFormData {
  email: string;
  password: string;
}

interface PasswordLoginProps {
  onDirtyChange?: (isDirty: boolean) => void;
}

function PasswordLogin({ onDirtyChange }: PasswordLoginProps) {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { user } = useAuth();
  const {
    checkRateLimit,
    handleFailedAttempt,
    reset: resetRateLimit,
    isLocked,
    getRemainingMinutes,
  } = useRateLimit();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<LoginFormData>();

  // 현재 로그인한 사용자의 이메일로 자동 채우기
  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const { onSubmit } = usePasswordLogin({
    user,
    setError,
    checkRateLimit,
    handleFailedAttempt,
    resetRateLimit,
    onSuccess: () => {
      setLoginSuccess(true);
    },
  });

  if (loginSuccess) {
    return <PasswordForm onDirtyChange={onDirtyChange} />;
  }

  return (
    <form
      className="flex flex-col gap-6 w-full"
      aria-label="비밀번호 변경 폼"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <fieldset className="flex flex-col gap-6">
        <legend className="sr-only">비밀번호 변경 전 로그인 정보</legend>

        <TextInput
          id="email"
          name="email"
          label="아이디"
          description={LOGIN_DESCRIPTIONS.email}
          type="email"
          required
          autoComplete="off"
          register={register}
          validation={{ required: '아이디를 입력해주세요.' }}
          error={errors.email as FieldError | undefined}
          disabled={!!user?.email}
        />

        <TextInput
          id="password"
          name="password"
          label="비밀번호"
          description={LOGIN_DESCRIPTIONS.password}
          type="password"
          required
          autoComplete="off"
          register={register}
          validation={{ required: '비밀번호를 입력해주세요.' }}
          error={errors.password as FieldError | undefined}
        />

        <button
          type="submit"
          className="w-full bg-primary text-white h-10 px-2 rounded-lg mt-10 disabled:bg-gray-300 disabled:cursor-not-allowed"
          aria-label="비밀번호 변경하기"
          disabled={isSubmitting || isLocked()}
          aria-disabled={isSubmitting || isLocked()}
        >
          {isLocked() && getRemainingMinutes()
            ? BUTTON_TEXTS.lockout(getRemainingMinutes()!)
            : BUTTON_TEXTS.default}
        </button>
      </fieldset>
    </form>
  );
}

export default PasswordLogin;
