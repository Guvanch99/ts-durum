//@ts-nocheck
import { createStore, applyMiddleware } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import rootReducer from '../'

const middleware = [thunk, logger]

export const store = createStore(rootReducer, applyMiddleware(...middleware))

export const persistor = persistStore(store)

export default { store, persistor }

export type TRootState = ReturnType<typeof store.getState>

export type TAppDispatch = typeof store.dispatch

export type TGetState = () => AppDispatch;