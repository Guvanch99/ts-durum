import {Component} from 'react'
import {WithTranslation, withTranslation} from 'react-i18next'

import {IGift} from "../../models/interfaces/redux/cart";

import './index.scss'

interface IPromoCodeGiftProps extends WithTranslation {
  present: IGift
}

class PromoCodeGift extends Component<IPromoCodeGiftProps> {
  render() {
    const {t, present} = this.props
    const {name, src, description} = present

    return (
      <section className="promoCode-gift">
        <h1 className="promoCode-gift__text">{t('promoCodeGift.label')}</h1>
        <article className="promoCode-gift__container">
          <img src={src} alt="present" className="promoCode-gift__image"/>
          <aside className='promoCode-gift__info'>
            <h1 className="promoCode-gift__name"> {t(name)}</h1>
            <p className="promoCode-gift__description">{t(description)}</p>
          </aside>
        </article>
      </section>
    )
  }
}

export default withTranslation()(PromoCodeGift)

