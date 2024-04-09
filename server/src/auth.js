// Import the auth module from where you have initialized Firebase
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Function to handle user registration
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered: ", userCredential.user);
    // You might want to return or do something with the user data here
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
    // You might want to return or do something with the user data here
    return userCredential.user;
  } catch (error) {
    console.error("Login error: ", error);
    throw error;  // Rethrow the error if you want to handle it in the calling component
  }
};
