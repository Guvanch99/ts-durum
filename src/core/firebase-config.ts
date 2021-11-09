import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore, doc, getDoc, collection, getDocs} from 'firebase/firestore'
import {FEATURED_PRODUCTS} from "../constants/api.constants";

const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_CONFIG,
  authDomain: "auth-2dacd.firebaseapp.com",
  projectId: "auth-2dacd",
  storageBucket: "auth-2dacd.appspot.com",
  messagingSenderId: "868927923075",
  appId: "1:868927923075:web:68c01e40cf3dbadfeaccb6",
  measurementId: "G-77XRM7CBCL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore();


// export const getDataFirebase = async () => {
//   const docRef = doc(db, "data", [FEATURED_PRODUCTS,'Gallery']);
//   const docSnap = await getDoc(docRef)
//   return docSnap.data()
// }


