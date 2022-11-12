import React from 'react'
import { Button, ButtonProps } from './Button'
import styles from './ActionButton.module.scss'

interface ActionButtonProps extends ButtonProps {
  children: React.ReactNode
  className?: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  className, 
  children,
  ...rest
}) => {
  return (
    <Button className={`${styles.action_btn} ${className}`} {...rest}>
      {children}
    </Button>
  );
}
