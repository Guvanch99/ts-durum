//@ts-nocheck
import { createStore, applyMiddleware } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import rootReducer from '../'

const middleware = [thunk, logger]

export const store = createStore(rootReducer, applyMiddleware(...middleware))

export const persistor = persistStore(store)
/* eslint-disable */
export default { store, persistor }
