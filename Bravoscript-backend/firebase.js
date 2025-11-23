// firebase.js
const admin = require('firebase-admin');
require('dotenv').config();

// 1. Format the private key correctly
// Vercel sometimes reads newlines (\n) as literal characters, so we fix that here.
const privateKey = process.env.FIREBASE_PRIVATE_KEY 
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
    : undefined;

if (!privateKey) {
    console.error("Firebase Private Key is missing in .env");
}

// 2. Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
    }),
});

// 3. Initialize Firestore Database
const db = admin.firestore();

module.exports = db;