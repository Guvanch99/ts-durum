import { homeReducer } from './reducer'
import { getFeaturedProducts, fetchFeaturedProducts } from './actionCreator'

describe('home reducer tree', () => {
  it('get featured products', () => {
    let featuredProductsData = [
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

    let actions = getFeaturedProducts(featuredProductsData)
    const state = {
      featuredProducts: []
    }
    let { featuredProducts } = homeReducer(state, actions)
    expect.assertions(7)
    expect(featuredProducts).toHaveLength(3)
    expect(featuredProducts).not.toBe([])
    expect(featuredProducts).not.toBeNull()
    expect(featuredProducts).not.toBeUndefined()
    featuredProducts.forEach(product =>
      expect(product).toHaveProperty(
        'id',
        'name',
        'src',
        'price',
        'description'
      )
    )
  })
  it('getting featured products from server', async () => {
    const thunk = fetchFeaturedProducts()
    const dispatchMock = jest.fn()
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(1)
  })
})
