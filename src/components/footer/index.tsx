import {FC, memo} from 'react'
import {useTranslation} from 'react-i18next'

import './index.scss'

const Footer: FC = () => {
  const {t} = useTranslation('translation')

  return (
    <footer className="footer">
      <h2 className="footer__text">&copy; {t('footerText')}</h2>
    </footer>
  )
}

export default memo(Footer)
