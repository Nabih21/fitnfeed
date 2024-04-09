// src/workoutServices.js
import { firestore } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

/**
 * Adds a new workout to the Firestore database.
 * @param {Object} workoutData - Data for the new workout.
 */
export async function addWorkout(workoutData) {
    try {
        const docRef = await addDoc(collection(firestore, "workouts"), workoutData);
        console.log("Document written with ID: ", docRef.id);  // Successfully added document
        return docRef.id;  // Return the new document's ID
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Could not add the workout: " + e.message);  // Handle errors appropriately
    }
}
