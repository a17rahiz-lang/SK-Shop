import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAjAGB7kGGG49yv2gk-JDGlKyrjc08W98M",
  authDomain: "buy-shop-8eb2c.firebaseapp.com",
  databaseURL: "https://buy-shop-8eb2c-default-rtdb.firebaseio.com",
  projectId: "buy-shop-8eb2c",
  storageBucket: "buy-shop-8eb2c.firebasestorage.app",
  messagingSenderId: "389784838153",
  appId: "1:389784838153:web:2cf7c1f0e1bb80a96a18d8",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage }
