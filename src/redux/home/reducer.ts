//@ts-nocheck
import { GET_FEATURED_PRODUCTS } from './type'

const initialState = {
  featuredProducts: []
}

export const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FEATURED_PRODUCTS:
      return { ...state, featuredProducts: payload }

    default:
      return state
  }
}
