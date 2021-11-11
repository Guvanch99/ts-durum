import {doc, updateDoc, getDoc, addDoc, collection} from "firebase/firestore";

import {DB} from '../../core/axios'

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

import {updateUser} from '../auth/actionCreator'

import {
  IAddCart,
  IAddCartProps,
  IClearCart, IClearOrder, ICountTotal, IGetPresent,
  IGift,
  IRemoveProduct, ISubtractBonus, IToggleAmount,
  IToggleAmountProps, IUpdateGift, IUpdateRestrictedPromoCodes, IUserPromoCodeUsed
} from "../../models/interfaces/redux/cart";


import {IOrders} from "../../models/interfaces";

import {ThunkPromise, ThunkVoid} from "../../models/types/thunk";

import {IUserFullInfo} from "../../models/interfaces/redux/auth";

import {db} from "../../core/firebase-config";

export const addToCart = (payload: IAddCartProps): IAddCart => ({type: ADD_TO_CART, payload})

export const removeProduct = (payload: number): IRemoveProduct => ({type: REMOVE_PRODUCT, payload})

export const clearCart = (): IClearCart => ({type: CLEAR_CART})

export const countTotal = (): ICountTotal => ({type: COUNT_CART_TOTALS})

export const toggleAmount = (payload: IToggleAmountProps): IToggleAmount => ({
  type: TOGGLE_CART_PRODUCT_AMOUNT,
  payload
})

export const subtractBonus = (payload: number): ISubtractBonus => ({type: SUBTRACT_BONUS, payload})

export const clearOrder = (): IClearOrder => ({type: CLEAR_ORDER})

export const getPresent = (payload: IGift): IGetPresent => ({type: GET_PRESENT, payload})

export const userPromoCodeUsed = (payload: string): IUserPromoCodeUsed => ({type: PROMO_CODE_USED, payload})

export const updateGift = (payload: IGift): IUpdateGift => ({type: UPDATE_GIFT, payload})

export const updateRestrictedPromoCodes = (payload: string[]): IUpdateRestrictedPromoCodes => ({
  type: UPDATE_RESTRICTED_PROMO_CODE,
  payload
})

export const getPresentPromo =
  (idProduct: number, promoCode: string):
    ThunkVoid => async (dispatch, getState) => {
    dispatch(userPromoCodeUsed(promoCode))
    const {auth: {user}, cart: {restrictedPromoCodes: restricted}} = getState()

    const docRef = doc(db, "products", "all-products");
    const docSnap = await getDoc(docRef);
    const {allProducts}: any = docSnap.data()

    const gift = allProducts?.filter((prod: { id: number }) => prod.id === idProduct)

    const {id, name, src, description, type} = gift[0]
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
    if (user) {
      const docRef = doc(db, 'users', user.id)
      await updateDoc(docRef, {
        restrictedPromoCodes: restricted
      });
      dispatch(updateUser({...user, restrictedPromoCodes: restricted}))
    }
  }
export const order = (orderData: IOrders, newBonus: number):
  ThunkPromise => async (dispatch, getState) => {
  const {auth: {user}} = getState()
  const {id, bonus} = user as IUserFullInfo
  const bonusModified = +(bonus + newBonus).toFixed(2)
  await addDoc(collection(db, "orders"), orderData);
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    bonus: bonusModified
  });
  dispatch(updateUser({...user, bonus: bonusModified}))

}

export const usedBonus = (bonusCount: number):
  ThunkPromise => async (dispatch, getState) => {
  const {auth: {user}} = getState()
  const {id, bonus} = user as IUserFullInfo
  const bonusModified = +(bonus - bonusCount).toFixed(2)
  dispatch(subtractBonus(bonusCount))
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    bonus: bonusModified
  });

  dispatch(updateUser({...user, bonus: bonusModified}))

}
