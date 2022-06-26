import { useContext } from 'react';
import Link from 'next/link';
import { NavigationContext } from '../contexts/NavigationContext';
import Logo from '../assets/icons/logo.svg';

import { sections } from '../constants/sections';

import styles from '../styles/components/NavBar.module.css';

export const NavBar: React.FC = () => {
  const { hash } = useContext(NavigationContext);

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
            >
              {section.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
