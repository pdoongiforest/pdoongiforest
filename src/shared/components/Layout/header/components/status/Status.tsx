import { statusList } from './statusList';

export type StatusCode = 0 | 1 | 2 | 3 | null;

function Status() {
  return (
    <img
      src={statusList[0].icon}
      alt={statusList[0].name}
      className="w-4 h-4 absolute -bottom-1 -right-1"
    />
  );
}

export default Status;
