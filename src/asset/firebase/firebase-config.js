import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
export const database = getFirestore(app);
export const auth = getAuth(app);