import {Component} from 'react'
import {WithTranslation, withTranslation} from 'react-i18next'

import {IGift} from "../../models/interfaces/redux/cart";

import './index.scss'


interface IProps extends WithTranslation {
    present: IGift
}

class PromoCodeGift extends Component<IProps> {
    render() {
        const {t, present} = this.props
        const {name, src, description} = present
        return (
            <div className="promoCode-gift">
                <h1 className="promoCode-gift__text">{t('promoCodeGift.label')}</h1>
                <div className="promoCode-gift__container">
                    <img src={src} alt="present" className="promoCode-gift__image"/>
                    <div>
                        <h1 className="promoCode-gift__name"> {t(name)}</h1>
                        <p className="promoCode-gift__description">{t(description)}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(PromoCodeGift)

