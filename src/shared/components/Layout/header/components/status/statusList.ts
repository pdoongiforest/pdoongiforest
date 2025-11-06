import OnlineIcon from '../../../../../../shared/assets/icons/online.svg';
import OfflineIcon from '../../../../../../shared/assets/icons/offline.svg';
import AwayIcon from '../../../../../../shared/assets/icons/away.svg';
import DNDIcon from '../../../../../../shared/assets/icons/dnd.svg';

export type StatusCode = '0' | '1' | '2' | '3' | null;

export const statusList: { code: StatusCode; name: string; color: string; icon: string }[] = [
  {
    code: '0',
    name: '온라인',
    color: 'bg-green-500',
    icon: OnlineIcon,
  },
  {
    code: '1',
    name: '오프라인',
    color: 'bg-red-500',
    icon: OfflineIcon,
  },
  {
    code: '2',
    name: '자리 비움',
    color: 'bg-yellow-500',
    icon: AwayIcon,
  },
  {
    code: '3',
    name: '방해 금지',
    color: 'bg-gray-500',
    icon: DNDIcon,
  },
];
