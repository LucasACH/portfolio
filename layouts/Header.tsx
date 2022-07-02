import { NavBar } from '../components/NavBar';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { useScrollDirection } from '../hooks/useScrollDirection';
import Logo from '../assets/icons/logo.svg';
import BurgerIcon from '../assets/icons/burger.svg';

import styles from '../styles/layouts/Header.module.css';
import { IconButton } from '../components/IconButton';
import { useContext } from 'react';
import { SideDrawerContext } from '../contexts/SideDrawerContext';

export const Header: React.FC = () => {
  const scrollDirection = useScrollDirection();
  const { toggleSideDrawer } = useContext(SideDrawerContext);

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
      <div className={styles.desktop}>
        <NavBar />
        <ThemeSwitch />
      </div>
      <div className={styles.mobile}>
        <Logo />
        <IconButton onClick={toggleSideDrawer}>
          <BurgerIcon />
        </IconButton>
      </div>
    </div>
  );
};
