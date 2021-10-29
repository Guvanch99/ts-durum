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