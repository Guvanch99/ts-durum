import {useState, useMemo, SyntheticEvent, ChangeEvent, FC} from 'react'
import {useDispatch} from 'react-redux'
import {RouteComponentProps, useHistory, useLocation, NavLink} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {
  ArticleName,
  Input,
  ModalPromoError,
  Portal
} from '../../../components'

import {loginUser} from '../../../redux/auth/actionCreator'

import {useAppSelector} from "../../../hooks/useAppSelector";

import {IUser} from "../../../models/interfaces/redux/auth";

import {ROUTER_PASSWORD_RESET} from "../../../constants/routers.constants";
import {EMAIL_VALIDATION} from "../../../constants/regexes.constants";
import {SIX} from "../../../constants/variables.constants";

import '../index.scss'

const Login: FC<RouteComponentProps> = () => {
  const [userLogin, setUserLogin] = useState<IUser>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<IUser>({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const {t} = useTranslation('translation')
  const {state} = useLocation<{ state: string }>()
  const history = useHistory()
  const {isModalPromoError, userNotFound} = useAppSelector(state => state.auth)

  let {email, password} = userLogin

  const isButtonDisabled =
    !email || !password || errors.email || errors.password

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
  const LOGIN_DATA = useMemo(
    () => [
      {
        name: 'email',
        value: email,
        label: 'login.labelUser',
        error: errors.email,
        type: 'text',
        functionError: emailValidation
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
    [email, password, errors.email, errors.password]
  )

  const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
    setErrors({...errors, [name]: ''})
    setUserLogin({...userLogin, [name]: value})
  }

  const login = async (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(loginUser(userLogin, state, history))
  }

  return (
    <section className="auth">
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
          <NavLink className='form__password-reset' to={ROUTER_PASSWORD_RESET}>{t('passwordForgot')}</NavLink>
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
    </section>
  )
}

export default Login
