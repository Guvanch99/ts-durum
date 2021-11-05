import {FC, memo} from 'react'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import dayjs from 'dayjs'

import {ROUTER_HOME} from '../../constants/routers.constants'

import './index.scss'

const Modal: FC<{ modalVisibility?: (arg: boolean) => void }> = ({modalVisibility}) => {
  const history = useHistory()
  const {t} = useTranslation('translation')

  const closeModal = () => {
    modalVisibility && modalVisibility(true)

    history.push(ROUTER_HOME)
  }

  let timeDelivery = dayjs().add(30,'m').format('hh:mm').toString()

  return (
    <section className="modal-wrapper">
      <article className="modal" onClick={closeModal}>
        <h1 className="modal__label">{t('modal')}</h1>
        <i className="far fa-check-circle modal__success-icon"/>
        <h2 className="modal__time">{t('deliveryTime', {timeDelivery})}</h2>
        <h3 className="modal__delivery-text">{t('lateDelivery')}</h3>
        <button onClick={closeModal} className="modal__button">
          {t('close')}
        </button>
      </article>
      <div className="app-overlay"/>
    </section>
  )
}

export default memo(Modal)
