import { FC,memo } from 'react'
import { useTranslation } from 'react-i18next'

import { ArticleName } from '..'

import { DATA } from '../../data'

import './index.scss'

const { mottoImage } = DATA

const Motto:FC = () => {
  const { t } = useTranslation('translation')

  return (
    <>
      <ArticleName name={t('articleNames.motto')} />
      <div className='motto'>
        <img className='motto__image' src={mottoImage} alt='Motto' />
        <div className='motto__text'>
          <h2 className='motto__text-main'>{t('motto.mottoMain')} </h2>
          <h1 className='motto__text-secondary'>{t('motto.mottoSecondary')}</h1>
        </div>
      </div>
    </>
  )
}

export default memo(Motto)
