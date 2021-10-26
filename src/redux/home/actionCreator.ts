//@ts-nocheck
import {DB} from '../../core/axios'

import {GET_FEATURED_PRODUCTS} from './type'

import {IProduct} from "../../models/interfaces";

import {TAppDispatch} from "../store/store";

export const getFeaturedProducts = (payload: IProduct[]) => ({
    type: GET_FEATURED_PRODUCTS,
    payload
})
export const fetchFeaturedProducts = () => (dispatch: TAppDispatch) =>
    DB('/featured-products').then(({data}) => {
            dispatch(getFeaturedProducts(data))
        }
    )
