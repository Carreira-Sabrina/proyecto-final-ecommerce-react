
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; // For the Authentication service


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBD0tF_mJor63Q2c-4dUoKJ-0iP0BDNz7I",
    authDomain: "proyecto-final-talento-tech.firebaseapp.com",
    projectId: "proyecto-final-talento-tech",
    storageBucket: "proyecto-final-talento-tech.firebasestorage.app",
    messagingSenderId: "366946356076",
    appId: "1:366946356076:web:57e42c3696155a1c7f0149"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;