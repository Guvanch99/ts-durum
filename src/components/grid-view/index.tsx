import {FC, memo} from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {IProduct} from "../../models/interfaces";

import { ROUTER_MENU } from '../../constants/routers.constants'

import './index.scss'


const GridView:FC<{products:IProduct[]}> = ({ products }) => {
  const { t } = useTranslation('translation')

  return (
    <div className="grid">
      {products.map(({ id, name, src, price }) => (
        <div key={id} className="grid__container">
          <img loading="lazy" className="grid__image" src={src} alt={name} />
          <div className="grid__info">
            <h1 className="food__name">{t(name)}</h1>
            <h3 className="food__price">
              {t('productPrice')}
              {price}
              {t('productPriceCurrency')}
            </h3>
          </div>
          <NavLink className="product__buy_link" to={`${ROUTER_MENU}/${id}`}>
            <i className="fas fa-shopping-bag product__buy_icon" />
          </NavLink>
        </div>
      ))}
    </div>
  )
}

export default memo(GridView)
