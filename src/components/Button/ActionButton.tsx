import React from 'react'
import { Button } from './Button'
import styles from './ActionButton.module.scss'

interface ActionButtonProps{
  children: React.ReactNode
  className?: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  className, 
  children
}) => {
  return (
    <Button className={`${styles.action_btn} ${className}`}>
      {children}
    </Button>
  );
}
