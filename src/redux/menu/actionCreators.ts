import { GET_ALL_PRODUCTS, ON_CHANGE, FILTER_PRODUCTS } from './type'

import {IProduct} from "../../models/interfaces/";


interface  IOnChangeHandlerProps{
  name:string
  value:string
}

interface IGetAllProducts{
  type:typeof GET_ALL_PRODUCTS
  payload:IProduct[]
}

interface IOnChangeHandler{
  type:typeof ON_CHANGE
  payload:IOnChangeHandlerProps
}

interface IFilterProducts{
  type:typeof FILTER_PRODUCTS
}

export const getAllProducts = (payload:IProduct[]):IGetAllProducts => ({
  type: GET_ALL_PRODUCTS,
  payload
})

export const onChangeHandler = (payload:IOnChangeHandlerProps):IOnChangeHandler => ({
  type: ON_CHANGE,
  payload
})

export const filterProducts = ():IFilterProducts => ({
  type: FILTER_PRODUCTS
})


