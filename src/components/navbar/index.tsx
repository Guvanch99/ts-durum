import {FC, memo, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {MenuAuthCart, ToggleButton, Language} from '../index'

import {DATA} from '../../data'

import {IBar} from "../../models/interfaces";

import {ROUTER_HOME} from '../../constants/routers.constants'

import './index.scss'

const {logo, links, linksDropDown} = DATA

const Navbar: FC<IBar> = ({sidebarVisibilityToggle, changeLanguageHandler}) => {
  const {t} = useTranslation('translation')
  const [isDropDown, setIsDropDown] = useState<boolean>(false)

  let navLogo = (
    <NavLink className="logo" to={ROUTER_HOME}>
      <figure>
        <img className="navbar__logo" src={logo} alt="durum"/>
      </figure>
    </NavLink>
  )

  let ONE = 1

  return (
    <nav className="navbar">
      <section className="navbar__container">
        {navLogo}
        <ul className="navbar__menu">
          {links.map(({url, keyName}, idx) => (
            <article className='dropdown-group' key={keyName}>
              <li>
                {
                  idx === ONE ? (
                    <article className='dropdown'>
                      <button onClick={() => setIsDropDown(!isDropDown)}
                              className='dropdown__activator'>
                        <span className='dropdown__activator-container'>
                          {t(`links.menu.name`)}
                          <i className={` dropdown__icon fas fa-chevron-${isDropDown ? 'up' : 'down'}`}/>
                        </span>

                      </button>
                      {isDropDown ? <ul className='dropdown__menu'>
                        {
                          linksDropDown.map(({url, keyName}, idx) => (
                            <li key={idx} className='dropdown__menu_list'>
                              <NavLink onClick={() => setIsDropDown(!isDropDown)}
                                       className='dropdown__menu_link'
                                       to={url}>{t(`links.${keyName}.name`)}
                              </NavLink>
                            </li>
                          ))
                        }
                      </ul> : null}
                    </article>
                  ) : null
                }
              </li>
              <li className="navbar__menu_list" key={idx}>
                <NavLink className="navbar__menu_link" to={url}>
                  {t(`links.${keyName}.name`)}
                </NavLink>
              </li>
            </article>
          ))}
        </ul>
      </section>
      <MenuAuthCart/>
      <Language changeLanguageHandler={changeLanguageHandler}/>
      <ToggleButton/>
      <button onClick={sidebarVisibilityToggle} className="navbar__hamburger">
        <i className="fas fa-bars"/>
      </button>
    </nav>
  )
}

export default memo(Navbar)
