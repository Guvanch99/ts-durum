import {ChangeEvent, FC, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'

import {CartTable, Payment, PageLink, CartGift} from '..'

import {clearCart} from '../../redux/cart/actionCreators'

import {useAppSelector} from "../../hooks/useAppSelector";

import {useDebounced} from '../../hooks/useDebounced'

import {ROUTER_DURUM} from '../../constants/routers.constants'

import './index.scss'

const CartContent: FC = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation('translation')
  const {cart: {gift}, auth: {user}} = useAppSelector(state => state)
  const [bonusCount, setBonusCount] = useState<string | number>('')
  const bonus: string | number = useDebounced(bonusCount)

  const handleChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(value)))
      setBonusCount(value)
  }

  const clearCartHandler = () => dispatch(clearCart())

  return (
    <section className='cart-content'>
      <CartTable/>
      <hr/>
      {gift ? <CartGift gift={gift}/> : null}

      <article className='cart-content__links'>
        <PageLink
          direction={ROUTER_DURUM}
          name={t('pageLink.continueShopping')}
        />
        {user ? (
          <article className='cart-content__bonus'>
            <h1>{t('useBonusText')}</h1>
            <input maxLength={4} max={9999} className='cart-content__input' type='num' value={bonusCount}
                   onChange={handleChange} placeholder={t('bonusPlaceholder')}/>
          </article>
        ) : null}
        <button
          onClick={clearCartHandler}
          className='cart-content__buttonClear'>
          {t('clear')}
        </button>
      </article>
      <Payment bonus={bonus}/>
    </section>
  )
}

export default CartContent
