import {FC} from "react";
import {useTranslation} from 'react-i18next'

import {
  PageHero,
  Contacts,
  ArticleName,
  Accordion,
  AboutMain
} from '../../components'

import {DATA} from '../../data'

import './index.scss'


const {ourValueTranslateKeys} = DATA
const About: FC = () => {
  const {t} = useTranslation('translation')

  return (
    <section className="about-container">
      <PageHero title={t('pageHero.about')}/>
      <ArticleName name={t('articleNames.ourValue')}/>
      <article className="accordion-container">
        {ourValueTranslateKeys.map(key => (
          <Accordion
            key={key}
            label={t(`aboutPage.ourValue.${key}.label`)}
            description={t(`aboutPage.ourValue.${key}.description`)}
          />
        ))}
      </article>
      <ArticleName name={t('articleNames.whyWe')}/>
      <AboutMain/>
      <Contacts/>
    </section>
  )
}

export default About
