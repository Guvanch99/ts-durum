import {FC, memo} from 'react'
import {useTranslation} from 'react-i18next'

import {ArticleName} from '..'

import {DATA} from '../../data'

import './index.scss'

const {mottoImage} = DATA

const Motto: FC = () => {
  const {t} = useTranslation('translation')

  return (
    <>
      <ArticleName name={t('articleNames.motto')}/>
      <section className='motto'>
        <img className='motto__image' src={mottoImage} alt='Motto'/>
        <hgroup className='motto__text'>
          <h2 className='motto__text-main'>{t('motto.mottoMain')} </h2>
          <h1 className='motto__text-secondary'>{t('motto.mottoSecondary')}</h1>
        </hgroup>
      </section>
    </>
  )
}

export default memo(Motto)
