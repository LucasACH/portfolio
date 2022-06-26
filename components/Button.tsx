import { MouseEventHandler } from 'react';

import styles from '../styles/components/Button.module.css';

interface ButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
}

export const Button: React.FC<ButtonProps> = ({ title, onClick, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};
