import type { AppProps } from 'next/app';

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import '../styles/globals.css'; // Adjust the path if necessary

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;