import { type } from 'os';
import { MouseEventHandler } from 'react';

import styles from '../styles/components/Button.module.css';
import { Spinner } from './Spinner';

interface ButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  loading?: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  disabled,
  loading,
  type,
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {loading ? <Spinner /> : title}
    </button>
  );
};
