//@ts-nocheck
import { GET_ALL_PRODUCTS, ON_CHANGE, FILTER_PRODUCTS } from './type'


export const getAllProducts = payload => ({
  type: GET_ALL_PRODUCTS,
  payload
})

export const onChangeHandler = payload => ({
  type: ON_CHANGE,
  payload
})

export const filterProducts = () => ({
  type: FILTER_PRODUCTS
})


