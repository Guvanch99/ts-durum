import {useState, useCallback, useEffect, ChangeEvent, FC} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import classNames from 'classnames'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'

import {Sidebar, Navbar, Footer, PrivateRoute} from '../components'

import {
  Home,
  About,
  SingleProduct,
  Login,
  Register,
  Cart,
  CheckOut,
  Promotions,
  Durum,
  Pizza,
  Location
} from '../pages'

import {countTotal} from '../redux/cart/actionCreators'

import {useAppSelector} from "../hooks/useAppSelector";
import {useTheme} from '../hooks/useTheme'

import {
  ROUTER_HOME,
  ROUTER_ABOUT,
  ROUTER_DURUM,
  ROUTER_PROMOTIONS,
  ROUTER_SINGLE_PRODUCT,
  ROUTER_CART,
  ROUTER_LOGIN,
  ROUTER_SIGN_UP,
  ROUTER_CHECKOUT, ROUTER_PIZZA, ROUTER_LOCATION


} from '../constants/routers.constants'
import {
  DARK_GREEN_COLOR,
  WHITE_COLOR
} from '../constants/themeColors.constants'
import {
  OVERFLOW_HIDDEN,
  OVERFLOW_X_HIDDEN
} from '../constants/variables.constants'

import './index.scss'

const App: FC = () => {
  const dispatch = useDispatch()
  const {themeDark} = useTheme()
  const {i18n} = useTranslation('translation')
  const {cart} = useAppSelector(state => state.cart)

  const [isSidebarVisible, setSidebarVisibility] = useState<boolean>(true)

  const sidebarVisibilityToggle = useCallback(
    () => setSidebarVisibility(prevState => !prevState),
    []
  )

  const changeLanguageHandler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(e.target.value)
    },
    [i18n]
  )

  document.body.style.background = themeDark ? DARK_GREEN_COLOR : WHITE_COLOR
  useEffect(() => {
    if (isSidebarVisible) {
      document.body.style.overflow = 'visible'
      document.body.style.overflowX = OVERFLOW_X_HIDDEN
    } else
      document.body.style.overflow = OVERFLOW_HIDDEN
    window.scrollTo(0, 0)
  }, [isSidebarVisible])

  useEffect(() => {
    dispatch(countTotal())
  }, [cart, dispatch])

  const Bar = isSidebarVisible ? Navbar : Sidebar
  return (
    <section
      className={classNames('container', {
        'is-darkGreen': themeDark,
        'is-sidebar': !isSidebarVisible
      })}
    >
      <Bar
        sidebarVisibilityToggle={sidebarVisibilityToggle}
        changeLanguageHandler={changeLanguageHandler}
      />
      <main className='main'>
        <Switch>
          <Route exact path={ROUTER_HOME} component={Home}/>
          <Route exact path={ROUTER_DURUM} component={Durum}/>
          <Route exact path={ROUTER_PIZZA} component={Pizza}/>
          <Route path={ROUTER_SINGLE_PRODUCT} children={<SingleProduct/>}/>
          <Route exact path={ROUTER_ABOUT} component={About}/>
          <Route exact path={ROUTER_CART} component={Cart}/>
          <Route exact path={ROUTER_PROMOTIONS} component={Promotions}/>
          <Route exact path={ROUTER_LOGIN} component={Login}/>
          <Route exact path={ROUTER_SIGN_UP} component={Register}/>
          <Route exact path={ROUTER_LOCATION} component={Location}/>
          <PrivateRoute exact path={ROUTER_CHECKOUT}>
            <CheckOut/>
          </PrivateRoute>
          <Redirect to={ROUTER_HOME}/>
        </Switch>
      </main>
      <Footer/>
    </section>
  )
}

export default App
