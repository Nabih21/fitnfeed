import { initializeApp } from 'firebase/app';
import {
    initializeAuth,
    getReactNativePersistence, onAuthStateChanged
  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCtEpcmngUNkFurDRi7zmpDq-Gaxb0AVUc",
  authDomain: "fitnfeed-c30ba.firebaseapp.com",
  databaseURL: "https://fitnfeed-c30ba-default-rtdb.firebaseio.com",
  projectId: "fitnfeed-c30ba",
  storageBucket: "fitnfeed-c30ba.appspot.com",
  messagingSenderId: "780871217681",
  appId: "1:780871217681:ios:c3d9160a25d63b72ccb7b0"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged in user:", user);
    } else {
      console.log("No user logged in");
    }
  });

const firestore = getFirestore(app);

export { firestore };
export { auth };

