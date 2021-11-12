import {ChangeEvent, FC, SyntheticEvent, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {sendPasswordResetEmail} from 'firebase/auth'
import {useTranslation} from "react-i18next";

import {ArticleName, Input} from "../../../components";

import {auth} from "../../../core/firebase-config";

import {EMAIL_VALIDATION} from "../../../constants/regexes.constants";
import {ROUTER_LOGIN, ROUTER_SIGN_UP} from "../../../constants/routers.constants";

import './index.scss'

interface IEmailErrorState {
  type: string
  notFound: string
}

const PasswordReset: FC = () => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<IEmailErrorState>({
    type: '',
    notFound: ''
  })
  const {t} = useTranslation('translation')
  const history = useHistory()

  const {type, notFound} = emailError

  const handleChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(value)
    if (type || notFound)
      setEmailError({
        type: '',
        notFound: ''
      })
  }

  const emailValidation = () => {
    !EMAIL_VALIDATION.test(userEmail) &&
    setEmailError(
      {...emailError, type: 'email Error'}
    )
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, userEmail)
      history.goBack()
    } catch (e: any) {
      setEmailError({...emailError, notFound: e})
    }
  }

  const isButtonDisabled = !userEmail || type

  return (
    <section className='password-reset'>
      <ArticleName name={t('passwordReset')}/>
      {notFound && <h3 className="password-reset__email-error">{notFound}</h3>}
      <div className='input-group'>
        <Input
          handleBlur={emailValidation}
          onChange={handleChange}
          error={type}
          name='userEmail'
          value={userEmail}
          label="Email"
          type='text'
          required={true}
        />
        <button disabled={!!isButtonDisabled}
                className='password-reset__submit'
                onClick={handleSubmit}
        >
          {t('promoCode.buttonSubmit')}
        </button>
        <NavLink className='password-reset__login' to={ROUTER_LOGIN}>{t('menuAuthCart.login.name')}</NavLink>
      </div>
      <article className='login-group'>
        <h3 className='password-reset__article'>{t('accountNeed')}</h3>
        <NavLink className='password-reset__sign-up' to={ROUTER_SIGN_UP}>{t('menuAuthCart.signUp.name')}</NavLink>
      </article>
    </section>
  )
}

export default PasswordReset