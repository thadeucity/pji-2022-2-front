import React, {HTMLAttributes} from 'react'
import { FiMenu } from 'react-icons/fi';
import styles from './Header.module.scss'

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: never
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
    <div className={styles.header__avatar}>
      <img 
        src={`https://avatars.dicebear.com/api/initials/${'Johane Doe'}.svg `}
        alt={`${'Johane Doe'} - avatar`} 
      />
    </div>
    <b className={styles.header__username}>Johane Doe</b>
    <button className={`highlight-text ${styles.menu__btn}`}>
      <FiMenu />
    </button>
  </header>
  );
}
