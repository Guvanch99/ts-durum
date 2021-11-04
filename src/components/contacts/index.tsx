import {FC, memo} from 'react'
import {useTranslation} from 'react-i18next'

import InformationList from './internal/information-list'

import {ArticleName} from '..'

import {DATA} from '../../data'

import './index.scss'

const {contactsKey} = DATA

const Contacts: FC = () => {
  const {t} = useTranslation('translation')

  return (
    <>
      <ArticleName name={t('articleNames.contacts')}/>
      <section className="contacts">
        {contactsKey.map((keyNames, index) => (
          <article key={index} className="contacts__card">
            <InformationList info={keyNames}/>
          </article>
        ))}
      </section>
    </>
  )
}

export default memo(Contacts)
