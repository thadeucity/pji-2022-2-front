import React, { useCallback, useMemo } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { DayBtn } from './DayBtn';

import styles from './HorizontalCalendar.module.scss'

interface HorizontalCalendarProps{
  selectedDay: string;
  onChange: (day: string) => void;
}

export const HorizontalCalendar: React.FC<HorizontalCalendarProps> = ({
  selectedDay,
  onChange
}) => {
  const dayArray = useMemo(() => {
    const safeDay = dayjs(selectedDay);

    const unParsedDays = [
      safeDay.clone().subtract(3, 'day'),
      safeDay.clone().subtract(2, 'day'),
      safeDay.clone().subtract(1, 'day'),
      safeDay.clone(),
      safeDay.clone().add(1, 'day'),
      safeDay.clone().add(2, 'day'),
      safeDay.clone().add(3, 'day')
    ]

    return unParsedDays.map(day => ({
      key: day.format('YYYY-MM-DD'),
      day: day.startOf('day'),
      isSelected: day.isSame(safeDay, 'day')
    }));
  }, [selectedDay])

  const handleDayClick = useCallback((day: string) => {
    onChange(day);
  }, [onChange])

  return (
    <ol className={styles.horizontal_calendar}>
      {dayArray.map(day => (
        <li key={day.key}>
          <DayBtn
            day={day.day}
            selected={day.isSelected}
            onClick={handleDayClick}
          />
        </li>
      ))}
    </ol>
  );
}
