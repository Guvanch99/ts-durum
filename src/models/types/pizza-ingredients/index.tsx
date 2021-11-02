export type TIngredients={
    chicken:boolean
    bacon:boolean
    lamb:boolean
    pepperoni:boolean
    tomato:boolean
    pickles:boolean
    mushroom:boolean
    cheese:boolean
    olives:boolean
    onions:boolean
    basil:boolean
    [key: string]: boolean
}

export type TImages={
    chicken:string
    bacon:string
    lamb:string
    pepperoni:string
    tomato:string
    pickles:string
    mushroom:string
    cheese:string
    olives:string
    onions:string
    basil:string
    [key: string]: string
}


export type TSize={
    small:boolean|string
    medium:boolean|string
    big:boolean|string
    [key: string]: boolean|string;

}