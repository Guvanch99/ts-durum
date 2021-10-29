
import React, {ChangeEvent, FC, SyntheticEvent, useState} from 'react'
import {useDispatch,} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {useHistory, useLocation} from 'react-router-dom'

import {DynamicInputs} from '../'

import {
    createUser,
    twoFactorAuthError,
    twoFactorAuthToggle
} from '../../redux/auth/actionCreator'

import {IUserFullInfo} from "../../models/interfaces/redux/auth";

import {useAppSelector} from "../../hooks/useAppSelector";

import {modifiedEmail} from '../../utils'

import {DELETE} from '../../constants/variables.constants'

import './index.scss'


interface ITwoFactorAuth {
    userCredentials: Pick<IUserFullInfo, 'id' | 'userName' | 'email' | 'password'>
}

const TwoFactorAuth: FC<ITwoFactorAuth> = ({userCredentials}) => {
    const {t} = useTranslation('translation')
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation<{ state: string }>()
    const [values, setValues] = useState<string[]>(Array(6).fill(''))
    const {generatedPassword, twoFactorAuthInvalid} = useAppSelector(
        state => state.auth
    )
    let inputRefElement = [] as HTMLInputElement[]
    console.log("TwoFactor", location.state)
    const handleChange = ({target: {name, value, maxLength}}: ChangeEvent<HTMLInputElement>, idx: number) => {
        const isInteger: boolean = Number.isSafeInteger(Number.parseInt(value))

        if (isInteger && value.length === 1) {
            if (value.length === 1) {
                if (idx < 5) {
                    inputRefElement && inputRefElement[idx + 1].focus()
                }
            }
            let newArr = [...values]
            newArr[Number(name)] = value
            setValues(newArr)
        } else if (value.length > 1 && isInteger) {
            setValues(values.map((n, i) => value[i]))
        }
    }

    const handleDelete = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        const {key} = e
        const {name} = e.target as HTMLInputElement;
        if (key === DELETE) {
            let newArr = [...values]
            newArr[Number(name)] = ''
            setValues(newArr)
            if (idx > 0) inputRefElement && inputRefElement[idx - 1].focus()
        }
    }

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        const parseIntValue: number = Number.parseInt(values.join(''))
        if (generatedPassword === parseIntValue) {
            const updatedUser = {
                ...userCredentials,
                password: window.btoa(userCredentials.password)
            }
            dispatch(twoFactorAuthToggle())
            dispatch(createUser(updatedUser, location, history))
        } else {
            dispatch(twoFactorAuthError())
        }
    }

    const isArrayEmpty = values.indexOf('') === -1
    const hiddenEmail = modifiedEmail(userCredentials.email)

    return (
        <div className="twoFactorAuth">
            {twoFactorAuthInvalid ? (
                <h1 className="twoFactorAuth__error">{t('twoFactorAuth.error')}</h1>
            ) : null}
            <h1 className="twoFactorAuth__label">{t('twoFactorAuth.label')}</h1>
            <i className="fas fa-lock twoFactorAuth__icon"/>
            <h3 className="twoFactorAuth__text-info">
                {t('twoFactorAuth.textInfo')}
            </h3>
            <h2 className="twoFactorAuth__phone">{hiddenEmail}</h2>
            <form className="twoFactorAuth__form" onSubmit={onSubmit}>
                <div className="twoFactorAuth__inputs">
                    <DynamicInputs
                        handleChange={(e, idx) => handleChange(e, idx)}
                        handleDelete={(e, idx) => handleDelete(e, idx)}
                        inputRefs={inputRefElement}
                        values={values}
                    />
                </div>
                <button disabled={!isArrayEmpty} className="twoFactorAuth__send-button">
                    {t('twoFactorAuth.send')}
                </button>
            </form>
            <h3 className="twoFactorAuth__question">{t('twoFactorAuth.question')}</h3>
            <button className="twoFactorAuth__resend-button">
                {t('twoFactorAuth.resend')}
            </button>
        </div>
    )
}

export default TwoFactorAuth
