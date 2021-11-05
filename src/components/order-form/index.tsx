import {ChangeEvent, FC, SyntheticEvent, useState} from 'react'
import {useDispatch} from 'react-redux'
import dayjs from "dayjs";

import {Modal, Progressbar, UserAddress, UserInfo, UserPayment} from '../'

import {clearOrder, order} from '../../redux/cart/actionCreators'

import {useAppSelector} from "../../hooks/useAppSelector";

import {IUserInfo} from "../../models/interfaces/orders";

import {IOrders} from "../../models/interfaces";

import {BONUS_COEFFICIENT} from '../../constants/variables.constants'

import {
  INTEGER_VALIDATION,
  PHONE_VALIDATION,
  INTEGER_AND_ZERO_VALIDATION
} from '../../constants/regexes.constants'

import './index.scss'


const OrderForm: FC = () => {
  const {
    auth: {user},
    cart: {cart, gift, totalAmount, totalItems}
  } = useAppSelector(state => state)

  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    userName: user ? user.userName : '',
    email: user ? user.email : '',
    phone: '',
    street: '',
    house: '',
    entrance: '',
    storey: '',
    payment: 'cash'
  })
  const [errors, setErrors] = useState<Omit<IUserInfo, 'payment'>>({
    userName: '',
    email: '',
    phone: '',
    street: '',
    house: '',
    entrance: '',
    storey: ''
  })

  const [step, setStep] = useState<number>(1)

  const {userName, email, phone, street, house, entrance, storey, payment} = userInfo

  const THREE = 3

  const phoneValidation = () => {
    !PHONE_VALIDATION.test(phone) &&
    setErrors({...errors, phone: 'orderForm.orderErrors.phone'})
  }

  const streetValidation = () => {
    street.length < THREE &&
    setErrors({...errors, street: 'orderForm.orderErrors.street'})
  }

  const houseValidation = () => {
    !INTEGER_AND_ZERO_VALIDATION.test(house) &&
    setErrors({...errors, house: 'orderForm.orderErrors.house'})
  }

  const entranceValidation = () => {
    !INTEGER_VALIDATION.test(entrance) &&
    setErrors({...errors, entrance: 'orderForm.orderErrors.entrance'})
  }

  const storeyValidation = () => {
    !INTEGER_AND_ZERO_VALIDATION.test(storey) &&
    setErrors({...errors, storey: 'orderForm.orderErrors.storey'})
  }

  const prevStep = () => setStep(step - 1)

  const nextStep = () => setStep(step + 1)

  const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
    setErrors({...errors, [name]: ''})
    setUserInfo({...userInfo, [name]: value})
  }

  const handlePayment = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => setUserInfo({
    ...userInfo,
    [name]: value
  })

  const orderMenu = async (e: SyntheticEvent) => {
    e.preventDefault()

    let updatedUser = {
      userName,
      email
    }

    let address = {
      street,
      house,
      entrance,
      storey,
      payment
    }
    const newBonus = Number((totalAmount * BONUS_COEFFICIENT).toFixed(2))

    const userBought: IOrders = {
      timeOrder: dayjs().format('YYYY MM DD hh:mm:ss'),
      deliveryTime: dayjs().add(30, 'm').format('YYYY MM DD hh:mm:ss'),
      user: updatedUser,
      cart,
      gift,
      address,
      totalItems,
      totalAmount
    }

    await dispatch(order(userBought, newBonus))
    dispatch(clearOrder())
    nextStep()
  }

  const userInfoComponent = <UserInfo nextStep={nextStep}
                                      handleChange={handleChange}
                                      phoneValidation={phoneValidation}
                                      values={userInfo}
                                      errors={errors}/>

  const userAddressComponent = <UserAddress nextStep={nextStep}
                                            prevStep={prevStep}
                                            handleChange={handleChange}
                                            streetValidation={streetValidation}
                                            houseValidation={houseValidation}
                                            entranceValidation={entranceValidation}
                                            storeyValidation={storeyValidation}
                                            values={userInfo}
                                            errors={errors}/>

  const userPayment = <UserPayment prevStep={prevStep}
                                   handlePayment={handlePayment}
                                   orderMenu={orderMenu}/>

  const STEPPER_MAP: Record<number, JSX.Element> = {
    1: userInfoComponent,
    2: userAddressComponent,
    3: userPayment,
    4: <Modal/>
  }

  return (
    <section className='order-form'>
      <Progressbar stepCount={THREE} activeStep={step}/>
      {STEPPER_MAP[step]}
    </section>
  )

}

export default OrderForm
