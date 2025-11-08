import TextInput from '../../textInput/TextInput';

function PasswordForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 변경 로직
  };

  return (
    <form
      className="flex flex-col gap-6 w-full"
      aria-label="비밀번호 변경 폼"
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset className="flex flex-col gap-6">
        <legend className="sr-only">비밀번호 변경 정보</legend>

        <TextInput
          id="currentPassword"
          name="currentPassword"
          label="현재 비밀번호"
          description="현재 사용 중인 비밀번호를 입력해주세요."
          required
          type="password"
          autoComplete="off"
        />

        <TextInput
          id="newPassword"
          name="newPassword"
          label="새 비밀번호"
          description="8자 이상의 영문, 숫자, 특수문자를 조합해주세요."
          required
          type="password"
          autoComplete="off"
          minLength={8}
        />

        <TextInput
          id="newPasswordConfirm"
          name="newPasswordConfirm"
          label="새 비밀번호 확인"
          description="새 비밀번호를 다시 한 번 입력해주세요."
          required
          type="password"
          autoComplete="off"
          minLength={8}
        />
      </fieldset>

      <button
        type="submit"
        className="w-full bg-primary text-white h-10 px-2 rounded-lg mt-10"
        aria-label="비밀번호 변경하기"
      >
        비밀번호 변경
      </button>
    </form>
  );
}

export default PasswordForm;
