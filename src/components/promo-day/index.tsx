import { PureComponent } from 'react'
import {WithTranslation, withTranslation} from 'react-i18next'

import { PageHero } from '..'

import { DATA } from '../../data'

import './index.scss'

class PromoDay extends PureComponent<WithTranslation> {
  render() {
    const { promoImage } = DATA
    const { t } = this.props

    return (
      <>
        <PageHero title={t('pageHero.promotions')} />
        <h1 className='date'>{t('promoDay.date')}</h1>
        <div className='promoDay'>
          <img className='promoDay__image' src={promoImage} alt='promo' />
          <div className='promoDay__info'>
            <h2 className='promoDay__text'>{t('promoDay.label')}</h2>
            <h3 className='promoDay__time'>
              {t('promoDay.time')}{' '}
              <span className='promoDay__time_color'>12.08.2021</span>
            </h3>
            <hr />
            <h1 className='promoDay__description'>
              {t('promoDay.description')} &#128522; &#128522; &#128522;
            </h1>
            <p className='promoDay__obligations'>
              {t('promoDay.obligation')}
              <span className='promoDay__obligations_color'>
                {t('promoDay.obligationRule')}
              </span>
              &#128567;
            </p>
          </div>
        </div>
      </>
    )
  }
}

export default withTranslation()(PromoDay)
