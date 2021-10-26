//@ts-nocheck
import { DB } from '../../core/axios'
import { GET_SINGLE_PRODUCT } from './type'

export const getSingleProduct = payload => ({
  type: GET_SINGLE_PRODUCT,
  payload
})
export const fetchSingleProduct = id => dispatch =>
  DB(`/all-products?id=${id}`).then(({ data }) =>
    dispatch(getSingleProduct(data[0]))
  )
