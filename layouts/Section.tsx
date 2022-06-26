import { useContext, useEffect, useRef } from 'react';
import Link from 'next/link';

import { NavigationContext } from '../contexts/NavigationContext';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

import styles from '../styles/layouts/Section.module.css';

export interface SectionProps {
  id: string | undefined;
  title: string;
  showTitle: boolean;
  children: JSX.Element | JSX.Element[];
}

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  showTitle,
  children,
}) => {
  const { setHash } = useContext(NavigationContext);

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { rootMargin: '-50%' });

  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    isVisible && setHash(id as string);
    // eslint-disable-next-line
  }, [isVisible]);

  return (
    <div className={styles.container} id={id} ref={ref}>
      {showTitle && (
        <Link href={`/#${id}`}>
          <h2>{`// ${title}`}</h2>
        </Link>
      )}
      {children}
    </div>
  );
};
