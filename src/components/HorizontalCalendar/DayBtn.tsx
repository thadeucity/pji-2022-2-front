import React, { useMemo } from 'react'
import {Dayjs} from 'dayjs'

import styles from './DayBtn.module.scss'

interface DayBtnProps{
  day: Dayjs;
  selected: boolean;
  onClick: (day: Dayjs) => void;
}

export const DayBtn: React.FC<DayBtnProps> = ({ day, selected }) => {
  const isFutureDay = useMemo(() => {
    return day.isAfter(new Date(), 'day')
  }, [day]);

  const isToday = useMemo(() => {
    return day.isSame(new Date(), 'day')
  }, [day]);

  console.log()

  return (
    <button className={`${styles.day_btn} ${selected ? styles.active : ''} ${isFutureDay ? styles.disabled : ''}`}>
      <span>
        {day.format('D')}
      </span>

      <span>
        {day.format('ddd')}	
      </span>
        
      {isToday && <span className={styles.today}>●</span>}
    </button>
  );
}
