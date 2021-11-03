import {ChangeEvent, FC, SyntheticEvent} from "react";
import {useTranslation} from 'react-i18next'

import '../index.scss'

interface IUserPaymentProps {
  prevStep: () => void
  handlePayment: (e: ChangeEvent<HTMLInputElement>) => void
  orderMenu: (e: SyntheticEvent) => void
}

const UserPayment: FC<IUserPaymentProps> = ({prevStep, handlePayment, orderMenu}) => {
  const {t} = useTranslation('translation')

  const payment = [
    {
      label: 'orderForm.paymentInfo.paymentCash',
      name: 'payment',
      value: 'cash'
    },
    {
      label: 'orderForm.paymentInfo.paymentCard',
      name: 'payment',
      value: 'card'
    }
  ]

  const onPrevHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    prevStep()
  }

  return (
    <div className='user-payment'>
      <h1 className='order-form__text'>{t('orderForm.payment')}</h1>
      {payment.map(({label, name, value}, index) => (
        <div key={index} className='order-form__group'>
          <label className='order-form__label'>{t(label)}</label>
          <input
            onChange={handlePayment}
            value={value}
            type='radio'
            name={name}
            id={value}
            defaultChecked={index === 0}
          />
        </div>
      ))}
      <div className='button-ctn'>
        <button className='order-form__button small' onClick={onPrevHandler}>
          {t('back')}
        </button>
        <button className='order-form__button small' onClick={orderMenu}>
          {t('orderForm.orderButton')}
        </button>
      </div>
    </div>
  )
}

export default UserPayment
