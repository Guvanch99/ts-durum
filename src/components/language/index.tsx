//@ts-nocheck
import {FC} from 'react'
import { useTranslation } from 'react-i18next'

import './index.scss'


const Language:FC<{changeLanguageHandler:()=>void}> = ({ changeLanguageHandler }) => {
  const { t } = useTranslation('translation')

  return (
    <div className="language">
      <label htmlFor="language">
        <i className="fas fa-globe language__icon " />
      </label>
      <select
        className="language__select"
        name="language"
        onChange={e => changeLanguageHandler(e)}
      >
        <option className="language__option" value="en">
          {t('lang.en')}
        </option>
        <option className="language__option" value="ru">
          {t('lang.ru')}
        </option>
      </select>
    </div>
  )
}

export default Language

