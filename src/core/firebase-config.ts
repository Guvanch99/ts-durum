import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore, collection, query, orderBy, startAfter, limit, getDocs,doc,getDoc } from 'firebase/firestore'

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

export const db = getFirestore(app);

export const getMenu=async()=>{
  const first = query(collection(db, "all-products"), limit(4));
  const documentSnapshots = await getDocs(first);
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

  console.log(documentSnapshots,documentSnapshots)
  const next = query(collection(db, "all-products"),
    startAfter(lastVisible),
    limit(4));

}

/*const next = query(collection(db, "cities"),
  orderBy("population"),
  startAfter(lastVisible),
  limit(25));*/
// export const getDataFirebase = async () => {
//   const docRef = doc(db, "data", [FEATURED_PRODUCTS,'Gallery']);
//   const docSnap = await getDoc(docRef)
//   return docSnap.data()
// }


