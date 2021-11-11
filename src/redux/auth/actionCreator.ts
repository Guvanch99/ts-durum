import axios from "axios";
import {doc, setDoc, getDoc, updateDoc} from 'firebase/firestore'
import emailjs from 'emailjs-com'

import {
  SET_USER,
  LOGIN_USER,
  USER_NOT_FOUND,
  LOGOUT,
  USER_EXIST,
  MODAL_ERROR_TOGGLE,
  TWO_FACTOR_AUTH_TOGGLE,
  GET_GENERATED_PASSWORD,
  TWO_FACTOR_AUTH_ERROR,
  SET_UPDATED_USER
} from './type'

import {
  updateRestrictedPromoCodes,
  updateGift,
  countTotal
} from '../cart/actionCreators'

import {generatePassword} from '../../utils'

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

import {auth, db} from "../../core/firebase-config";

import {
  IGetGeneratedPassword, ILoginUser,
  ILogout,
  IModalErrorToggle, ISetUpdatedUser, ISetUser,
  ITwoFactorAuth,
  ITwoFactorAuthError, IUser, IUserExist, IUserFullInfo,
  IUserNotFound
} from "../../models/interfaces/redux/auth";

import {ThunkPromise} from "../../models/types/thunk";

import {
  ROUTER_HOME,
  ROUTER_LOGIN,
  ROUTER_SIGN_UP
} from '../../constants/routers.constants'

import {USER_CHECKER_API} from "../../constants/api.constants";
import {accessToken} from "mapbox-gl";

emailjs.init(process.env.REACT_APP_EMAILJS_USER as string)

export const signUp = (payload: Partial<IUserFullInfo>): ISetUser => ({
  type: SET_USER,
  payload
})
export const login = (payload: any): ILoginUser => ({
  type: LOGIN_USER,
  payload
})
export const isUserExist = (): IUserExist => ({
  type: USER_EXIST
})

export const logOut = (): ILogout => ({
  type: LOGOUT
})

export const generatedPasswordUser = (payload: number): IGetGeneratedPassword => ({
  type: GET_GENERATED_PASSWORD,
  payload
})

export const modalPromoErrorToggle = (): IModalErrorToggle => ({type: MODAL_ERROR_TOGGLE})

export const userNotFound = (): IUserNotFound => ({type: USER_NOT_FOUND})

export const twoFactorAuthToggle = (): ITwoFactorAuth => ({type: TWO_FACTOR_AUTH_TOGGLE})

export const twoFactorAuthError = (): ITwoFactorAuthError => ({type: TWO_FACTOR_AUTH_ERROR})

export const updateUser = (payload: any): ISetUpdatedUser => ({
  type: SET_UPDATED_USER,
  payload
})

export const createUser = (user: IUser, location: any, history: any):
  ThunkPromise => async (
  dispatch,
  getState
) => {
  const {
    cart: {restrictedPromoCodes}
  } = getState()
  const {email, password} = user
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    let accessToken = await cred.user.getIdToken()
    const {data: {msg}} = await axios.post<any>(`${USER_CHECKER_API}/tokenVerify`, {accessToken})
    if (msg) {
      const docRef = doc(db, 'users', cred.user.uid)
      const data = {
        id: cred.user.uid,
        email,
        restrictedPromoCodes,
        bonus: 0
      }
      await setDoc(docRef, data)
      dispatch(signUp(data))
      dispatch(updateRestrictedPromoCodes(data.restrictedPromoCodes))
    }
  } catch
    (e: any) {
    console.log(e.message)
  }

  location.state && location.state === ROUTER_LOGIN
    ? history.push(ROUTER_HOME)
    : history.goBack()
}

export const loginUser = (user: IUser, location: any, history: any):
  ThunkPromise => async (
  dispatch,
  getState
) => {
  const {email, password} = user
  const {
    cart: {gift, restrictedPromoCodes: promoCodes}
  } = getState()
  try {
    const {user} = await signInWithEmailAndPassword(auth, email, password)
    let accessToken = await user.getIdToken()
    const {data: {msg}} = await axios.post<any>(`${USER_CHECKER_API}/tokenVerify`, {accessToken})
    if (msg) {
      let loginUser: any = {}
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        loginUser = docSnap.data()
        let intersectionPromoCode = promoCodes.filter(element => loginUser.restrictedPromoCodes.includes(element))
        let updatedGift = loginUser.restrictedPromoCodes.includes(gift?.promoCode)
        const uniquePromoCodes = [...new Set([...loginUser.restrictedPromoCodes, ...promoCodes])]
        const docRef = doc(db, 'users', loginUser.id)
        await updateDoc(docRef, {
          restrictedPromoCodes: uniquePromoCodes
        });
        loginUser = {
          ...loginUser,
          restrictedPromoCodes: uniquePromoCodes,
          bonus: +loginUser.bonus
        }
        ;(!updatedGift && gift) && dispatch(updateGift(gift))
        dispatch(countTotal())
        intersectionPromoCode.length && dispatch(modalPromoErrorToggle())
        dispatch(login(loginUser))
        dispatch(updateRestrictedPromoCodes(loginUser.restrictedPromoCodes))
        if (!intersectionPromoCode.length) {
          location.state && location.state === ROUTER_SIGN_UP
            ? history.push(ROUTER_HOME)
            : history.goBack()
        }
      } else {
        console.log("No such document!");
      }
    }
  } catch (e) {
    dispatch(userNotFound())
  }
}

export const twoFactorAuth = (user: IUser): ThunkPromise => async (dispatch) => {
  const {email} = user
  try {
    const {data: {msg}} = await axios.post<any>(`${USER_CHECKER_API}/email-checker`, {email})
    if (msg) {
      dispatch(isUserExist())
    } else {
      const generatedPassword = generatePassword()
      dispatch(generatedPasswordUser(generatedPassword))
      console.log("email", email)
      emailjs
        .send(process.env.REACT_APP_EMAILJS_SERVICE_ID as string, process.env.REACT_APP_EMAILJS_TEMPLATE_ID as string, {
          user: "Dear User",
          userEmail: email,
          passwordConfirm: generatedPassword
        })
        .then(data => console.log('data', data))
        .catch(error => console.log('error', error))
      dispatch(twoFactorAuthToggle())
    }
  } catch (error: any) {
    console.log(error.message)
  }

}



