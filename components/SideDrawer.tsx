import styles from '../styles/components/SideDrawer.module.css';
import { NavBar } from './NavBar';
import { ThemeSwitch } from './ThemeSwitch';
import CrossIcon from '../assets/icons/cross.svg';
import { IconButton } from './IconButton';
import { Dispatch, SetStateAction, useContext } from 'react';
import { SideDrawerContext } from '../contexts/SideDrawerContext';

export const SideDrawer: React.FC = () => {
  const { open, toggleSideDrawer } = useContext(SideDrawerContext);
  return (
    <div className={`${styles.backdrop} ${open ? styles.open : ''}`}>
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
