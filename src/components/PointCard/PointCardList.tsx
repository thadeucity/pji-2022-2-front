import React, { useCallback } from 'react'
import { mockedPoints } from './MockedPoints';
import { PointCard } from './PointCard';

import styles from './PointCardList.module.scss'

interface PointCardListProps{

}

export const PointCardList: React.FC<PointCardListProps> = ({}) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  const onSelect = useCallback((newSelection: string) => {
    setSelected(curr => newSelection === curr ? null : newSelection);
  }, []);

  return (
    <ol className={styles.point_card_list}>
      {mockedPoints.map((user) => (
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
