import { getAuth, signInWithCustomToken } from 'firebase/auth';

import firebaseApp from '@/firebase/firebase';
import { AuthenticationApiService } from '@/models/application/internalApiServices/AuthenticationApiService';

export async function logout() {
  const auth = getAuth(firebaseApp);
  return auth.signOut();
}

export function getMessageString(nonce) {
  return `Hi there. Sign this message to prove you own this wallet. This doesn't cost anything.\n\nSecurity code (you can ignore this): ${nonce}`;
}

export async function getDataForAuth() {
  const randomValues = window.crypto.getRandomValues(new Uint32Array(1));
  const nonce = randomValues[0];
  return {
    nonce,
    message: getMessageString(nonce),
  };
}

export async function loginWithToken(firebaseToken: string) {
  const auth = getAuth(firebaseApp);
  await signInWithCustomToken(auth, firebaseToken);
}

export async function login(signature: string, nonce: number, address: string) {
  const service = new AuthenticationApiService(true);

  const { firebaseToken } = await service.login(signature, nonce, address.toLowerCase());

  await loginWithToken(firebaseToken);
}
