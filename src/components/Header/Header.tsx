import React, {HTMLAttributes} from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import { FiMenu } from 'react-icons/fi';
import styles from './Header.module.scss'
import { useAppMenu } from '../../hooks/useAppMenu';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: never
}

export const Header: React.FC<HeaderProps> = () => {
  const { user } = useUser();
  const { toggleMenu } = useAppMenu();

  return (
    <header className={styles.header}>
    <div className={styles.header__avatar}>
      <img 
        src={`https://avatars.dicebear.com/api/initials/${user?.name || 'error'}.svg `}
        alt={`${'Johane Doe'} - avatar`} 
      />
    </div>
    <b className={styles.header__username}>{user?.name || ''}</b>
    <button 
      className={`highlight-text ${styles.menu__btn}`} 
      onClick={() => toggleMenu(true)}
    >
      <FiMenu />
    </button>
  </header>
  );
}
