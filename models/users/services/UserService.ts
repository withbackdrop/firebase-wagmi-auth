import { doc, getDoc, getFirestore } from 'firebase/firestore';

import firebaseApp from '@/firebase/firebase';
import { UserInterface } from '@/models/users/interfaces/UserInterface';

const COLLECTION_NAME = 'users';

export async function getUserById(userId: string): Promise<UserInterface> {
  const db = getFirestore(firebaseApp);
  const docRef = doc(db, COLLECTION_NAME, userId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() } as unknown as UserInterface;
}
