import { cartReducer } from './reducer'
import {
  clearOrder,
  countTotal,
  userPromoCodeUsed,
  clearCart,
  getPresent,
  addToCart,
  removeProduct,
  toggleAmount,
  getPresentPromo
} from './actionCreators'

const state = {
  cart: [
    {
      id: 1,
      name: 'Durum',
      src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
      price: 10,
      description: 'description about product',
      amount: 1,
      subTotal: 10,
      type: 'durum'
    },
    {
      id: 2,
      name: 'Durum',
      src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
      price: 10,
      description: 'description about product',
      amount: 2,
      subTotal: 20,
      type: 'durum'
    },
    {
      id: 3,
      name: 'Durum',
      src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
      price: 10,
      description: 'description about product',
      amount: 3,
      subTotal: 30,
      type: 'durum'
    }
  ],
  gift: {
    id: 1,
    name: 'Durum',
    src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
    amount: 1,
    price: 0,
    description: 'description description',
    type: 'Durum'
  },
  promoCodeUsed: false,
  totalAmount: 0,
  totalItems: 0
}

let reducer = action => cartReducer(state, action)

describe('cart reducer tree', () => {
  it('clear all products', () => {
    let { cart, gift } = reducer(clearOrder())
    expect.assertions(5)
    expect(cart).toEqual([])
    expect(cart).not.toBeNull()
    expect(cart).not.toBeUndefined()
    expect(gift).toBeNull()
    expect(gift).not.toBeUndefined()
  })
  it('clear just cart', () => {
    let { cart } = reducer(clearCart())
    expect.assertions(3)
    expect(cart).toEqual([])
    expect(cart).not.toBeNull()
    expect(cart).not.toBeUndefined()
  })
  it('user promoCode used', () => {
    let newState = reducer(userPromoCodeUsed())
    expect.assertions(1)
    expect(newState.promoCodeUsed).toBeTruthy()
  })
  it('get present for user', () => {
    let state = {
      cart: [],
      gift: null,
      promoCodeUsed: false,
      totalAmount: 0,
      totalItems: 0
    }

    let giftForUser = {
      id: 1,
      name: 'Durum',
      src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
      amount: 1,
      price: 0,
      description: 'description description',
      type: 'Durum'
    }

    let { gift } = cartReducer(state, getPresent(giftForUser))
    expect.assertions(4)
    expect(gift && typeof gift === 'object').toBeTruthy()
    expect(gift).not.toBeNull()
    expect(gift).not.toBeUndefined()
    expect(gift).toHaveProperty(
      'id',
      'name',
      'src',
      'amount',
      'price',
      'description',
      'type'
    )
  })
  it('count  price and item count', () => {
    let { totalAmount, totalItems } = reducer(countTotal())
    expect(typeof totalAmount).toBe('number')
    expect(totalAmount).toBeGreaterThanOrEqual(0)
    expect(totalAmount).not.toBeNull()
    expect(totalAmount).not.toBeUndefined()
    expect(typeof totalItems).toBe('number')
    expect(totalItems).toBeGreaterThanOrEqual(0)
    expect(totalItems).not.toBeNull()
    expect(totalItems).not.toBeUndefined()
  })
  it('remove product from menu', () => {
    let { cart } = reducer(removeProduct(2))
    expect(cart).not.toBeUndefined()
    expect(cart).not.toBeNull()
    expect(Array.isArray(cart)).toBeTruthy()
    expect(cart.length).toBe(2)
  })
  it('toggle amount to increase', () => {
    expect.assertions(4)
    const { cart } = reducer(toggleAmount({ id: 1, inc: 'inc' }))
    expect(cart && typeof cart === 'object').toBeTruthy()
    expect(cart).not.toBeNull()
    expect(cart).not.toBeUndefined()
    expect(cart.length).toBeGreaterThanOrEqual(1)
  })
  it('toggle amount to decrease', () => {
    expect.assertions(4)
    const { cart } = reducer(toggleAmount({ id: 2, dec: 'dec' }))
    expect(cart && typeof cart === 'object').toBeTruthy()
    expect(cart).not.toBeNull()
    expect(cart).not.toBeUndefined()
    expect(cart.length).toBeGreaterThanOrEqual(1)
  })
  it('adding product to cart', () => {
    let singleProduct = {
      id: 3,
      name: 'Durum',
      src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
      price: 10
    }
    let payload = {
      amount: 3,
      singleProduct
    }
    let { cart } = reducer(addToCart(payload))
    expect.assertions(4)
    expect(cart && typeof cart === 'object').toBeTruthy()
    expect(cart).not.toBeNull()
    expect(cart).not.toBeUndefined()
    expect(cart.length).toBeGreaterThanOrEqual(1)
  })
  it('get random gift from server', async () => {
    const thunk = getPresentPromo(3)
    const dispatchMock = jest.fn()
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(3)
  })
})
