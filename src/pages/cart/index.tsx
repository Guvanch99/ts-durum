import {useTranslation} from 'react-i18next'

import {CartContent, PageLink} from '../../components'

import {useAppSelector} from "../../hooks/useAppSelector";

import {ROUTER_DURUM} from '../../constants/routers.constants'

import './index.scss'

const Cart = () => {
  const {cart} = useAppSelector(state => state.cart)
  const {t} = useTranslation('translation')

  return (
    <div className="cart">
      {!cart.length ? (
        <PageLink direction={ROUTER_DURUM} name={t('pageLink.addBasket')}/>
      ) : (
        <CartContent/>
      )}
    </div>
  )
}

export default Cart
