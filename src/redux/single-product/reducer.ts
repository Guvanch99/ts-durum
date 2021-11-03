import {AnyAction} from "redux";

import {GET_SINGLE_PRODUCT} from './type'

import {IProduct} from "../../models/interfaces/";

const initialState = {
  singleProduct: {} as IProduct
}

export type TInitialState = typeof initialState

export const singleProductReducer = (state = initialState, {type, payload}: AnyAction): TInitialState => {
  switch (type) {
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: payload}
    default:
      return state
  }
}
