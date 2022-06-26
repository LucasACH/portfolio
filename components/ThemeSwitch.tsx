import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from '../styles/components/ThemeSwitch.module.css';
import SunOutline from '../assets/icons/sun-outline.svg';
import MoonOutline from '../assets/icons/moon-outline.svg';

export const ThemeSwitch: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <SunOutline className={theme == 'light' ? styles.filled_sun : ''} />
      <label className={styles.switch}>
        <input
          type='checkbox'
          checked={theme == 'dark'}
          onChange={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
        ></input>
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <MoonOutline className={theme == 'dark' ? styles.filled_moon : ''} />
    </div>
  );
};
