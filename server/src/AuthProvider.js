
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const auth = getAuth();
    const firestore = getFirestore();
    const [currentUser, setCurrentUser] = useState(null);

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
                }

                setCurrentUser(user); // This now includes any data loaded from Firestore
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return ( 
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
        );
};

export default AuthProvider;
