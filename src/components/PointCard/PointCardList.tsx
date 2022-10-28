import React from 'react'
import { PointCard } from './PointCard';

import styles from './PointCardList.module.scss'

interface PointCardListProps{

}

const test = [
  {
    email: 'joao@mail.com',
    name: 'João das Neves',
    points: 1250
  },
  {
    email: 'felipe@mail.com',
    name: 'Felipe Marino',
    points: 985,
  },
  {
    email: 'rocky@mail.com',
    name: 'Rocky Balboa',
    points: 889,
  },
  {
    email: 'johane@mail.com',
    name: 'Johane Doe',
    points: 750,
  },
  {
    email: 'mariadasflores@mail.com',
    name: 'Maria das Flores',
    points: 500,
  },
  {
    email: 'arlindosilva@mail.com',
    name: 'Arlindo Silva',
    points: 250,
  },
  {
    email: 'marinaroseline@mail.com',
    name: 'Marina Roseline',
    points: 100,
  },
  {
    email: 'caiosilva@mail.com',
    name: 'Caio Silva',
    points: 50,
  }
]

export const PointCardList: React.FC<PointCardListProps> = ({}) => {
  return (
    <ol className={styles.point_card_list}>
      {test.map((user) => (
        <PointCard
          name={user.name}
          points={user.points}
          key={user.email}
        />
      ))}
    </ol>
  );
}
