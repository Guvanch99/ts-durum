import {FC, memo} from 'react'
import {useTranslation} from 'react-i18next'

import {PageLink} from '..'

import {IProduct} from "../../models/interfaces";

import {ROUTER_DURUM} from '../../constants/routers.constants'

import './index.scss'

const ListView: FC<{ products: IProduct[] }> = ({products}) => {
  const {t} = useTranslation('translation')

  return (
    <div className="list">
      {products.map(({id, name, src, description, price}) => (
        <div key={id} className="list__container">
          <img loading="lazy" className="list__image" src={src} alt={name}/>
          <div className="list__info">
            <h1 className="food__name">{t(name)}</h1>
            <h3 className="food__price">
              {t('productPrice')}
              {price}
              {t('productPriceCurrency')}
            </h3>
            <p className="food__description">{t(description)}</p>
            <PageLink
              name={t('pageLink.cart')}
              direction={`${ROUTER_DURUM}/${id}`}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(ListView)
