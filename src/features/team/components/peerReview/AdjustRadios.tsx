import { useScore } from '../../context/useScore';

interface Props {
  name: string;
}

function AdjustRadios({ name }: Props) {
  const { handleScore } = useScore();

  const RADIO_OPTION = [
    {
      id: 5,
      name,
      label: '매우 그렇다',
    },
    {
      id: 4,
      name,
      label: '그렇다',
    },
    {
      id: 3,
      name,
      label: '보통이다',
    },
    {
      id: 2,
      name,
      label: '아니다',
    },
    {
      id: 1,
      name,
      label: '전혀 아니다',
    },
  ];

  return (
    <div
      className="flex flex-col md:flex-row gap-3"
      role="radiogroup"
      aria-labelledby="question-label"
    >
      {RADIO_OPTION.map(({ id, name, label }, i) => (
        <span className="flex gap-1" key={i}>
          <input
            type="radio"
            name={name}
            id={`${name}-${id}`}
            value={id}
            onChange={() => handleScore(id)}
            required
          />
          <label htmlFor={`${name}-${id}`}>{label}</label>
        </span>
      ))}
    </div>
  );
}
export default AdjustRadios;
