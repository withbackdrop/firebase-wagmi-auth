'use client';

import { mainnet, configureChains, WagmiConfig, createConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

const WagmiWrapper = ({ children }) => <WagmiConfig config={config}>{children}</WagmiConfig>;

export default WagmiWrapper;
