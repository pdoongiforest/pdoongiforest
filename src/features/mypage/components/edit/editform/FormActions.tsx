interface FormActionsProps {
  onDelete?: () => void;
}

function FormActions({ onDelete }: FormActionsProps) {
  return (
    <div className="flex flex-col gap-5 mt-20" role="group" aria-label="폼 액션 버튼">
      <button
        type="submit"
        className="w-full bg-primary text-white h-10 px-2 rounded-lg hover:bg-primary/80 transition-colors"
        aria-label="프로필 정보 저장하기"
      >
        프로필 저장
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="w-full text-primary/40 h-8 px-2 rounded-md cursor-auto"
        aria-label="회원 탈퇴하기"
      >
        회원탈퇴
      </button>
    </div>
  );
}

export default FormActions;
