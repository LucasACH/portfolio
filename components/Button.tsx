import { MouseEventHandler } from 'react';

import styles from '../styles/components/Button.module.css';
import { Spinner } from './Spinner';

interface ButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  disabled,
  loading,
}) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {loading ? <Spinner /> : title}
    </button>
  );
};
