import 'tailwindcss/tailwind.css'
import "../styles/globals.css"
import type { AppType, AppProps } from 'next/app';
import { trpc } from '../utils/trpc';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {

  const description = "We're here to answer the eternal question: What Pokémon is roundest?";
  const title = "Roundest Pokémon - Public Poll";

  return <Component {...pageProps} />;
};

import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/routers/_app";

function getBaseUrl() {
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);