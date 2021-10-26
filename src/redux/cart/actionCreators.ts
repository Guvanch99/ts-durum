//@ts-nocheck

import { DB } from '../../core/axios'

import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_PRODUCT,
  TOGGLE_CART_PRODUCT_AMOUNT,
  GET_PRESENT,
  CLEAR_ORDER,
  PROMO_CODE_USED,
  UPDATE_RESTRICTED_PROMO_CODE,
  UPDATE_GIFT, SUBTRACT_BONUS
} from './type'
import { updateUser } from '../auth/actionCreator'

export const addToCart = payload => ({
  type: ADD_TO_CART,
  payload
})
export const removeProduct = payload => ({
  type: REMOVE_PRODUCT,
  payload
})
export const clearCart = () => ({
  type: CLEAR_CART
})
export const countTotal = () => ({
  type: COUNT_CART_TOTALS
})
export const toggleAmount = payload => ({
  type: TOGGLE_CART_PRODUCT_AMOUNT,
  payload
})

export const subtractBonus = payload => ({
  type: SUBTRACT_BONUS,
  payload
})

export const clearOrder = () => ({ type: CLEAR_ORDER })

export const getPresent = payload => ({
  type: GET_PRESENT,
  payload
})

export const userPromoCodeUsed = payload => ({ type: PROMO_CODE_USED, payload })

export const updateGift = payload => ({ type: UPDATE_GIFT, payload })

export const updateRestrictedPromoCodes = (payload) => ({ type: UPDATE_RESTRICTED_PROMO_CODE, payload })

export const getPresentPromo = (idProduct, promoCode) => async (dispatch, getState) => {
  dispatch(userPromoCodeUsed(promoCode))
  const { data } = await DB(`/all-products?id=${idProduct}`)
  const { auth: { user }, cart: { restrictedPromoCodes: restricted } } = getState()
  const { id, name, src, description, type } = data[0]
  const payload = {
    id,
    name,
    src,
    amount: 1,
    price: 0,
    description,
    type,
    promoCode
  }
  dispatch(getPresent(payload))
  dispatch(countTotal())
  if (user !== null) {
    const { data } = await DB.patch(
      `/users/${user.id}`, { restrictedPromoCodes: restricted })
    dispatch(updateUser(data))
  }
}
export const order = (orderData, newBonus) => async (dispatch, getState) => {
  const { auth: { user } } = getState()
  const { id, bonus } = user
  const bonusModified = Number((bonus + newBonus).toFixed(2))
  await DB.post('/orders', orderData)
  DB.patch(`/users/${id}`, { bonus: bonusModified }).then(({ data }) => dispatch(updateUser(data)))
}

export const usedBonus = bonusCount => (dispatch, getState) => {
  const { auth: { user } } = getState()
  const { id, bonus } = user
  const bonusModified = Number((bonus - bonusCount).toFixed(2))
  dispatch(subtractBonus(bonusCount))
  DB.patch(`/users/${id}`, { bonus: bonusModified }).then(({ data }) => dispatch(updateUser(data)))
}
