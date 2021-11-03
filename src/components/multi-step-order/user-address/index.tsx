import {ChangeEvent, FC, SyntheticEvent, useMemo} from 'react'
import {useTranslation} from 'react-i18next'

import {Input} from '../../index'

import {IUserInfo} from "../../../models/interfaces/orders";

import '../index.scss'

interface IUserAddressProps {
  nextStep: () => void,
  prevStep: () => void,
  handleChange: ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => void,
  storeyValidation: () => void,
  streetValidation: () => void,
  houseValidation: () => void,
  entranceValidation: () => void,
  values: IUserInfo
  errors: Omit<IUserInfo, 'payment'>
}

const UserAddress: FC<IUserAddressProps> = ({
                                              nextStep,
                                              prevStep,
                                              handleChange,
                                              storeyValidation,
                                              streetValidation,
                                              houseValidation,
                                              entranceValidation,
                                              values,
                                              errors
                                            }) => {
  const {t} = useTranslation('translation')

  const {street, house, entrance, storey} = values

  const userAddress = useMemo(() => ([
      {
        name: 'street',
        value: street,
        label: 'orderForm.addressInfo.street',
        error: errors.street,
        type: 'text',
        functionError: streetValidation
      },
      {
        name: 'house',
        value: house,
        label: 'orderForm.addressInfo.house',
        error: errors.house,
        type: 'text',
        functionError: houseValidation
      },
      {
        name: 'entrance',
        value: entrance,
        label: 'orderForm.addressInfo.entrance',
        error: errors.entrance,
        type: 'text',
        functionError: entranceValidation
      },
      {
        name: 'storey',
        value: storey,
        label: 'orderForm.addressInfo.storey',
        error: errors.storey,
        type: 'text',
        functionError: storeyValidation
      }
    ]),
    [
      street,
      house,
      entrance,
      storey,
      errors.street,
      errors.house,
      errors.entrance,
      errors.storey
    ]
  )

  const isButtonDisabled =
    !street ||
    !house ||
    !entrance ||
    !storey ||
    errors.street ||
    errors.house ||
    errors.entrance ||
    errors.storey

  const onPrevHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    prevStep()
  }

  const onNextHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <div className='order-container'>
      <h1 className='order-form__text'>{t('orderForm.address')}</h1>
      <form className='order-form'>
        {userAddress.map(
          ({name, value, label, error, type, functionError}, index) => (
            <Input
              key={index}
              name={name}
              value={value}
              label={t(label)}
              error={t(error)}
              required={true}
              type={type}
              onChange={handleChange}
              handleBlur={functionError}
            />
          )
        )}
        <div className='button-container'>
          <button className='order-form__button' onClick={onPrevHandler}>
            {t('back')}
          </button>
          <button className='order-form__button' onClick={onNextHandler} disabled={!!isButtonDisabled}>
            {t('confirm')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserAddress
