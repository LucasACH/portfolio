import { createElement } from 'react';
import styles from '../styles/components/Snackbar.module.css';

interface SnackbarProps {
  show: boolean;
  icon: any;
  message: string;
}

export const Snackbar: React.FC<SnackbarProps> = ({ show, icon, message }) => {
  return (
    <div className={`${styles.snackbar} ${show ? styles.show : ''}`}>
      {show && createElement(icon)}
      {message}
    </div>
  );
};
