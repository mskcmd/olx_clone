import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAH-co7MaS-_mc8q9fY9bAQtHKoPnD3n2I",
  authDomain: "olx-clone-ee144.firebaseapp.com",
  projectId: "olx-clone-ee144",
  storageBucket: "olx-clone-ee144.appspot.com",
  messagingSenderId: "269125310116",
  appId: "1:269125310116:web:8b305c22d5c2c5af4b7831",
  measurementId: "G-PKCSGG91Q6"
};
const Firebase = initializeApp(firebaseConfig);

const Firestore = getFirestore(Firebase)
const storage = getStorage(Firebase)
const auth = getAuth(Firebase);


export { auth, Firestore, storage };