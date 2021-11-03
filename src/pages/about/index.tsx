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
    <div className="about-container">
      <PageHero title={t('pageHero.about')}/>
      <ArticleName name={t('articleNames.ourValue')}/>
      <div className="accordion-container">
        {ourValueTranslateKeys.map(key => (
          <Accordion
            key={key}
            label={t(`aboutPage.ourValue.${key}.label`)}
            description={t(`aboutPage.ourValue.${key}.description`)}
          />
        ))}
      </div>
      <ArticleName name={t('articleNames.whyWe')}/>
      <AboutMain/>
      <Contacts/>
    </div>
  )
}

export default About
