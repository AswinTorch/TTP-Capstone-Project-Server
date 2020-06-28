import * as firebase from "firebase";
import 'firebase/firestore';
import * as dotenv from "dotenv";
// const firebase = require("firebase");
// const { env } = require("process");
// require("dotenv").config();

dotenv.config();
const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
console.log(typeof(FIREBASE_CONFIG));
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

export = db;


