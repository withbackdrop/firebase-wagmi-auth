import { ReactNode } from 'react';

import WagmiWrapper from '@/modules/application/components/WagmiWrapper';
import { SessionContextProvider } from '@/modules/application/contexts/SessionContext';
import './globals.css';

export const metadata = {
  title: 'Firebase Wallet Connect with Next JS',
  description: 'Firebase Wallet Connect with Next JS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiWrapper>
          <SessionContextProvider>{children}</SessionContextProvider>
        </WagmiWrapper>
      </body>
    </html>
  );
}
