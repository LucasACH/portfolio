import { useContext } from 'react';
import Link from 'next/link';
import { NavigationContext } from '../contexts/NavigationContext';
import Logo from '../assets/icons/logo.svg';

import { sections } from '../constants/sections';

import styles from '../styles/components/NavBar.module.css';
import { SideDrawerContext } from '../contexts/SideDrawerContext';

export const NavBar: React.FC = () => {
  const { hash } = useContext(NavigationContext);
  const { open, toggleSideDrawer } = useContext(SideDrawerContext);

  return (
    <div className={styles.container}>
      <Logo />
      <ul className={styles.ul}>
        {sections.map((section) => (
          <Link key={section.id} href={`/#${section.id}`}>
            <li
              className={`${styles.li} ${
                section.id == hash ? styles.selected : ''
              }`}
              onClick={() => open && toggleSideDrawer()}
            >
              {section.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
