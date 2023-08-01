'use client';

import { signMessage } from '@wagmi/core';
import { useAccount, useConnect } from 'wagmi';

import { getDataForAuth } from '@/models/application/services/AuthenticationService';
import { useSessionContext } from '@/modules/application/contexts/SessionContext';

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();

  const { user, login, logout } = useSessionContext();

  const handleLogin = async () => {
    const dataForAuth = await getDataForAuth();

    const signature = await signMessage({
      message: dataForAuth.message,
    });

    await login(signature as string, dataForAuth.nonce, address.toLowerCase());
  };

  if (user) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <p className="font-mono">Logged in as: {user.id}</p>
        <button
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex flex-col space-y-5">
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={async () => {
            await handleLogin();
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5">
      {connectors.map((_connector) => (
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          key={_connector.id}
          onClick={async () => {
            await connect({ connector: _connector });
          }}
        >
          Connect {_connector.name}
        </button>
      ))}

      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  );
};

export default WalletConnect;
