import Link from 'next/link';
import React from 'react'
import { FiCalendar, FiLogOut, FiUsers } from 'react-icons/fi';
import { Portal } from '../Portal';

import styles from './AppMenu.module.scss';

interface AppMenuProps{
  isOpen: boolean
  onClose: () => void
}

export const AppMenu: React.FC<AppMenuProps> = ({isOpen, onClose}) => {

  if (!isOpen) return null

  return (
    <Portal selector='__MODALS_PORTAL__'>
      <div className={styles.app__menu}>
        <button className={styles.close_btn} onClick={onClose}/>
        <div className={styles.app_menu__content}>
          <nav>
            <ul>
              <li>
                <FiCalendar />
                <Link href='/dashboard'>Histórico</Link>
              </li>
              <li>
                <FiUsers />
                <button>Grupo</button>
              </li>
              <li>
                <FiLogOut />
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href='/api/auth/logout'>Logout</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Portal>
  );
}
