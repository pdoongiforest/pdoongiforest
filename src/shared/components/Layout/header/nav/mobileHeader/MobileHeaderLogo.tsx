import LogoImg from '../../../../../../shared/assets/images/logo.webp';

function MobileHeaderLogo() {
  return (
    <div className="mb-10 w-full flex justify-start -ml-2">
      <img src={LogoImg} alt="logo" className="w-20 block md:hidden" />
    </div>
  );
}

export default MobileHeaderLogo;
