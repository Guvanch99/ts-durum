import {useState, useMemo, ChangeEvent, SyntheticEvent} from 'react'
import {useDispatch} from 'react-redux'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useTranslation} from 'react-i18next'

import {ArticleName, Input, TwoFactorAuth} from '../../../components'

import {twoFactorAuth} from '../../../redux/auth/actionCreator'

import {useAppSelector} from "../../../hooks/useAppSelector";

import {auth} from "../../../core/firebase-config";

import {IUser} from "../../../models/interfaces/redux/auth";

import {EMAIL_VALIDATION} from '../../../constants/regexes.constants'

import {SIX} from "../../../constants/variables.constants";

import '../index.scss'

const Register = () => {
  const [userCredentials, setUserCredentials] = useState<IUser>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<IUser>({
    email: '',
    password: ''
  })
  const {userExist, isTwoFactorAuth} = useAppSelector(state => state.auth)
  const {t} = useTranslation('translation')
  const dispatch = useDispatch()

  const {email, password} = userCredentials

  const isButtonDisabled =
    !email ||
    !password ||
    errors.email ||
    errors.password


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
    [email, password, errors.email, errors.password]
  )

  const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
    setErrors({...errors, [name]: ''})
    setUserCredentials({...userCredentials, [name]: value})
  }

  const register = async (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(twoFactorAuth(userCredentials))
  }

  return (
    <>
      {isTwoFactorAuth ? (
        <TwoFactorAuth userCredentials={userCredentials}/>
      ) : (
        <section className="auth">
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
        </section>
      )}
    </>
  )
}

export default Register
