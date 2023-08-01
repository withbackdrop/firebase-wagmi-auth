import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { NextResponse } from 'next/server';

import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import { getMessageString } from '@/models/application/services/AuthenticationService';

export async function POST(res) {
  const data = await res.json();

  const { address, signature, nonce } = data;

  try {
    const recoveredAddress = recoverPersonalSignature({
      data: Buffer.from(getMessageString(nonce), 'utf8'),
      signature,
    });

    // Compare if the address from request is the same as the address recovered from the signed message.
    if (address.toLowerCase() !== recoveredAddress.toLowerCase()) {
      return new Response('Authentication failed.', {
        status: 401,
      });
    }
  } catch (e) {
    return new Response('Invalid signature.', {
      status: 401,
    });
  }

  // VERIFICATION PASSED -> USER CAN LOG IN.
  // Create Firebase custom auth token based on that eth address so the client can log in. Check if the user exists and if not create a new user.
  const usersRef = firebaseAdmin.firestore().collection('users');
  const snapshot = await usersRef.where('address', '==', address.toLowerCase()).get();
  let userId = null;
  if (snapshot.empty) {
    // Create user if it doesn't exist.
    const newUser = await usersRef.add({
      address: address.toLowerCase(),
      updatedAt: Date.now(),
      createdAt: Date.now(),
    });
    userId = newUser.id;
  } else {
    userId = snapshot.docs[0].id;
  }

  // Send token back for user to finish login.
  const firebaseToken = await firebaseAdmin.auth().createCustomToken(userId);

  return NextResponse.json({ firebaseToken });
}
