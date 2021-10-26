
import {GET_FEATURED_PRODUCTS} from './type'

import {IAction, IProduct} from "../../models/interfaces";

interface IHomeInitialState{
    featuredProducts:IProduct[]
}

const initialState: IHomeInitialState = {
    featuredProducts: []
}

export const homeReducer = (state = initialState, {type, payload}:IAction) => {
    switch (type) {
        case GET_FEATURED_PRODUCTS:
            return {...state, featuredProducts: payload}
        default:
            return state
    }
}
