
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

import {
  IAddCart,
  IAddCartProps,
  IClearCart, IClearOrder, ICountTotal, IGetPresent,
  IGift,
  IRemoveProduct, ISubtractBonus, IToggleAmount,
  IToggleAmountProps, IUpdateGift, IUpdateRestrictedPromoCodes, IUserPromoCodeUsed
} from "../../models/interfaces/redux/cart";

import {IProduct} from "../../models/interfaces/";

import {IOrders} from "../../models/interfaces";

import {ThunkPromise, ThunkVoid} from "../../models/types/thunk";
import {IUserFullInfo} from "../../models/interfaces/redux/auth";

export const addToCart = (payload:IAddCartProps):IAddCart => ({
  type: ADD_TO_CART,
  payload
})
export const removeProduct = (payload:number):IRemoveProduct => ({
  type: REMOVE_PRODUCT,
  payload
})
export const clearCart = ():IClearCart => ({
  type: CLEAR_CART
})
export const countTotal = ():ICountTotal => ({
  type: COUNT_CART_TOTALS
})
export const toggleAmount = (payload:IToggleAmountProps):IToggleAmount => ({
  type: TOGGLE_CART_PRODUCT_AMOUNT,
  payload
})

export const subtractBonus = (payload:number):ISubtractBonus => ({
  type: SUBTRACT_BONUS,
  payload
})

export const clearOrder = ():IClearOrder => ({ type: CLEAR_ORDER })

export const getPresent = (payload:IGift):IGetPresent => ({
  type: GET_PRESENT,
  payload
})

export const userPromoCodeUsed = (payload:string):IUserPromoCodeUsed => ({ type: PROMO_CODE_USED, payload })

export const updateGift = (payload:IGift):IUpdateGift => ({ type: UPDATE_GIFT, payload })

export const updateRestrictedPromoCodes = (payload:string[]):IUpdateRestrictedPromoCodes => ({ type: UPDATE_RESTRICTED_PROMO_CODE, payload })

export const getPresentPromo =
    (idProduct:number, promoCode:string):
     ThunkVoid => async (dispatch, getState) => {
  dispatch(userPromoCodeUsed(promoCode))
  const { data } = await DB.get<{0:IProduct}>(`/all-products?id=${idProduct}`)
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
    const { data } = await DB.patch<IUserFullInfo>(
      `/users/${user.id}`, { restrictedPromoCodes: restricted })
    dispatch(updateUser(data))
  }
}
export const order = (orderData:IOrders, newBonus:number):
 ThunkPromise => async (dispatch, getState) => {
  const { auth: { user } } = getState()
  const { id, bonus } = user as IUserFullInfo
  const bonusModified:number = Number((bonus + newBonus).toFixed(2))
  await DB.post('/orders', orderData)
  DB.patch<IUserFullInfo>(`/users/${id}`, { bonus: bonusModified }).then(({ data }) => dispatch(updateUser(data)))
}

export const usedBonus = (bonusCount:number) :
   ThunkPromise=> async(dispatch, getState) => {
  const { auth: { user } } = getState()
  const { id, bonus } = user as IUserFullInfo
  const bonusModified:number = Number((bonus - bonusCount).toFixed(2))
  dispatch(subtractBonus(bonusCount))
  DB.patch<IUserFullInfo>(`/users/${id}`, { bonus: bonusModified }).then(({ data }) => dispatch(updateUser(data)))
}
