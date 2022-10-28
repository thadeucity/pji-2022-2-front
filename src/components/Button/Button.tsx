import React, { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  disabled = false,
  className = '',
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${styles.main_btn} base-button ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
