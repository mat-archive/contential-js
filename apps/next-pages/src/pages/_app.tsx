import type { AppProps } from 'next/app';
import { Mulish } from 'next/font/google';
import '@/styles/globals.css';

const font = Mulish({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>
      <Component {...pageProps} />
    </div>
  );
}
