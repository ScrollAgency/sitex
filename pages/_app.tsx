import type { AppProps } from 'next/app';
import { PlasmicRootProvider } from "@plasmicapp/react-web";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import '../styles/globals.css'; // Adjust the path if necessary

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlasmicRootProvider>
      <Component {...pageProps} />
    </PlasmicRootProvider>
  );
}

export default MyApp;