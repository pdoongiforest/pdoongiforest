export type StatusCode = 0 | 1 | 2 | 3 | null;

const status = [
  {
    code: 0,
    name: 'Online',
    color: 'bg-green-500',
  },
  {
    code: 1,
    name: 'Offline',
    color: 'bg-red-500',
  },
  {
    code: 2,
    name: 'Away',
    color: 'bg-yellow-500',
  },
  {
    code: 3,
    name: 'DND',
    color: 'bg-gray-500',
  },
];

function Status() {
  return (
    <div className={`w-4 h-4 rounded-full absolute -bottom-1 -right-1 ${status[0].color}`}></div>
  );
}

export default Status;
