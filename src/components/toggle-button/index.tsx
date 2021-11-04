import {FC, memo} from 'react'

import {useTheme} from '../../hooks/useTheme'

import './index.scss'

const ToggleButton: FC = () => {
  const {themeDark, changeThemeDark} = useTheme()

  return (
    <section className="toggle">
      <input
        checked={themeDark}
        onChange={changeThemeDark}
        className="toggle__button"
        type="checkbox"
        id="toggle"
      />
      <label className="toggle__background" htmlFor="toggle">
        <span className="toggle__circle"/>
      </label>
    </section>
  )
}

export default memo(ToggleButton)
