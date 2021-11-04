import {memo} from 'react'
import {useTranslation} from 'react-i18next'

import {DATA} from '../../data'

import style from './index.module.scss'

const {logo, whyWeTranslateKeys} = DATA

const AboutMain = () => {
  const {t} = useTranslation('translation')

  return (
    <section className={style.mainAbout}>
      <img
        loading="lazy"
        className={style.mainAbout__image}
        src={logo}
        alt="chef"
      />
      <article className="main-about__item">
        {whyWeTranslateKeys.map((key) => (
          <h1 key={key} className={style.mainAbout__title}>
            {t(`aboutPage.whyWe.${key}`)}
          </h1>
        ))}
      </article>
    </section>
  )
}

export default memo(AboutMain)
