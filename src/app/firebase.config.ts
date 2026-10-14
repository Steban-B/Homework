import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB97HTyqnq41xdP9KRd_HLqLPbBvv-c55U',
  authDomain: 'parcial-02-carpetas.firebaseapp.com',
  projectId: 'parcial-02-carpetas',
  storageBucket: 'parcial-02-carpetas.firebasestorage.app',
  messagingSenderId: '941351586795',
  appId: '1:941351586795:web:9fe631422c0e199a24a7ae',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);