import {FC, memo} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {signOut} from 'firebase/auth'

import {logOut} from '../../redux/auth/actionCreator'

import {useAppSelector} from "../../hooks/useAppSelector";

import {auth} from "../../core/firebase-config";

import {DATA} from '../../data'

import {ROUTER_CART} from '../../constants/routers.constants'
import {ZERO} from '../../constants/variables.constants'

import './index.scss'

const {menuAuthCart} = DATA

const MenuAuthCart: FC<{ sidebarVisibilityToggle?: () => void }> = ({sidebarVisibilityToggle}) => {
  const {
    cart: {totalItems},
    auth: {user}
  } = useAppSelector(state => state)
  const dispatch = useDispatch()
  const location = useLocation()
  const {t} = useTranslation('translation')

  const logout = async () => {
    await signOut(auth)
    dispatch(logOut())
  }

  return (
    <ul className='menu'>
      <li className='menu__list'>
        <NavLink
          onClick={sidebarVisibilityToggle}
          className='menu__list-link'
          to={ROUTER_CART}
        >
          {t('menuAuthCart.cart.name')}
          <i className={`fas fa-cart-plus menu__list-icon`}/>
          <span className='order-count'>{totalItems}</span>
        </NavLink>
      </li>
      {user ? (
        <>
          <button onClick={logout} className='logout'>
            {t('logout')}
          </button>
          <h2 className='bonus'>{t('bonus')} <span className='bonus__count'>  {user.bonus || ZERO}</span></h2>
        </>

      ) : (
        menuAuthCart.map(({url, keyName, iconName}, idx) => (
          <li key={idx} className='menu__list'>
            <NavLink
              onClick={sidebarVisibilityToggle}
              className='menu__list-link'
              to={{pathname: url, state: location.pathname}}
            >
              {t(`menuAuthCart.${keyName}.name`)}
              <i className={`fas ${iconName} menu__list-icon`}/>
            </NavLink>
          </li>
        ))
      )}
    </ul>
  )
}

export default memo(MenuAuthCart)
