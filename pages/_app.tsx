import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { NavigationProvider } from '../contexts/NavigationContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <Component {...pageProps} />
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
