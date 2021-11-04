import {FC, memo} from 'react'
import {NavLink} from 'react-router-dom'

import {useTranslation} from 'react-i18next'

import {MenuAuthCart, ToggleButton, Language} from '../'

import {IBar} from "../../models/interfaces";

import {DATA} from '../../data'

import {ROUTER_HOME} from '../../constants/routers.constants'

import './index.scss'

const {logo, sidebarLinks} = DATA

const Sidebar: FC<IBar> = ({sidebarVisibilityToggle, changeLanguageHandler}) => {
  const {t} = useTranslation('translation')

  const sideBarLogo = (
    <NavLink to={ROUTER_HOME}>
      <figure>
        <img loading="lazy" className="logo" src={logo} alt="durum"/>
      </figure>
    </NavLink>
  )

  return (
    <section className="sidebar">
      <ul className="sidebar__menu">
        {sideBarLogo}
        {sidebarLinks.map(({url, keyName}, idx) => (
          <li className="sidebar__menu-list" key={idx}>
            <NavLink
              onClick={sidebarVisibilityToggle}
              className="sidebar__menu-link"
              to={url}
            >
              {t(`links.${keyName}.name`)}
            </NavLink>
          </li>
        ))}
      </ul>
      <MenuAuthCart sidebarVisibilityToggle={sidebarVisibilityToggle}/>
      <Language changeLanguageHandler={changeLanguageHandler}/>
      <ToggleButton/>
      <button onClick={sidebarVisibilityToggle} className="sidebar__times">
        <i className="fas fa-times"/>
      </button>
    </section>
  )
}

export default memo(Sidebar)
