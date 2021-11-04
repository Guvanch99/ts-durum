import {FC} from "react";
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'

import {PageLink} from '..'

import {usedBonus} from '../../redux/cart/actionCreators'

import {useAppSelector} from "../../hooks/useAppSelector";

import {ROUTER_CHECKOUT, ROUTER_SIGN_UP} from '../../constants/routers.constants'

import './index.scss'

const Payment: FC<{ bonus: number | string }> = ({bonus}) => {
  const dispatch = useDispatch()
  const {t} = useTranslation('translation')
  const {
    cart: {totalAmount},
    auth: {user}
  } = useAppSelector(state => state)

  let totalCopy = totalAmount

  const countTotalAmount = () => {
    if (user)
      if ((bonus <= user.bonus) && bonus !== '' && bonus !== 0)
        dispatch(usedBonus(Number(bonus)))
  }

  return (
    <section className='payment'>
      <h2 className='payment__subtotal'>
        {t('payment.subTotal', {totalAmount})}
      </h2>
      <p className='payment__shipping'> {t('payment.shipping')}</p>
      <hr/>
      <hgroup className='bonus'>
        <h2 className='bonus__text'>{t('bonusText')}</h2>
        <hr className='bonus__dash'/>
        <h2 className='bonus__count'>{bonus}</h2>
      </hgroup>
      <h1 className='payment__total'> {t('payment.orderTotal', {total: totalCopy})}</h1>
      {
        user ? (
          <h1 className='payment__total-bonus'>
            {
              (bonus > user.bonus) ?
                t('bonusError') :
                (bonus <= user.bonus) ?
                  t('payment.bonusTotal', {bonusTotal: totalAmount - Number(bonus)}) : null
            }
          </h1>
        ) : null
      }
      <article className='payment__checkout'>
        {user ? (
          <PageLink
            eventHandler={countTotalAmount}
            name={t('pageLink.goToCheckout')}
            direction={ROUTER_CHECKOUT}
          />
        ) : (
          <PageLink name={t('pageLink.signUp')} direction={ROUTER_SIGN_UP}/>
        )}
      </article>
    </section>

  )
}

export default Payment
