
import {useState, useMemo, SyntheticEvent, ChangeEvent, FC} from 'react'
import {useDispatch} from 'react-redux'
import {RouteComponentProps, useHistory, useLocation} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {
    ArticleName,
    Input,
    ModalPromoError,
    Portal
} from '../../../components'

import {useAppSelector} from "../../../hooks/useAppSelector";


import {IUserFullInfo} from "../../../models/interfaces/redux/auth";

import {loginUser} from '../../../redux/auth/actionCreator'

import '../index.scss'

const Login:FC<RouteComponentProps > = () => {
    const [userLogin, setUserLogin] = useState<Pick<IUserFullInfo, 'userName'|'password'>>({
        userName: '',
        password: ''
    })
    const [errors, setErrors] = useState<Pick<IUserFullInfo, 'userName'|'password'>>({
        userName: '',
        password: ''
    })

    const dispatch = useDispatch()
    const {t} = useTranslation('translation')
    const {state} = useLocation<{state:string}>()
    const history=useHistory()

    const {isModalPromoError, userNotFound} = useAppSelector(state => state.auth)
    let {userName, password} = userLogin
console.log("stateLogin",state)
    const isButtonDisabled =
        !userName || !password || errors.userName || errors.password

    const userNameValidation = () => {
        userName.length <= 4 &&
        setErrors({
            ...errors,
            userName: 'userNameError'
        })
    }

    const passwordValidation = () => {
        password.length <= 6 &&
        setErrors({
            ...errors,
            password: 'passwordError'
        })
    }

    /* eslint-disable */
    const LOGIN_DATA = useMemo(
        () => [
            {
                name: 'userName',
                value: userName,
                label: 'login.labelUser',
                error: errors.userName,
                type: 'text',
                functionError: userNameValidation
            },
            {
                name: 'password',
                value: password,
                label: 'login.password',
                error: errors.password,
                type: 'password',
                functionError: passwordValidation
            }
        ],
        [userName, password, errors.userName, errors.password]
    )

    const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
        setErrors({...errors, [name]: ''})
        setUserLogin({...userLogin, [name]: value})
    }

    const login = (e: SyntheticEvent) => {
        e.preventDefault()
        const {userName, password} = userLogin
        let hashPassword = window.btoa(password)

        dispatch(loginUser(userName, hashPassword, state,history))
    }

    return (
        <div className="auth">
            <ArticleName name={t('articleNames.login')}/>
            {userNotFound ? (
                <h1 className="auth__error">{t('login.userNotFound')}</h1>
            ) : null}
            {isModalPromoError ? (
                <Portal nameOfClass="modalPromoError">
                    <ModalPromoError/>
                </Portal>
            ) : (
                <form className="form">
                    {LOGIN_DATA.map(
                        ({name, value, label, error, type, functionError}, index) => (
                            <Input
                                key={index}
                                name={name}
                                value={value}
                                label={t(label)}
                                error={t(error)}
                                type={type}
                                onChange={handleChange}
                                required={true}
                                handleBlur={functionError}
                            />
                        )
                    )}
                    <button
                        type="submit"
                        onClick={login}
                        className="form__button"
                        disabled={!!isButtonDisabled}
                    >
                        {t('login.button')}
                    </button>
                </form>
            )}
        </div>
    )
}

export default Login
