type TMeat = "chicken" | "bacon" | "lamb" | "pepperoni"

type TVegetables = "tomato" | "pickles" | "mushroom" | "cheese" | "olives" | "onions"

type TSausage = "bbq" | "ketchup" | "special"

type TSize = "small" | "medium" | "big"

export type TIngredients = {
    meat: Record<TMeat, boolean>
    vegetables: Record<TVegetables, boolean>
    sausage: Record<TSausage, boolean>
    size: Record<TSize, boolean>
}