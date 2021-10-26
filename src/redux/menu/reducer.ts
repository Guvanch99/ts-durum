//@ts-nocheck
import { GET_ALL_PRODUCTS, ON_CHANGE, FILTER_PRODUCTS } from './type'
const initialState = {
  allProducts: [],
  filteredProducts: [],
  sort: '',
  sortCategory: 'All',
}

export const menuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: [...state.allProducts,...payload], filteredProducts: [...state.filteredProducts,...payload] }

    case ON_CHANGE:
      const { name, value } = payload
      return { ...state, [name]: value }

    case FILTER_PRODUCTS:
      const { sort, sortCategory, allProducts } = state
      let temp = [...allProducts]
      if (sort === 'price-lowest') {
        temp = temp.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        temp = temp.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a') {
        temp = temp.sort((a, b) => a.name.localeCompare(b.name))
      }
      if (sort === 'name-z') {
        temp = temp.sort((a, b) => b.name.localeCompare(a.name))
      }
      if (sortCategory === 'Durum') {
        temp = temp.filter(t => t.type === 'durum')
      }
      if (sortCategory === 'Beverage') {
        temp = temp.filter(t => t.type === 'beverage')
      }
      if (sortCategory === 'Combo') {
        temp = temp.filter(t => t.type === 'combo')
      }
      return { ...state, filteredProducts: temp }

    default:
      return state
  }
}
