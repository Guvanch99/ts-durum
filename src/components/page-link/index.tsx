import { FC,memo } from 'react'
import { NavLink } from 'react-router-dom'

import './index.scss'

interface IPageLink{
  direction:string
  name:string
  eventHandler?:()=>void
}

const PageLink:FC<IPageLink> = ({ direction, name, eventHandler }) => (
  <NavLink
    onClick={eventHandler ? eventHandler : undefined}
    className="page-link"
    to={direction}
  >
    {name}
  </NavLink>
)

export default memo(PageLink)

