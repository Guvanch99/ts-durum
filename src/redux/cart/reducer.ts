import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_PRODUCT,
  TOGGLE_CART_PRODUCT_AMOUNT,
  GET_PRESENT,
  CLEAR_ORDER,
  PROMO_CODE_USED,
  UPDATE_RESTRICTED_PROMO_CODE, UPDATE_GIFT,
  SUBTRACT_BONUS
} from './type'

import { SHIPPING_FEE } from '../../constants/variables'

const initialState = {
  cart: [],
  gift: [],
  totalAmount: 0,
  totalItems: 0,
  restrictedPromoCodes: []
}

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const {
        amount,
        singleProduct: { id, price, name, src }
      } = payload

      const temp = state.cart.find(i => i.id === id)
      if (temp) {
        let temp = state.cart.map(product => {
          if (product.id === id) {
            const newAmount = amount + product.amount
            let subTotal = Math.floor(newAmount * price)
            return { ...product, amount: newAmount, subTotal }
          } else {
            return product
          }
        })

        return { ...state, cart: temp }
      } else {
        const newProduct = {
          id,
          name,
          price,
          amount,
          src,
          type: payload.singleProduct.type,
          subTotal: Math.floor(amount * price)
        }

        return { ...state, cart: [...state.cart, newProduct] }
      }

    case CLEAR_CART:
      return { ...state, cart: [] }

    case REMOVE_PRODUCT:
      const filteredProduct = state.cart.filter(
        product => product.id !== payload
      )
      return { ...state, cart: filteredProduct }

    case COUNT_CART_TOTALS:
      let { totalAmount, totalItem } = state.cart.reduce(
        (total, cart) => {
          const { amount, price } = cart
          total.totalItem += amount
          total.totalAmount += price * amount
          return total
        },
        {
          totalItem: 0,
          totalAmount: 0
        }
      )
      let totalItems = state.gift.length + totalItem
      let totalAll = Number((totalAmount + SHIPPING_FEE).toFixed(2))
      return { ...state, totalAmount: totalAll, totalItems }

    case TOGGLE_CART_PRODUCT_AMOUNT:
      const { inc, dec } = payload
      const tempCart = state.cart.map(item => {
        if (item.id === payload.id) {
          if (inc) {
            let newAmount = item.amount + 1

            let newSubTotal = item.price * newAmount

            return { ...item, amount: newAmount, subTotal: newSubTotal }
          }
          if (dec) {
            let newAmount = item.amount - 1

            if (newAmount < 1) {
              newAmount = 1
            }
            let newSubTotal = item.price * newAmount
            return { ...item, amount: newAmount, subTotal: newSubTotal }
          }
        }
        return item
      })
      return { ...state, cart: tempCart }
    case GET_PRESENT:
      return { ...state, gift: [...state.gift, payload] }
    case CLEAR_ORDER:
      return { ...state, cart: [], gift: [] }
    case PROMO_CODE_USED:
      console.log('payload', payload)
      let updatedRestrictedPromoCodes = [...state.restrictedPromoCodes, payload]
      return { ...state, restrictedPromoCodes: updatedRestrictedPromoCodes }
    case UPDATE_RESTRICTED_PROMO_CODE:
      return { ...state, restrictedPromoCodes: payload }
    case UPDATE_GIFT:
      return { ...state, gift: payload }
    case SUBTRACT_BONUS:
      return { ...state, totalAmount: state.totalAmount - payload }
    default:
      return state
  }
}
