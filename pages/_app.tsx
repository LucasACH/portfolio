import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { NavigationProvider } from '../contexts/NavigationContext';
import { SideDrawerProvider } from '../contexts/SideDrawerContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <SideDrawerProvider>
          <Component {...pageProps} />
        </SideDrawerProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
