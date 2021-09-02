import { GET_ALL_PRODUCTS, ON_CHANGE, FILTER_PRODUCTS } from './type'

import {IProduct} from "../../models/interfaces";


interface  IOnChangeHandler{
  name:string
  value:string
}

export const getAllProducts = (payload:IProduct[]) => ({
  type: GET_ALL_PRODUCTS,
  payload
})

export const onChangeHandler = (payload:IOnChangeHandler) => ({
  type: ON_CHANGE,
  payload
})

export const filterProducts = () => ({
  type: FILTER_PRODUCTS
})


