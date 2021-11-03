import {DB} from '../../core/axios'

import {GET_SINGLE_PRODUCT} from './type'

import {TAppDispatch} from '../store/store'

import {IProduct} from "../../models/interfaces/";

import {ThunkVoid} from "../../models/types/thunk";


interface IGetSingleProduct {
  type: typeof GET_SINGLE_PRODUCT,
  payload: IProduct[]
}

export interface ISingleProduct {
  0: IProduct[]
}

export const getSingleProduct = (payload: IProduct[]): IGetSingleProduct => ({
  type: GET_SINGLE_PRODUCT,
  payload
})

export const fetchSingleProduct = (id: string): ThunkVoid => (dispatch: TAppDispatch) =>
  DB.get<ISingleProduct>(`/all-products?id=${id}`).then(({data}) => dispatch(getSingleProduct(data[0])))
