
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const auth = getAuth();
    const firestore = getFirestore();
    const [currentUser, setCurrentUser] = useState(null);

    const getFormattedDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format today's date as 'YYYY-MM-DD'
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(firestore, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    await setDoc(userDocRef, {
                        uid: user.uid,
                        email: user.email,
                        // Initialize other fields as needed
                    });

                    const today = getFormattedDate();
                    const dateDocRef = doc(collection(userDocRef, 'dates'), today);
                    await setDoc(dateDocRef, {
                        meals: {
                            Breakfast: [],
                            Lunch: [],
                            Dinner: [],
                            Snacks: []
                        },
                        exercises: [] // Initialize an array for exercises
                    });
                }

                setCurrentUser({...user,
                
                }); // This now includes any data loaded from Firestore and can add additional properties
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth, firestore]);

    return ( 
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
        );
};

export default AuthProvider;
