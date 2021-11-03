import {FC, memo} from 'react'
import {useTranslation} from 'react-i18next'

import './index.scss'

const Footer: FC = () => {
  const {t} = useTranslation('translation')

  return (
    <div className="footer">
      <h2 className="footer__text">&copy; {t('footerText')}</h2>
    </div>
  )
}

export default memo(Footer)
