import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const PROJECTID = import.meta.env.PROJECTID;
const FIREBASE_API_KEY = import.meta.env.FIREBASE_API_KEY;
const AUTHDOMAIN = import.meta.env.FIREBASE_AUTH_DOMAIN;
const STORAGEBUCKET = import.meta.env.STORAGE_BUCKET;
const MESSAGINGID = import.meta.env.MESSAGING_SENDER_ID;
const APPID = import.meta.env.FIREBASE_APP_ID;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGID,
    appId: APPID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);