import Link from 'next/link';

import { Button } from '../Button';

import styles from '../../styles/components/sections/Landing.module.css';

export const Landing: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Hi! My name is Lucas.</h1>
      <h3>
        I&apos;m a self-taught software developer, passionate about technology.
        I enjoy problem solving and continuous learning.
      </h3>
      <Link href='/#about'>
        <a>
          <Button title='Read More' />
        </a>
      </Link>
    </div>
  );
};
