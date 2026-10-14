import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCXavO2T9S4uJqFpDJPh--l22r5HkZZzss',
  authDomain: 'challenge-09-tareas.firebaseapp.com',
  projectId: 'challenge-09-tareas',
  storageBucket: 'challenge-09-tareas.firebasestorage.app',
  messagingSenderId: '14528936474',
  appId: '1:14528936474:web:87292e1792b41d626bafa3',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);