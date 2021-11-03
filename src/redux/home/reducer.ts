import {AnyAction} from "redux";

import {GET_BASE_DATA} from './type'

import {IProduct} from "../../models/interfaces/";

const initialState = {
  featuredProducts: [] as IProduct[]
}

export type TInitialState = typeof initialState

export const homeReducer = (state = initialState, {type, payload}: AnyAction): TInitialState => {
  switch (type) {
    case GET_BASE_DATA:
      return {...state, featuredProducts: payload}
    default:
      return state
  }
}
