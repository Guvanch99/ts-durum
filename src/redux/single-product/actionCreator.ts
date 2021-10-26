//@ts-nocheck
import { DB } from '../../core/axios'

import { GET_SINGLE_PRODUCT } from './type'

import {IProduct} from "../../models/interfaces";

import {TAppDispatch} from "../store/store";

export const getSingleProduct = (payload:IProduct[]) => ({
  type: GET_SINGLE_PRODUCT,
  payload
})
export const fetchSingleProduct = (id:string )=> (dispatch:TAppDispatch) =>
  DB(`/all-products?id=${id}`).then(({ data }) =>
    dispatch(getSingleProduct(data[0]))
  )
