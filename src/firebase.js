// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-nexxt.firebaseapp.com",
  projectId: "insta-nexxt",
  storageBucket: "insta-nexxt.appspot.com",
  messagingSenderId: "431751435205",
  appId: "1:431751435205:web:eff8b216413ac4cbe2f1ac"
};
// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read;
//         allow write: if
//         request.resource.size < 2 * 1024 * 1024 &&
//         request.resource.contentType.matches('image/.*')
        
//       }
//     }
//   }
// Initialize Firebase
export const app = initializeApp(firebaseConfig);