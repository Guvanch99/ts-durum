import {FC, memo} from 'react'
import {useTranslation} from 'react-i18next'

import {IGift} from "../../models/interfaces/redux/cart";

import './index.scss'

const CartGift: FC<{ gift: IGift }> = ({gift}) => {
  const {t} = useTranslation('translation')
  const {src, name, amount} = gift

  return (
    <>
      <h1 className="cart__label">{t('cartGift.label')}</h1>
      <section className="cart-gift">
        <article className="cart-gift__container">
          <img src={src} alt={name} className="cart-gift__image"/>
          <h1 className="cart-gift__name">
            {t('cartGift.yourGift')}
            <span className="cart-gift__name-color">{t(name)}</span>
          </h1>
          <h1 className="cart-gift__amount">
            {t('cartGift.amount')}
            {'  '}
            <span className="cart-gift__amount-color">{t(amount.toString())}</span>
          </h1>
        </article>
      </section>
    </>
  )
}

export default memo(CartGift)
