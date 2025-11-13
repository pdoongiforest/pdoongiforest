interface Props {
  onChange: (switchText: 'Write' | 'Preview') => void;
  switchMarkDown: 'Write' | 'Preview';
}

function SwitchBoard({ onChange, switchMarkDown }: Props) {
  const handleSwitch = (switchText: 'Write' | 'Preview') => {
    onChange(switchText);
  };
  const ACTIVE = 'text-white bg-[#858482]';
  const DEFAULT = 'text-[#636362]';
  return (
    <div className="flex gap-1">
      <button
        type="button"
        className={`rounded-tl-lg rounded-tr-lg border-2 border-b-0 border-[#636362] w-25 h-10 ${switchMarkDown === 'Write' ? ACTIVE : DEFAULT}`}
        onClick={() => {
          handleSwitch('Write');
        }}
      >
        Write
      </button>
      <button
        type="button"
        className={`rounded-tl-lg rounded-tr-lg border-2 border-b-0 border-[#636362] w-25 h-10 ${switchMarkDown === 'Preview' ? ACTIVE : DEFAULT}`}
        onClick={() => {
          handleSwitch('Preview');
        }}
      >
        Preview
      </button>
    </div>
  );
}
export default SwitchBoard;
