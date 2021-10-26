//@ts-nocheck
import { GET_SINGLE_PRODUCT } from './type'

const initialState = {
  singleProduct: null
}

export const singleProductReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_SINGLE_PRODUCT:
      return { ...state, singleProduct: payload }

    default:
      return state
  }
}
