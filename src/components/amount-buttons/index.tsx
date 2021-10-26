import {FC, memo} from 'react'

import './index.scss'

interface IAmountButtons {
    amount: number
    increase: () => void
    decrease: () => void
    styleTable?: boolean
}

const AmountButtons: FC<IAmountButtons> = ({amount, increase, decrease, styleTable = false}) => (
    <div className={styleTable ? 'amount-for-table' : 'amount'}>
        <button
            className={styleTable ? 'amount-for-table__sign' : 'amount__sign'}
            onClick={decrease}
        >
            -
        </button>
        <h2
            className={styleTable ? 'amount-for-table__counter' : 'amount__counter'}
        >
            {amount}
        </h2>
        <button
            className={styleTable ? 'amount-for-table__sign' : 'amount__sign'}
            onClick={increase}
        >
            +
        </button>
    </div>
)

export default memo(AmountButtons)
