import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { QueryClient } from '@tanstack/query-core';
import { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  baseGoerli,
  foundry,
  goerli,
  optimismGoerli,
  polygonMumbai,
} from 'wagmi/chains';
import { ToastContainer } from "react-toastify";
import { publicProvider } from 'wagmi/providers/public';

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@rainbow-me/rainbowkit/styles.css';
import "react-toastify/ReactToastify.min.css";

import Header from '@/components/layout/Header';

import { useIsSsr } from '../utils/ssr';

const { chains, provider } = configureChains(
  [
    goerli,
    polygonMumbai,
    optimismGoerli,
    baseGoerli,
    foundry
    // ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const wagmiConfig = createClient({
  autoConnect: true,
  connectors,
  provider
});

// const reactQueryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//   },
// });

function MyApp({ Component, pageProps }: AppProps) {
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (
    <WagmiConfig client={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {/* <QueryClientProvider client={reactQueryClient}> */}
          <Header />
          <Component {...pageProps} />
          <ToastContainer position="bottom-right" newestOnTop />
        {/* </QueryClientProvider> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
