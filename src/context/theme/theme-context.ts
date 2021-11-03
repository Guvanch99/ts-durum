import {createContext} from 'react'

interface ICreateContext {
  themeDark: boolean
  changeThemeDark: () => void
}

const ThemeContext = createContext({} as ICreateContext)
export default ThemeContext
