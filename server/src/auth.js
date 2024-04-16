// Import the auth module from where you have initialized Firebase
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firestore = getFirestore();

// Function to handle user registration
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered: ", userCredential.user);
    // do smthg here

    // const userDocRef = doc(firestore, 'users', userCredential.user.uid);
    // await setDoc(userDocRef, {
    //   uid: userCredential.user.uid,
    //   email: userCredential.user.email,
    // })


    return userCredential.user;
  } catch (error) {
    console.error("Registration error: ", error);
    throw error;  // Rethrow the error if you want to handle it in the calling component
  }
};

// Function to handle user login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in: ", userCredential.user);
    //do smthg here 

    // const userDocRef = doc(firestore, 'users', userCredential.user.uid);
    // const userDocSnap = await getDoc(userDocRef);
    // if (userDocSnap.exists()) {
    //   const userData = userDocSnap.data();
    //   console.log('User data:', userData);

    // } else {
    //   console.log('No such document!');
    // }
    return userCredential.user;
  } catch (error) {
    console.error("Login error: ", error);
    throw error;  // Rethrow the error if you want to handle it in the calling component
  }
};
