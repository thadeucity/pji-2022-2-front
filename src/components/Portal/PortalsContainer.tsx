import React from 'react'
import styles from './PortalsContainer.module.scss'

interface PortalsContainerProps {
  children: React.ReactNode
}

const PortalsContainer: React.FC<PortalsContainerProps> = ({ children }) => {
  return (
    <>
      <div className={styles.portal__container} id="__MENUS_PORTAL__" />
      <div className={`${styles.portal__container} ${styles.modal}`} id="__MODALS_PORTAL__" />
      {children}
    </>
  )
}

export default PortalsContainer
