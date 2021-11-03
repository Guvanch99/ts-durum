import {useState, useEffect, FC} from 'react'

import ThemeContext from './theme-context'

const ThemeState: FC = ({children}) => {
  const [themeDark, setThemeDark] = useState<boolean>(false)
  const changeThemeDark = () => setThemeDark(!themeDark)

  useEffect(() => {
    if (localStorage.getItem('theme'))
      setThemeDark(true)
    else {
      setThemeDark(false)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(themeDark))
  }, [themeDark])

  return (
    <ThemeContext.Provider value={{themeDark, changeThemeDark}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeState
