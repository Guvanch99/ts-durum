import {FC, memo} from 'react'
import {useTranslation} from 'react-i18next'

import {ArticleName} from '..'

import './index.scss'

const Quote: FC<{ randomQuote: string }> = ({randomQuote}) => {
  const {t} = useTranslation('translation')

  return (
    <section className="quote">
      <ArticleName name={t('articleNames.randomQuote')}/>
      <h2 className="quote__value">{randomQuote}</h2>
    </section>
  )
}

export default memo(Quote)
