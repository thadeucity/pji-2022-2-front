import React, { useMemo } from 'react'
import {Dayjs} from 'dayjs'

import styles from './DayBtn.module.scss'

interface DayBtnProps{
  day: Dayjs;
  selected: boolean;
  onClick: (day: string) => void;
}

export const DayBtn: React.FC<DayBtnProps> = ({ day, selected, onClick }) => {
  const isFutureDay = useMemo(() => {
    return day.isAfter(new Date(), 'day')
  }, [day]);

  const isToday = useMemo(() => {
    return day.isSame(new Date(), 'day')
  }, [day]);

  console.log()

  return (
    <button 
      className={`${styles.day_btn} ${selected ? styles.active : ''} ${isFutureDay ? styles.disabled : ''}`}
      type="button"
      onClick={() => !isFutureDay && onClick(day.format('YYYY-MM-DD'))}
    >
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
