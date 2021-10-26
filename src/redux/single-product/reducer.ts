import {GET_SINGLE_PRODUCT} from './type'

import {IAction, IProduct} from "../../models/interfaces";

interface IInitialState {
    singleProduct: null | IProduct
}

const initialState: IInitialState = {
    singleProduct: null
}

export const singleProductReducer = (state = initialState, {type, payload}: IAction) => {
    switch (type) {
        case GET_SINGLE_PRODUCT:
            return {...state, singleProduct: payload}

        default:
            return state
    }
}
