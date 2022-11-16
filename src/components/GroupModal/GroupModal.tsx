import Link from 'next/link';
import React from 'react'
import { FiCalendar, FiLogOut, FiUsers } from 'react-icons/fi';
import { Button } from '../Button/Button';
import { Portal } from '../Portal';

import styles from './GroupModal.module.scss';

interface GroupModalProps{
  isOpen: boolean
  onClose: () => void
}

export const GroupModal: React.FC<GroupModalProps> = ({isOpen, onClose}) => {

  if (!isOpen) return null

  return (
    <Portal selector='__MODALS_PORTAL__'>
      <div className={styles.group__modal}>
        <button className={styles.close_btn} onClick={onClose}/>
        <div className={styles.group__modal__content}>
          <input size={1}/>
          <Button>Criar / Entrar no Grupo</Button>
        </div>
      </div>
    </Portal>
  );
}
