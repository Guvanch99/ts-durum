import {FC} from "react";
import {useTranslation} from 'react-i18next'

import {useAppSelector} from "../../hooks/useAppSelector";

import {CartItems} from '..'

import {DATA} from '../../data'

import './index.scss'

const {tableNameTranslateKeys} = DATA

const CartTable:FC = () => {
    const {t} = useTranslation('translation')
    const {cart} = useAppSelector(state => state.cart)


    let tableHeadRows = tableNameTranslateKeys.map(key => (
        <th key={key}>
            <h4 style={{margin: '0 0.4rem'}}>{t(`cartTable.${key}`)}</h4>
        </th>
    ))
    let table = cart.map(item => <CartItems key={item.id} {...item} />)

    return (
        <>
            <table className='table'>
                <thead className='table__header'>
                <tr>{tableHeadRows}</tr>
                </thead>
                <tbody>{table}</tbody>
            </table>
        </>
    )
}

export default CartTable
