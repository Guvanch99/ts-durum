import {DB} from '../../core/axios'
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

import {
    IGetGeneratedPassword, ILoginUser,
    ILogout,
    IModalErrorToggle, ISetUpdatedUser, ISetUser,
    ITwoFactorAuth,
    ITwoFactorAuthError, IUserExist, IUserFullInfo,
    IUserNotFound
} from "../../models/interfaces/redux/auth";

import {ThunkPromise} from "../../models/types/thunk";

import {
    ROUTER_HOME,
    ROUTER_LOGIN,
    ROUTER_SIGN_UP
} from '../../constants/routers.constants'

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

export const createUser = (user: Pick<IUserFullInfo, "id" | "userName" | "email" | "password">, location: any, history: any):
    ThunkPromise => async (
    dispatch,
    getState
) => {

    const {
        cart: {restrictedPromoCodes}
    } = getState()
    const {data} = await DB.post<IUserFullInfo>('/users', {...user, restrictedPromoCodes, bonus: 0})
    dispatch(signUp(data))
    dispatch(updateRestrictedPromoCodes(data.restrictedPromoCodes))
    console.log("stateCreate", location)
    location.state !== null && location.state === ROUTER_LOGIN
        ? history.push(ROUTER_HOME)
        : history.goBack()


}

export const loginUser = (userName: string, password: string, location: any, history: any):
    ThunkPromise => async (
    dispatch,
    getState
) => {
    const {data: users} = await DB.get<IUserFullInfo[]>(
        `/users?userName=${userName}&password=${password}`
    )
    console.log("usersLoginuser", users)
    if (users.length > 0) {
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

        let updatedGift = gift !== null && !users[0].restrictedPromoCodes.includes(gift.promoCode)

        let modifiedUserData = {
            ...data,
            bonus: Number(data.bonus)
        }
        if (updatedGift && gift !== null)
            dispatch(updateGift(gift))
        dispatch(countTotal())
        intersectionPromoCode.length > 0 && dispatch(modalPromoErrorToggle())
        dispatch(login(modifiedUserData))
        dispatch(updateRestrictedPromoCodes(data.restrictedPromoCodes))

        if (intersectionPromoCode.length === 0) {
            location.state !== null && location.state === ROUTER_SIGN_UP
                ? history.push(ROUTER_HOME)
                : history.goBack()
        }
    } else
        dispatch(userNotFound())
}

export const twoFactorAuth = (user: Pick<IUserFullInfo, 'userName' | 'email' | 'password'>): ThunkPromise => async (dispatch) => {
    const {data: searchedUser} = await DB.get<IUserFullInfo[]>(
        `/users?userName=${user.userName}&email=${user.email}`
    )
    if (searchedUser.length > 0) {
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

