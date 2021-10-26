//@ts-nocheck
import {DB} from '../../core/axios'
import {GET_FEATURED_PRODUCTS} from './type'

export const getFeaturedProducts = payload => ({
    type: GET_FEATURED_PRODUCTS,
    payload
})
export const fetchFeaturedProducts = () => dispatch =>
    DB('/featured-products').then(({data}) => {
            dispatch(getFeaturedProducts(data))
        }
    )
