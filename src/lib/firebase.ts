import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "artistry-ai-h9ioy",
  "appId": "1:997696835273:web:b165712a660ec65ae28718",
  "storageBucket": "artistry-ai-h9ioy.firebasestorage.app",
  "apiKey": "GEMINI_API_KEY",
  "authDomain": "artistry-ai-h9ioy.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "997696835273"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
