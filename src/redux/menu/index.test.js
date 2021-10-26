import { menuReducer } from './reducer'
import {
  getAllProducts,
  filterProducts,
  fetchAllProducts
} from './actionCreators'

describe('cart working tree', () => {
  it('get all products', () => {
    const state = {
      allProducts: [],
      filteredProducts: [],
      sort: 'Durum'
    }
    let allProductsData = [
      {
        id: 1,
        name: 'Durum',
        src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
        price: 10,
        description: 'description about product'
      },
      {
        id: 2,
        name: 'Durum',
        src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
        price: 10,
        description: 'description about product'
      },
      {
        id: 3,
        name: 'Durum',
        src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
        price: 10,
        description: 'description about product'
      }
    ]

    let { allProducts, filteredProducts } = menuReducer(
      state,
      getAllProducts(allProductsData)
    )
    expect(allProducts).not.toEqual([])
    expect(allProducts).not.toBeNull()
    expect(allProducts).not.toBeUndefined()
    expect(allProducts.length).toBeGreaterThanOrEqual(3)
    allProducts.forEach(product => {
      expect(product && typeof product === 'object').toBe(true)
      expect(product).toHaveProperty(
        'id',
        'name',
        'src',
        'price',
        'description'
      )
    })
    expect(filteredProducts).not.toEqual([])
    expect(filteredProducts).not.toBeNull()
    expect(filteredProducts).not.toBeUndefined()
    expect(filteredProducts.length).toBeGreaterThanOrEqual(3)
    filteredProducts.forEach(product => {
      expect(product && typeof product === 'object').toBeTruthy()
      expect(product).toHaveProperty(
        'id',
        'name',
        'src',
        'price',
        'description'
      )
    })
  })
  it('filtered products', () => {
    const state = {
      allProducts: [
        {
          id: 1,
          name: 'Durum',
          src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
          price: 10,
          description: 'description about product'
        },
        {
          id: 2,
          name: 'Durum',
          src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
          price: 10,
          description: 'description about product'
        },
        {
          id: 3,
          name: 'combo',
          src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
          price: 10,
          description: 'description about product'
        },
        {
          id: 4,
          name: 'Durum',
          src: 'https://i.ibb.co/vhs7GF2/kombo-cow.jpg',
          price: 10,
          description: 'description about product'
        }
      ],
      filteredProducts: [],
      sort: 'Durum'
    }
    let { filteredProducts } = menuReducer(state, filterProducts())
    expect(filteredProducts).not.toEqual([])
    expect(filteredProducts).not.toBeNull()
    expect(filteredProducts).not.toBeUndefined()
    expect(filteredProducts.length).toBeLessThanOrEqual(17)
    filteredProducts.forEach(product => {
      expect(product && typeof product === 'object').toBeTruthy()
      expect(product).toHaveProperty(
        'id',
        'name',
        'src',
        'price',
        'description'
      )
    })
  })
  it('getting all products from server', async () => {
    const thunk = fetchAllProducts()
    const dispatchMock = jest.fn()
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(1)
  })
})
