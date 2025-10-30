import LogoImg from '@/shared/assets/logo.webp';

function Logo() {
  return (
    <div className="flex items-center justify-center w-20">
      <img src={LogoImg} alt="logo" />
    </div>
  );
}

export default Logo;
