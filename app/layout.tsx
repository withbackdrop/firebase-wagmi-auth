import { ReactNode } from 'react';

import WagmiWrapper from '@/modules/application/components/WagmiWrapper';
import { SessionContextProvider } from '@/modules/application/contexts/SessionContext';
import './globals.css';

export const metadata = {
  title: 'Firebase + Wagmi Authentication with Next.js',
  description: 'Firebase + Wagmi Authentication with Next.js',
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
