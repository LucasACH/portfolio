import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { NavigationProvider } from '../contexts/NavigationContext';
import { SideDrawerProvider } from '../contexts/SideDrawerContext';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <SideDrawerProvider>
          <Component {...pageProps} />
          <Script
            strategy='lazyOnload'
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />

          <Script id='google-analytics' strategy='lazyOnload'>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
          </Script>
        </SideDrawerProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
