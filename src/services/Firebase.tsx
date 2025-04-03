import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const PROJECTID = import.meta.env.VITE_PROJECT_ID;
const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const AUTHDOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const STORAGEBUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const MESSAGINGID = import.meta.env.VITE_MESSAGING_SENDER_ID;
const APPID = import.meta.env.VITE_FIREBASE_APP_ID;
const MEASUREMENTID = import.meta.env.VITE_MEASUREMENT_ID;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGID,
    appId: APPID,
    measurementId: MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);