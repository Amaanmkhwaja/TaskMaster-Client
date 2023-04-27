// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
// import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyDov0kus1wHG_Vo5Fv2r614RDHskaEtJTY",
  authDomain: "taskmaster-15fac.firebaseapp.com",
  projectId: "taskmaster-15fac",
  storageBucket: "taskmaster-15fac.appspot.com",
  messagingSenderId: "961343730815",
  appId: "1:961343730815:web:e195a613786607bbeabb4a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    return new Promise((resolve, reject) => {
      signInWithPopup(auth, provider)
        .then((result) => {
          resolve(result.user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };