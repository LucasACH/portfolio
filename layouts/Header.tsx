import { useScrollDirection } from '../hooks/useScrollDirection';

import styles from '../styles/layouts/Header.module.css';

interface HeaderProps {
  children: JSX.Element | JSX.Element[];
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={`${styles.container} ${
        scrollDirection
          ? scrollDirection > 0
            ? styles.shadow
            : styles.hide
          : ''
      }`}
    >
      {children}
    </div>
  );
};
