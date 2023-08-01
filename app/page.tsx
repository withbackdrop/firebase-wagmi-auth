import WalletConnect from '@/modules/application/components/WalletConnect';

export default async function IndexPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="pb-5 text-2xl font-bold">Firebase Wallet Connect with Next JS</h1>

      <WalletConnect />
    </div>
  );
}
