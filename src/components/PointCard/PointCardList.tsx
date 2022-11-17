import React, { useCallback } from 'react'
import { mockedPoints } from './MockedPoints';
import { PointCard } from './PointCard';
import { useDateActivities } from '../../io/activities'

import styles from './PointCardList.module.scss'

interface PointCardListProps{

}

export const PointCardList: React.FC<PointCardListProps> = ({}) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  const onSelect = useCallback((newSelection: string) => {
    setSelected(curr => newSelection === curr ? null : newSelection);
  }, []);

  const {isLoading, queriedResponse} = useDateActivities('2020-01-01'); 

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log({queriedResponse});

  return (
    <ol className={styles.point_card_list}>
      {queriedResponse.map((user) => (
        <PointCard
          name={user.name}
          points={user.points}
          key={user.email}
          exercises={user.exercises}
          isExpanded={selected === user.email}
          isWinner
          onSelect={() => onSelect(user.email)}
        />
      ))}
    </ol>
  );
}
