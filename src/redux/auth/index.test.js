import { authReducer } from './reducer'
import {
  signUp,
  login,
  isUserExist,
  logOut,
  userNotFound,
  createUser,
  loginUser
} from './actionCreator'

const state = {
  user: null,
  userExist: false,
  userNotFound: false
}

let reducer = action => authReducer(state, action)

describe('auth reducer tree', () => {
  it('user sign-up', () => {
    let newUser = {
      userName: 'Guvanch',
      email: 'awediyewguwanc@gmail.com',
      password: 'Guvanch99'
    }
    let { user, userExist } = reducer(signUp(newUser))
    expect.assertions(6)
    expect(user && typeof user === 'object').toBeTruthy()
    expect(user).not.toEqual(null)
    expect(user).not.toBeUndefined()
    expect(userExist).toBeFalsy()
    expect(user).toHaveProperty('userName', 'email', 'password')
  })
  it('user login', () => {
    let newUser = {
      userName: 'Guvanch',
      password: 'Guvanch99'
    }
    let { user, userNotFound } = reducer(login(newUser))
    expect.assertions(5)
    expect(user && typeof user === 'object').toBeTruthy()
    expect(user).not.toEqual(null)
    expect(user).not.toBeUndefined()
    expect(userNotFound).toBeFalsy()
    expect(user).toHaveProperty('userName', 'email', 'password')
  })
  it('if user registered before', () => {
    let { userExist } = reducer(isUserExist())
    expect.assertions(1)
    expect(userExist).toBeTruthy()
  })
  it('if user never registered', () => {
    let newState = reducer(userNotFound())
    expect.assertions(1)
    expect(newState.userNotFound).toBeTruthy()
  })
  it('user log out', () => {
    const state = {
      user: {
        userName: 'Guvanch',
        email: 'awediyewguwanc@gmail.com',
        password: 'Guvanch99'
      },
      userExist: false,
      userNotFound: false
    }

    let { user } = authReducer(state, logOut())
    expect.assertions(2)
    expect(user).toBeNull()
    expect(user).not.toBeUndefined()
  })
  it('create user', async () => {
    let user = {
      userName: 'Guwanc9999999',
      email: 'awed@gmail.com',
      password: 'Guvanch99'
    }
    const thunk = createUser(user)
    const dispatchMock = jest.fn()
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalled()
  })
  it('login user', async () => {
    let user = {
      userName: 'Guwanc9999999',
      password: 'Guvanch99'
    }
    const thunk = loginUser(user)
    const dispatchMock = jest.fn()
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalled()
  })
})
