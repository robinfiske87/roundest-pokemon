import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Head from "next/head";

import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  const description =
    "We're here to answer the eternal question: What Pokémon is roundest?";
  const title = "Roundest Pokémon - Public Poll";
  // const imageMetaURL = "https://roundest-pokemon-nu.vercel.app/spheal.png";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={"https://roundest-pokemon-nu.vercel.app/favicon.ico"} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <Component {...pageProps} />
      </>
  );
};
export default trpc.withTRPC(MyApp);