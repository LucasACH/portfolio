import { MouseEventHandler } from 'react';
import styles from '../styles/components/IconButton.module.css';

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  children: JSX.Element;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
