import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { homeReducer } from './home/reducer'
import { menuReducer } from './menu/reducer'
import { singleProductReducer } from './single-product/reducer'
import { cartReducer } from './cart/reducer'
import { authReducer } from './auth/reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart']
}

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  menu: menuReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer
})

export default persistReducer(persistConfig, rootReducer)
