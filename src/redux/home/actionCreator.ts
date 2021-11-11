import {GET_BASE_DATA} from './type'

import {db} from "../../core/firebase-config";

import {collection, getDocs} from "firebase/firestore";


interface ISetFeaturedProducts {
  type: typeof GET_BASE_DATA
  payload: any
}

export const setFeaturedProducts = (payload: any): ISetFeaturedProducts => ({
  type: GET_BASE_DATA,
  payload
})


export const getBaseDataFirebase = async () => {
  let data :any= []
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
      if (data)
        data.push(doc.data())
    }
  )
  return data
}

