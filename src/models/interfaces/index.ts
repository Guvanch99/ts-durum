import {ChangeEvent} from "react";

import {IUserFullInfo} from "./redux/auth";
import {ICart, IGift} from "./redux/cart";

export interface IBar {
  sidebarVisibilityToggle: () => void
  changeLanguageHandler: (e: ChangeEvent<HTMLSelectElement>) => void
}

export interface IAddress {
  street: string
  house: string
  entrance: string
  storey: string
  payment: string
}

export interface IOrders {
  timeOrder: string
  deliveryTime: string
  user: Pick<IUserFullInfo, 'userName' | 'email'>
  cart: ICart[]
  gift: IGift | null
  address: IAddress
  totalItems: number
  totalAmount: number
  id?: number
}

export interface IProduct {
  id: number,
  name: string,
  src: string,
  description: string,
  price: number,
  type: string
}
