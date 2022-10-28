import React from 'react'
import { FiChevronsDown } from 'react-icons/fi'

import styles from './PointCard.module.scss'

interface PointCardProps{
  name: string
  points: number
  onSelect: () => void
  isExpanded: boolean
  isWinner: boolean
  exercises: { 
    label: string
    val: number
    suffix: string 
  }[]
}

export const PointCard: React.FC<PointCardProps> = ({ 
  name,
  points,
  isExpanded,
  isWinner,
  onSelect,
  exercises
}) => {
  return (
    <button 
      type="button"  
      className={`${styles.point_card} ${isExpanded ? styles.expanded : ''}`}
      onClick={onSelect}
    >
      <div className={styles.point_card__base}>
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
      </div>

      {isExpanded && (
        <ul className={styles.exercise__list}>
          {exercises.map((exercise) => (
            <li 
              key={name + exercise.label} 
              className={styles.exercise_item}
            >
              <span className={styles.exercise__name}>{exercise.label}</span>
              <span className={styles.exercise__points}>
                {exercise.val} {exercise.suffix}
              </span>
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
