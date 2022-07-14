import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyChYxg2MeAwupLRt-NbQcgIC7Af6w3iLQE",
    authDomain: "upload-file-1fac0.firebaseapp.com",
    projectId: "upload-file-1fac0",
    storageBucket: "upload-file-1fac0.appspot.com",
    messagingSenderId: "951233824098",
    appId: "1:951233824098:web:f7209e53a825e9c061983b",
    measurementId: "G-CQNMLT1FNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const analytics = getAnalytics(app);

export function signUpFunction(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub;
    }, [])
    return currentUser;
}

export function signOutFunction() {
    return signOut(auth);
}

export function SignInFunction(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

// for storage
export const storage = getStorage(app);