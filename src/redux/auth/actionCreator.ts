//@ts-nocheck
import { DB } from '../../core/axios'
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
  ROUTER_HOME,
  ROUTER_LOGIN,
  ROUTER_SIGN_UP
} from '../../constants/routers'

import {
  updateRestrictedPromoCodes,
  updateGift,
  countTotal
} from '../cart/actionCreators'

import { generatePassword } from '../../utils'

emailjs.init('user_wFdsX3tQvzTML78kqhCfD')

export const signUp = payload => ({
  type: SET_USER,
  payload
})
export const login = payload => ({
  type: LOGIN_USER,
  payload
})
export const isUserExist = () => ({
  type: USER_EXIST
})

export const logOut = () => ({
  type: LOGOUT
})

export const generatedPasswordUser = payload => ({
  type: GET_GENERATED_PASSWORD,
  payload
})

export const modalPromoErrorToggle = () => ({ type: MODAL_ERROR_TOGGLE })

export const userNotFound = () => ({ type: USER_NOT_FOUND })

export const twoFactorAuthToggle = () => ({ type: TWO_FACTOR_AUTH_TOGGLE })

export const twoFactorAuthError = () => ({ type: TWO_FACTOR_AUTH_ERROR })

export const updateUser = (payload) => ({
  type: SET_UPDATED_USER,
  payload
})

export const createUser = (user, location, history) => async (
  dispatch,
  getState
) => {

  const {
    cart: { restrictedPromoCodes }
  } = getState()
  const { data } = await DB.post('/users', { ...user, restrictedPromoCodes, bonus: 0 })
  dispatch(signUp(data))
  dispatch(updateRestrictedPromoCodes(data.restrictedPromoCodes))
  location.state !== null && location.state.from === ROUTER_LOGIN
    ? history.push(ROUTER_HOME)
    : history.goBack()


}

export const loginUser = (userName, password, location, history) => async (
  dispatch,
  getState
) => {
  const { data: users } = await DB(
    `/users?userName=${userName}&password=${password}`
  )
  if (users.length > 0) {
    const {
      cart: { gift, restrictedPromoCodes: promoCodes }
    } = getState()
    let intersectionPromoCode = promoCodes.filter(element =>
      users[0].restrictedPromoCodes.includes(element)
    )

    const id = users[0].id
    const restrictedPromoCodes = [...users[0].restrictedPromoCodes, ...promoCodes]

    const uniquePromoCodes = [...new Set(restrictedPromoCodes)]
    const { data } = await DB.patch(`/users/${id}`, {
      restrictedPromoCodes: uniquePromoCodes
    })

    let updatedGift = gift.filter(
      x => !users[0].restrictedPromoCodes.includes(x.promoCode)
    )

    let modifiedUserData={
      ...data,
      bonus:Number(data.bonus)
    }

    dispatch(updateGift(updatedGift))
    dispatch(countTotal())
    intersectionPromoCode.length > 0 && dispatch(modalPromoErrorToggle())
    dispatch(login(modifiedUserData))
    dispatch(updateRestrictedPromoCodes(data.restrictedPromoCodes))

    if (intersectionPromoCode.length === 0) {
      location.state !== null && location.state.from === ROUTER_SIGN_UP
        ? history.push(ROUTER_HOME)
        : history.goBack()
    }
  } else
    dispatch(userNotFound())
}

export const twoFactorAuth = user => async dispatch => {
  const { data: searchedUser } = await DB(
    `/users?userName=${user.userName}&email=${user.email}`
  )
  if (searchedUser.length>0) {
    dispatch(isUserExist())
  } else {
    const generatedPassword = generatePassword()
    dispatch(generatedPasswordUser(generatedPassword))
    emailjs
      .send('service_yyol79d', 'template_zzv0x6d', {
        user: user.userName,
        userEmail: user.email,
        passwordConfirm: generatedPassword
      })
      .then(data => console.log('data', data))
      .catch(error => console.log('error', error))

    dispatch(twoFactorAuthToggle())
  }
}

