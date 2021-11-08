import emailjs from 'emailjs-com'

import {DB} from '../../core/axios'

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
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../core/firebase-config";


emailjs.init('user_wFdsX3tQvzTML78kqhCfD')

export const signUp = (payload: Partial<IUserFullInfo>): ISetUser => ({
  type: SET_USER,
  payload
})
export const login = (payload: Pick<IUserFullInfo, 'userName' | 'password'>): ILoginUser => ({
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

export const updateUser = (payload: IUserFullInfo): ISetUpdatedUser => ({
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
 // const {data} = await DB.post<IUserFullInfo>('/users', {...user, restrictedPromoCodes, bonus: 0})

  //dispatch(signUp(data))
  //dispatch(updateRestrictedPromoCodes(data.restrictedPromoCodes))

  location.state && location.state === ROUTER_LOGIN
    ? history.push(ROUTER_HOME)
    : history.goBack()
}

/*export const loginUser = (email: string, password: string, location: any, history: any):
  ThunkPromise => async (
  dispatch,
  getState
) => {
  const {data: users} = await DB.get<IUserFullInfo[]>(
    `/users?userName=${userName}&password=${password}`
  )
  if (users.length) {
    const {
      cart: {gift, restrictedPromoCodes: promoCodes}
    } = getState()

    let intersectionPromoCode = promoCodes.filter(element =>
      users[0].restrictedPromoCodes.includes(element)
    )

    const id = users[0].id
    const restrictedPromoCodes = [...users[0].restrictedPromoCodes, ...promoCodes]

    const uniquePromoCodes = [...new Set(restrictedPromoCodes)]

    const {data} = await DB.patch<IUserFullInfo>(`/users/${id}`, {
      restrictedPromoCodes: uniquePromoCodes
    })

    let updatedGift = gift && !users[0].restrictedPromoCodes.includes(gift.promoCode)

    let modifiedUserData = {
        ...data,
        bonus: +data.bonus
      }

    ;(!updatedGift && gift) && dispatch(updateGift(gift))
    dispatch(countTotal())
    intersectionPromoCode.length && dispatch(modalPromoErrorToggle())
    dispatch(login(modifiedUserData))
    dispatch(updateRestrictedPromoCodes(data.restrictedPromoCodes))

    if (!intersectionPromoCode.length) {
      location.state && location.state === ROUTER_SIGN_UP
        ? history.push(ROUTER_HOME)
        : history.goBack()
    }
  } else
    dispatch(userNotFound())
}*/

export const twoFactorAuth = (user: IUser): ThunkPromise => async (dispatch) => {
 const {email,password}=user
  try {
    const searchedUser = await createUserWithEmailAndPassword(auth,email,password)
    console.log("searchedUser" , searchedUser)
    if (false) {
      dispatch(isUserExist())
    } else {
      const generatedPassword = generatePassword()
      dispatch(generatedPasswordUser(generatedPassword))
      emailjs
        .send(process.env.REACT_APP_EMAILJS_SERVICE_ID as string, process.env.REACT_APP_EMAILJS_TEMPLATE_ID as string, {
          user: "Dear User",
          userEmail: user.email,
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



