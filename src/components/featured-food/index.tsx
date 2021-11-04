import {FC, memo} from 'react'
import {useTranslation} from 'react-i18next'

import ArticleName from '../article-name'

import {useAppSelector} from "../../hooks/useAppSelector";

import {DATA} from '../../data'

import './index.scss'

const {mostLovedFoodImage} = DATA

const FeaturedFood: FC = () => {
  const {t} = useTranslation('translation')
  const {featuredProducts} = useAppSelector(state => state.home)

  return (
    <>
      <ArticleName name={t('articleNames.loved')}/>
      <section className="featured-product">
        <img
          className="featured-product__main-image"
          src={mostLovedFoodImage}
          alt="doner"
        />
        <ul className="featured-product__menu">
          {featuredProducts.map(({id, name, src, description, price}) => (
            <li className="featured-product__list" key={id}>
              <img className="featured-product__image" src={src} alt={name}/>
              <hgroup className="featured-product__container">
                <h1 className="featured-product__name">{t(name)}</h1>
                <p className="featured-product__description">
                  {t(description).slice(0, 50)}
                </p>
                <p className="featured-product__price">
                  {t('productPrice', {price})}
                  {t('productPriceCurrency')}
                </p>
              </hgroup>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default memo(FeaturedFood)
