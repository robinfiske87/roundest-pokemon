import 'tailwindcss/tailwind.css'
import "../styles/globals.css"
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {

  const description = "We're here to answer the eternal question: What Pokémon is roundest?";
  const title = "Roundest Pokémon - Public Poll";

  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);



