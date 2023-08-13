import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  baseGoerli,
  goerli,
  optimismGoerli,
  zoraTestnet,
} from 'wagmi/chains';
import { ToastContainer } from "react-toastify";
import { publicProvider } from 'wagmi/providers/public';

import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import "react-toastify/ReactToastify.min.css";

import { useIsSsr } from '../utils/ssr';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,
    optimismGoerli,
    baseGoerli,
    zoraTestnet,
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

function MyApp({ Component, pageProps }: AppProps) {
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" newestOnTop />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
