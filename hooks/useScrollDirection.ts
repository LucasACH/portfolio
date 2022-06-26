import { useCallback, useEffect, useState } from 'react';

export const useScrollDirection = () => {
  const [y, setY] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<number | null>(null);

  const headerHeight: number = 80;

  const handleScrollEvent = useCallback(
    (event: Event) => {
      const window = event.currentTarget as Window;
      const scrollY = window.scrollY;
      const scrollDirection = y > scrollY ? 1 : -1;
      setScrollDirection(scrollY > headerHeight ? scrollDirection : null);
      setY(scrollY);
    },
    [y]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [handleScrollEvent]);

  return scrollDirection;
};
