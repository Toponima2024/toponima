import  { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from  'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAmLWBUgbercbejfAQ5rePXxHUPQZRTMA",
  authDomain: "toponima2024.firebaseapp.com",
  projectId: "toponima2024",
  storageBucket: "toponima2024.appspot.com",
  messagingSenderId: "510118824472",
  appId: "1:510118824472:web:4e967513d98cf71d88916d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

export const storage = getStorage(app);



// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';




// export const app = firebase.initializeApp({
//     "projectId": "toponima-b8510",
//     "appId": "1:373472920252:web:e0214e909931676d71c6b9",
//     "storageBucket": "toponima-b8510.appspot.com",
//     "locationId": "europe-west",
//     "apiKey": "AIzaSyDMWdt-sagvXxhImZS08U36esN9Kbf7jN4",
//     "authDomain": "toponima-b8510.firebaseapp.com",
//     "messagingSenderId": "373472920252",
//     "measurementId": "G-68E0L3HWLM"
//   });