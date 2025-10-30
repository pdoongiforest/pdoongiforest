import BellIcon from '@/shared/assets/_bell.svg';

function Notification() {
  return (
    <button className="bg-white w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer">
      <img src={BellIcon} alt="notification" className="" />
    </button>
  );
}
export default Notification;
