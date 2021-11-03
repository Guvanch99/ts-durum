import {FC, memo} from 'react'
import {NavLink} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {ROUTER_DURUM, ROUTER_HOME} from '../../constants/routers.constants'

import './index.scss'

const PageHero: FC<{ title: string, menu?: boolean }> = ({title, menu = false}) => {
  const {t} = useTranslation('translation')

  return (
    <section className="section">
      <h1 className="section__text">
        <NavLink className="section__link" to={ROUTER_HOME}>
          {t('pageHero.home')}
        </NavLink>
        {menu ? (
          <>
            <span className="section__sign">&gt;</span>
            <NavLink className="section__middle-page" to={ROUTER_DURUM}>
              {t('pageHero.durum')}
            </NavLink>
          </>
        ) : null}
        <span className="section__sign">&gt;</span> {title}
      </h1>
    </section>
  )
}

export default memo(PageHero)

