import {FC, memo, SyntheticEvent} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'

import {modalPromoErrorToggle} from '../../redux/auth/actionCreator'

import {ROUTER_CART} from '../../constants/routers.constants'

import './index.scss'

const ModalPromoError: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {t} = useTranslation('translation')

  const closeModal = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(modalPromoErrorToggle())
    history.push(ROUTER_CART)
  }

  return (
    <section className='modalPromo-wrapper'>
      <article className='modalPromo' onClick={closeModal}>
        <h1 className='modalPromo__text'>{t('modalError')}</h1>
        <i className='fas fa-exclamation modalPromo__icon'/>
        <button onClick={closeModal} className='modalPromo__button'>{t('close')}</button>
      </article>
    </section>
  )
}
export default memo(ModalPromoError)
