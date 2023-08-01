'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useDisconnect } from 'wagmi';

import firebaseApp from '@/firebase/firebase';
import { login, logout } from '@/models/application/services/AuthenticationService';
import { UserInterface } from '@/models/users/interfaces/UserInterface';
import { getUserById } from '@/models/users/services/UserService';
import Spinner from '@/modules/common/components/Spinner';

const auth = getAuth(firebaseApp);

type Session = {
  isLoading: boolean;
  user: UserInterface | null;
  login: (signature: string, nonce: number, address: string) => any;
  logout: () => any;
};

export const SessionContext = createContext<Session>({} as Session);

export const SessionContextProvider = (props) => {
  const [user, setUser] = useState<UserInterface>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const { disconnect } = useDisconnect();

  const handleLogin = async (signature: string, nonce: number, address: string) => {
    try {
      await login(signature, nonce, address);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    disconnect();
    await logout();

    setIsLoggingOut(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        const actualUser = await getUserById(_user.uid);
        setUser(actualUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const memoizedUserContextValue = useMemo(
    () => ({
      isLoading,
      user,
      login: handleLogin,
      logout: handleLogout,
    }),
    [isLoading, user]
  );

  if (isLoggingOut || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="l" align="center" />
      </div>
    );
  }

  return <SessionContext.Provider value={memoizedUserContextValue} {...props} />;
};

export const useSessionContext = () => useContext(SessionContext);
