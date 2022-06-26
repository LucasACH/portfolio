import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface NavigationContextProps {
  hash: string;
  setHash: Dispatch<SetStateAction<string>>;
}

export const NavigationContext = createContext<NavigationContextProps>({
  hash: '',
  setHash: () => {},
});

interface NavigationProviderProps {
  children: JSX.Element;
}
export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [hash, setHash] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const onHashChangeStart = (url: string) => setHash(url.replace('/#', ''));

    router.events.on('hashChangeStart', onHashChangeStart);

    return () => {
      router.events.off('hashChangeStart', onHashChangeStart);
    };
  }, [router.events]);

  return (
    <NavigationContext.Provider value={{ hash, setHash }}>
      {children}
    </NavigationContext.Provider>
  );
};
