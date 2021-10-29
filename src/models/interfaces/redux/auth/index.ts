import {
    GET_GENERATED_PASSWORD,
    LOGIN_USER,
    LOGOUT,
    MODAL_ERROR_TOGGLE, SET_UPDATED_USER,
    SET_USER, TWO_FACTOR_AUTH_ERROR, TWO_FACTOR_AUTH_TOGGLE,
    USER_EXIST,
    USER_NOT_FOUND
} from "../../../../redux/auth/type";

export interface IUserFullInfo {
    id: string
    userName: string
    email: string
    password: string
    restrictedPromoCodes: string[]
    bonus: number
}

export interface ISetUser {
    type: typeof SET_USER
    payload: Partial<IUserFullInfo>
}

export interface IUserExist {
    type: typeof USER_EXIST
}

export interface IUserNotFound {
    type: typeof USER_NOT_FOUND
}

export interface ILoginUser {
    type: typeof LOGIN_USER
    payload: Pick<IUserFullInfo, 'userName' | 'password'>
}

export interface ILogout {
    type: typeof LOGOUT
}

export interface IModalErrorToggle {
    type: typeof MODAL_ERROR_TOGGLE
}

export interface ITwoFactorAuth {
    type: typeof TWO_FACTOR_AUTH_TOGGLE
}

export interface ITwoFactorAuthError {
    type: typeof TWO_FACTOR_AUTH_ERROR
}

export interface IGetGeneratedPassword {
    type: typeof GET_GENERATED_PASSWORD
    payload: number
}

export interface ISetUpdatedUser {
    type: typeof SET_UPDATED_USER
    payload: IUserFullInfo
}

export interface IInitialState {
    user: null | IUserFullInfo
    userExist: boolean
    userNotFound: boolean
    isModalPromoError: boolean
    isTwoFactorAuth: boolean
    generatedPassword: null | number
    twoFactorAuthInvalid: boolean
}