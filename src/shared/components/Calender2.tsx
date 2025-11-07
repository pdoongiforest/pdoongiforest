import Calendar from 'react-calendar';
import C from './Calender.module.css';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import type { CalendarProps } from 'react-calendar';

interface Props {
  isHidden: boolean;
  callBack: (date: string) => void;
  date?: string;
}

function Calender2({ isHidden, callBack, date }: Props) {
  const [hidden, setHidden] = useState(isHidden);
  const [range, setRange] = useState<[Date, Date] | null>(null);

  useEffect(() => {
    if (date) {
      const convertDate = new Date(date);
      console.log(convertDate);
      setRange([convertDate, convertDate]);
      setHidden(true);
    }
  }, []);

  const handleChange: CalendarProps['onChange'] = async (value) => {
    if (Array.isArray(value)) {
      const [start, end] = value;
      if (start && end) {
        setRange([start, end]);
        setHidden(true);
        callBack(`${format(end, 'yyyy-MM-dd')}`);
      }
      return;
    }

    if (value instanceof Date) {
      setRange([value, value]);
      setHidden(true);
      callBack(format(value, 'yyyy-MM-dd'));
    }
  };

  const handleClick = () => {
    setHidden(false);
  };

  const handleCancel = () => {
    setRange(null);
    setHidden(true);
    callBack('');
  };
  const handleEdit = () => {
    setHidden(false);
    setRange(null);
  };

  return (
    <div className={C.wrapper}>
      {hidden ? (
        range ? (
          <div className={C.edit}>
            <span className={C.dateText}>{`${format(range[1], 'yyyy-MM-dd')}`}</span>
            <button type="button" className={C.editBtn} onClick={handleEdit}>
              수정
            </button>
          </div>
        ) : (
          <button type="button" className={C.calendarBtn} onClick={handleClick}>
            날짜선택
          </button>
        )
      ) : (
        <button type="button" className={C.cancleBtn} onClick={handleCancel}>
          선택취소
        </button>
      )}
      {!hidden && (
        <div className={C.container}>
          <Calendar
            onChange={handleChange}
            value={range ?? undefined}
            selectRange
            calendarType="gregory"
            formatDay={(_, date) => String(date.getDate())}
            tileClassName={({ date, view }) => {
              if (view !== 'month') return '';
              const day = date.getDay();
              if (day === 0) return 'calendar-sunday';
              if (day === 6) return 'calendar-saturday';
              return '';
            }}
          />
        </div>
      )}
    </div>
  );
}
export default Calender2;
