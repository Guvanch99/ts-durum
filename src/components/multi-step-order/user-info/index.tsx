import {ChangeEvent, FC, SyntheticEvent, useMemo} from 'react'
import {useTranslation} from 'react-i18next'

import {Input} from '../..'

import {IUserInfo} from "../../../models/interfaces/orders";

import '../index.scss'


interface IUserInfoProps {
  nextStep: () => void
  handleChange: ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => void,
  phoneValidation: () => void
  userNameValidation: () => void
  values: IUserInfo
  errors: Partial<IUserInfo>
}

const UserInfo: FC<IUserInfoProps> = ({
                                        nextStep,
                                        handleChange,
                                        phoneValidation,
                                        userNameValidation,
                                        errors,
                                        values
                                      }) => {
  const {t} = useTranslation('translation')
  const {userName, email, phone} = values

  const userInfo = useMemo(() => ([
    {
      name: 'email',
      value: email,
      label: 'orderForm.mainInfo.email',
      type: 'email',
      disabled: true
    },
    {
      name: 'userName',
      value: userName,
      label: 'orderForm.mainInfo.user',
      type: 'text',
      error: errors.userName,
      functionError: userNameValidation
    },
    {
      name: 'phone',
      value: phone,
      label: 'orderForm.mainInfo.phone',
      error: errors.phone,
      type: 'text',
      functionError: phoneValidation
    }
  ]), [
    userName,
    email,
    phone,
    errors.userName,
    errors.email,
    errors.phone
  ])

  const isButtonDisabled =
    !userName ||
    !email ||
    !phone ||
    errors.userName ||
    errors.email ||
    errors.phone

  const onNextHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <section className='order-container'>
      <h1 className='order-form__text'>{t('orderForm.main')}</h1>
      <form className='order-form'>
        {
          userInfo.map(({
                          name,
                          value,
                          label,
                          error,
                          type,
                          functionError,
                          disabled
                        },
                        idx) => (
            <Input
              key={idx}
              name={name}
              value={value}
              label={t(label)}
              error={error && t(error)}
              type={type}
              required={true}
              onChange={handleChange}
              handleBlur={functionError}
              disabled={disabled}
            />
          ))
        }
        <button className='order-form__button' onClick={onNextHandler} disabled={!!isButtonDisabled}>
          {t('next')}
        </button>
      </form>
    </section>
  )
}

export default UserInfo
