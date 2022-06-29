import { useContext } from 'react';
import Link from 'next/link';

import Logo from '../assets/icons/logo.svg';

import { sections } from '../constants/sections';

import { NavigationContext } from '../contexts/NavigationContext';
import { SideDrawerContext } from '../contexts/SideDrawerContext';

import styles from '../styles/components/NavBar.module.css';

export const NavBar: React.FC = () => {
  const { hash } = useContext(NavigationContext);
  const { open, toggleSideDrawer } = useContext(SideDrawerContext);

  return (
    <div className={styles.container}>
      <Link href='/#'>
        <a>
          <Logo />
        </a>
      </Link>
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
