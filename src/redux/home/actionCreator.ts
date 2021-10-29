import {DB} from '../../core/axios'

import {GET_BASE_DATA} from './type'

import {IProduct} from "../../models/interfaces/";

import {ThunkVoid} from "../../models/types/thunk";


interface ISetFeaturedProducts {
    type: typeof GET_BASE_DATA
    payload: { data: IProduct[] }
}

export const setFeaturedProducts = (payload: { data: IProduct[] }): ISetFeaturedProducts => ({
    type: GET_BASE_DATA,
    payload
})
export const getFeaturedProducts = ():ThunkVoid=> (dispatch) =>
    DB.get<{ data: IProduct[] }>('/featured-products').then(({data}) => dispatch(setFeaturedProducts(data)))
