import {FC, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'

import {AmountButtons} from '..'

import {ICart} from "../../models/interfaces/redux/cart";

import {removeProduct, toggleAmount} from '../../redux/cart/actionCreators'

import './index.scss'

const CartItems: FC<ICart> = ({id, src, name, amount, price, subTotal}) => {
  const {t} = useTranslation('translation')

  const dispatch = useDispatch()

  const removeProductHandler = (id: number) => dispatch(removeProduct(id))

  const increase = useCallback(
    () => dispatch(toggleAmount({id, inc: 'inc'})),
    [dispatch, id]
  )

  const decrease = useCallback(
    () => dispatch(toggleAmount({id, dec: 'dec'})),
    [dispatch, id]
  )

  const tableItems = [
    {
      children: <img className='items-data__image ' alt={name} src={src}/>
    },
    {
      children: <p className='items-data__name '>{t(name)}</p>
    },
    {
      children: (
        <AmountButtons
          styleTable={true}
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
      )
    },

    {
      children: <h3 className='items-data__price '>{price}</h3>
    },
    {
      children: <h3 className='items-data__subtotal '>{subTotal}</h3>
    },
    {
      children: (
        <button
          className='items-data__remover '
          onClick={() => removeProductHandler(id)}
        >
          <i className='fas fa-times'/>
        </button>
      )
    }
  ]

  return (
    <tr key={name} className='items-data'>
      {tableItems.map(({children}, index) => (
        <td key={index}>{children}</td>
      ))}
    </tr>
  )
}

export default CartItems
