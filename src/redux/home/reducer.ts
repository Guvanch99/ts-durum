import {AnyAction} from "redux";

import {GET_BASE_DATA} from './type'

import {IGallery, IProduct} from "../../models/interfaces/";

const initialState = {
  featuredProducts: [] as IProduct[],
  gallery: [] as IGallery[]
}

export type TInitialState = typeof initialState

export const homeReducer = (state = initialState, {type, payload}: AnyAction): TInitialState => {
  switch (type) {
    case GET_BASE_DATA:
      return {...state, featuredProducts: payload[0].featuredProducts, gallery: payload[1].gallery}
    default:
      return state
  }
}
