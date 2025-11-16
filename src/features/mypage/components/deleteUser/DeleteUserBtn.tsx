function DeleteUserBtn({ onDelete }: { onDelete?: () => void }) {
  return (
    <button
      type="button"
      onClick={onDelete}
      className="w-full text-primary/40 h-8 px-2 rounded-md cursor-auto"
      aria-label="회원 탈퇴하기"
    >
      회원탈퇴
    </button>
  );
}

export default DeleteUserBtn;
