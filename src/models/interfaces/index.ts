import {ChangeEvent} from "react";

interface ILinks {
    url: string
    keyName: string
}

interface IMenuAuthCart {
    url: string
    keyName: string
    iconName: string
}

interface ISortOptions {
    value: string
    keyName: string
}

interface IImages {
    url: string
    text: string
}

export interface IContactsKey {
    icon: string
    text: string
}

interface IPromoCode {
    promoCode: string,
    productsBegin: number,
    productsEnd: number
}

export interface IData {
    links: ILinks[]
    menuAuthCart: IMenuAuthCart[]
    sortOptions: ISortOptions[]
    images: IImages[]
    contactsKey: IContactsKey[][]
    promoCodeCase: IPromoCode[]
    buttonTranslateKeys: string[]
    tableNameTranslateKeys: string[]
    whyWeTranslateKeys: string[]
    ourValueTranslateKeys: string[]
    mottoImage: string
    logo: string
    mostLovedFoodImage: string
    promoImage: string
}

export interface IBar {
    sidebarVisibilityToggle: () => void
    changeLanguageHandler: (e: ChangeEvent<HTMLSelectElement>) => void
}

export interface IProduct {
    id: number,
    name: string,
    src: string,
    description: string,
    price: number,
    type: string
}

export interface IAction {
    type: string
    payload: IProduct[]
}

export interface IGift extends IProduct {
    promoCode: string
    amount: number
}

export interface ICart extends IProduct{
    subTotal:number
    amount:number
}
