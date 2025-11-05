import LogoImg from '../../../../../../shared/assets/images/logo.webp';

function Logo() {
  return (
    <div className="w-20 hidden md:block">
      <img src={LogoImg} alt="logo" />
    </div>
  );
}

export default Logo;
