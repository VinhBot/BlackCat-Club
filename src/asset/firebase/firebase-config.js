import { getAuth, onAuthStateChanged, updatePassword, updateProfile, signOut, /*onAuthStateChanged,*/ signInWithEmailAndPassword, createUserWithEmailAndPassword,  } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, arrayRemove, arrayUnion, setDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { initializeApp } from "firebase/app";
// Cấu hình Firebase của ứng dụng web của bạn
// Khởi tạo firebase
const app = initializeApp({
  apiKey: "AIzaSyC7lK6IJGkn1NmqQbs9TUiH6EWzxuFQd-k",
  authDomain: "blackcat-club.firebaseapp.com",
  projectId: "blackcat-club",
  storageBucket: "gs://blackcat-club.appspot.com/",
  messagingSenderId: "1064336897305",
  appId: "1:1064336897305:web:6859e3ba3ed61208ac4188"
});
const database = getFirestore(app);
const auth = getAuth(app);

export {
  database, auth,
  //============= firebase/auth =======================
  onAuthStateChanged, updatePassword, updateProfile, signOut, /*onAuthStateChanged,*/ signInWithEmailAndPassword, createUserWithEmailAndPassword,
  //============= firebase/firestore ==================
  doc, getDoc, updateDoc, arrayRemove, arrayUnion, setDoc, serverTimestamp,
  //============= firebase/storage ====================
  getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject,
  //============= =======================

}