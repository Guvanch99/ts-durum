import {IProduct} from "../../";
import {
  ADD_TO_CART,
  CLEAR_CART, CLEAR_ORDER,
  COUNT_CART_TOTALS, GET_PRESENT, PROMO_CODE_USED,
  REMOVE_PRODUCT, SUBTRACT_BONUS,
  TOGGLE_CART_PRODUCT_AMOUNT, UPDATE_GIFT, UPDATE_RESTRICTED_PROMO_CODE
} from "../../../../redux/cart/type";

export interface IToggleAmountProps {
  inc?: string
  dec?: string
  id: number
}


export interface IGift extends IProduct {
  promoCode: string
  amount: number
}

export interface ICart extends IProduct {
  subTotal: number
  amount: number
}


export interface IAddCartProps {
  amount: number
  singleProduct: IProduct
}

export interface IAddCart {
  type: typeof ADD_TO_CART
  payload: IAddCartProps
}

export interface IRemoveProduct {
  type: typeof REMOVE_PRODUCT
  payload: number
}

export interface IClearCart {
  type: typeof CLEAR_CART
}

export interface ICountTotal {
  type: typeof COUNT_CART_TOTALS
}

export interface IToggleAmount {
  type: typeof TOGGLE_CART_PRODUCT_AMOUNT
  payload: IToggleAmountProps
}

export interface IClearOrder {
  type: typeof CLEAR_ORDER
}

export interface ISubtractBonus {
  type: typeof SUBTRACT_BONUS
  payload: number
}

export interface IGetPresent {
  type: typeof GET_PRESENT
  payload: IGift
}

export interface IUserPromoCodeUsed {
  type: typeof PROMO_CODE_USED
  payload: string
}

export interface IUpdateGift {
  type: typeof UPDATE_GIFT
  payload: IGift
}

export interface IUpdateRestrictedPromoCodes {
  type: typeof UPDATE_RESTRICTED_PROMO_CODE
  payload: string[]
}

export interface IInitialState {
  cart: ICart[]
  gift: IGift | null
  totalAmount: number
  totalItems: number
  restrictedPromoCodes: string[]
}
