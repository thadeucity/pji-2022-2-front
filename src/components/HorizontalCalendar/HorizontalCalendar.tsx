import React, { useMemo } from 'react'
import { Dayjs } from 'dayjs'
import { DayBtn } from './DayBtn';

import styles from './HorizontalCalendar.module.scss'

interface HorizontalCalendarProps{
  selectedDay: Dayjs;
}

export const HorizontalCalendar: React.FC<HorizontalCalendarProps> = ({
  selectedDay
}) => {
  const dayArray = useMemo(() => {
    const unParsedDays = [
      selectedDay.clone().subtract(3, 'day'),
      selectedDay.clone().subtract(2, 'day'),
      selectedDay.clone().subtract(1, 'day'),
      selectedDay.clone(),
      selectedDay.clone().add(1, 'day'),
      selectedDay.clone().add(2, 'day'),
      selectedDay.clone().add(3, 'day')
    ]

    return unParsedDays.map(day => ({
      key: day.format('YYYY-MM-DD'),
      day: day.startOf('day'),
      isSelected: day.isSame(selectedDay, 'day')
    }));
  }, [selectedDay])

  return (
    <ol className={styles.horizontal_calendar}>
      {dayArray.map(day => (
        <li key={day.key}>
          <DayBtn
            day={day.day}
            selected={day.isSelected}
            onClick={() => {}}
          />
        </li>
      ))}
    </ol>
  );
}
