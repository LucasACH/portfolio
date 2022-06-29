import { useContext } from 'react';

import { NavBar } from './NavBar';
import { ThemeSwitch } from './ThemeSwitch';
import { IconButton } from './IconButton';

import CrossIcon from '../assets/icons/cross.svg';

import { SideDrawerContext } from '../contexts/SideDrawerContext';

import styles from '../styles/components/SideDrawer.module.css';

export const SideDrawer: React.FC = () => {
  const { open, toggleSideDrawer } = useContext(SideDrawerContext);
  return (
    <div
      className={`${styles.backdrop} ${open ? styles.open : ''}`}
      onClick={toggleSideDrawer}
    >
      <div className={styles.drawer}>
        <IconButton onClick={toggleSideDrawer}>
          <CrossIcon />
        </IconButton>
        <NavBar />
        <ThemeSwitch />
      </div>
    </div>
  );
};
