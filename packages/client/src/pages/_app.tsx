import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { QueryClient } from '@tanstack/query-core';
import { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  baseGoerli,
  foundry,
  goerli,
  optimismGoerli,
  polygonMumbai,
  zoraTestnet,
} from 'wagmi/chains';
import { ToastContainer } from "react-toastify";
import { publicProvider } from 'wagmi/providers/public';

import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import "react-toastify/ReactToastify.min.css";

import Header from '@/components/layout/Header';

import { useIsSsr } from '../utils/ssr';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,
    polygonMumbai,
    optimismGoerli,
    baseGoerli,
    zoraTestnet,
    foundry
    // ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
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
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {/* <QueryClientProvider client={reactQueryClient}> */}
          <Component {...pageProps} />
          <ToastContainer position="bottom-right" newestOnTop />
        {/* </QueryClientProvider> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
