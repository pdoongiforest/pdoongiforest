interface Props {
  onClose: () => void;
}

function MobileHeaderNavOverlay({ onClose }: Props) {
  return (
    <div
      className="fixed top-0 left-0 backdrop-blur-sm w-full h-full z-999 bg-white/50 block md:hidden"
      aria-label="모바일 네비게이션 배경"
      onClick={onClose}
    />
  );
}

export default MobileHeaderNavOverlay;
