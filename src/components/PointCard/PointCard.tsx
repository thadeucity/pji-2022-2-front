import React from 'react'
import { FiChevronsDown } from 'react-icons/fi'

import styles from './PointCard.module.scss'

interface PointCardProps{
  name: string
  points: number
}

export const PointCard: React.FC<PointCardProps> = ({ 
  name,
  points 
}) => {
  return (
    <button type="button"  className={styles.point_card}>
      <div className={styles.point_card__avatar}> 
        <img 
          src={`https://avatars.dicebear.com/api/initials/${name}.svg `}
          alt={`${name} - avatar`} 
        />
      </div>
      <div className={styles.point_card__main}>
        <b>{name}</b>
        <em className='highlight-text'>{points}</em>
      </div>
      <span className={`highlight-text ${styles.point_card__btn}`}>
        <FiChevronsDown />
      </span>
    </button>
  );
}
