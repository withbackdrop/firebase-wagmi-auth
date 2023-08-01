import WalletConnect from '@/modules/application/components/WalletConnect';

export default async function IndexPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="pb-5 text-2xl font-bold">Firebase + Wagmi Authentication with Next.js</h1>

      <WalletConnect />
    </div>
  );
}
