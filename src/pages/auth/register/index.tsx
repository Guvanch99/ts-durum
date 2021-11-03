import {useState, useMemo, ChangeEvent, SyntheticEvent} from 'react'
import {useDispatch} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import {useTranslation} from 'react-i18next'

import {ArticleName, Input, TwoFactorAuth} from '../../../components'

import {twoFactorAuth} from '../../../redux/auth/actionCreator'

import {useAppSelector} from "../../../hooks/useAppSelector";

import {IUserFullInfo} from "../../../models/interfaces/redux/auth";

import {EMAIL_VALIDATION} from '../../../constants/regexes.constants'

import {FOUR, SIX} from "../../../constants/variables.constants";

import '../index.scss'

const Register = () => {
  const [userCredentials, setUserCredentials] = useState<Pick<IUserFullInfo, 'id' | 'userName' | 'email' | 'password'>>({
    id: uuidv4(),
    userName: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Pick<IUserFullInfo, 'userName' | 'email' | 'password'>>({
    userName: '',
    email: '',
    password: ''
  })
  const {userExist, isTwoFactorAuth} = useAppSelector(state => state.auth)
  const {t} = useTranslation('translation')
  const dispatch = useDispatch()

  const {userName, email, password} = userCredentials

  const isButtonDisabled =
    !userName ||
    !email ||
    !password ||
    errors.userName ||
    errors.email ||
    errors.password

  const userNameValidation = () => {
    userName.length <= FOUR &&
    setErrors({
      ...errors,
      userName: 'userNameError'
    })
  }
  const emailValidation = () => {
    !EMAIL_VALIDATION.test(email) &&
    setErrors({
      ...errors,
      email: 'emailError'
    })
  }
  const passwordValidation = () => {
    password.length <= SIX &&
    setErrors({
      ...errors,
      password: 'passwordError'
    })
  }
  /* eslint-disable */
  const CREDENTIALS_DATA = useMemo(
    () => [
      {
        name: 'userName',
        value: userName,
        label: 'registration.labelUser',
        error: errors.userName,
        type: 'text',
        functionError: userNameValidation
      },
      {
        name: 'email',
        value: email,
        label: 'registration.email',
        error: errors.email,
        type: 'email',
        functionError: emailValidation
      },
      {
        name: 'password',
        value: password,
        label: 'registration.password',
        error: errors.password,
        type: 'password',
        functionError: passwordValidation
      }
    ],
    [userName, email, password, errors.userName, errors.email, errors.password]
  )

  const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
    setErrors({...errors, [name]: ''})
    setUserCredentials({...userCredentials, [name]: value})
  }

  const register = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(twoFactorAuth(userCredentials))
  }

  return (
    <>
      {isTwoFactorAuth ? (
        <TwoFactorAuth userCredentials={userCredentials}/>
      ) : (
        <div className="auth">
          <ArticleName name={t('articleNames.signUp')}/>
          {userExist ? (
            <h1 className="auth__error">{t('registration.registered')}</h1>
          ) : null}
          <form className="form">
            {CREDENTIALS_DATA.map(
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
              onClick={register}
              className="form__button"
              disabled={!!isButtonDisabled}
            >
              {t('registration.button')}
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Register
