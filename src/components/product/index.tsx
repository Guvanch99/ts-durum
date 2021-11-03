import {FC, memo} from 'react'
import { useTranslation } from 'react-i18next'

import { AddToCart } from '..'

import {IProduct} from "../../models/interfaces";

import './index.scss'

const Product:FC<{singleProduct:IProduct}> = ({ singleProduct }) => {
  const { t } = useTranslation('translation')
  const { src, name, description, price } = singleProduct

  return (
    <div className='product-container'>
      <div className='product'>
        <img className='product__image' src={src} alt={name} />
        <div className='product__info'>
          <h1 className='product__name'>{t(name)}</h1>
          <h3 className='product__price'>
            {t('productPrice')}
            {price}
            {t('productPriceCurrency')}
          </h3>
          <p className='product__description'>
            {t('productDescription')}
            {t(description)}
          </p>
        </div>
      </div>
      <AddToCart singleProduct={singleProduct} />
    </div>
  )
}

export default memo(Product)
