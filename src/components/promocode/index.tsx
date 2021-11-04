import {ChangeEvent, Component, SyntheticEvent} from 'react'
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'

import {PromoCodeGift, Spinner, Quote} from '..'

import {getPresentPromo} from '../../redux/cart/actionCreators'

import {randomId, upperCaseString} from '../../utils'

import {apiCall} from '../../services'

import {TRootState} from "../../redux/store/store";

import {IState, IStateProps} from "../../models/interfaces/promoCode";

import {promoCodeMap} from '../../data'

import {DONALD_THRUMP_API} from '../../constants/api.constants'

import './index.scss'

class PromoCode extends Component<IStateProps, IState> {
  state = {
    promoCode: '',
    error: false,
    isPromoUsed: false,
    randomQuote: '',
    promoCodeCopy: ''
  }

  randomProduct = (beginProduct: number, endProduct: number, promoCode: string) => {
    let idProduct = randomId(beginProduct, endProduct)
    this.props.getFreeMeal(idProduct, promoCode)
    this.setState({promoCode: '', error: false})
  }

  promoCodeSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const {promoCode} = this.state
    this.setState({error: false})
    let promoCodeUppercase = upperCaseString(promoCode)

    if (this.props.restrictedPromoCodes.includes(promoCodeUppercase)) {
      this.setState({
        promoCodeCopy: promoCodeUppercase,
        isPromoUsed: true,
        error: true,
        promoCode: ''
      })
    } else
      promoCodeMap[promoCodeUppercase] ?
        this.randomProduct(promoCodeMap[promoCodeUppercase].productsBegin, promoCodeMap[promoCodeUppercase].productsEnd, promoCodeUppercase) :
        this.setState({error: true, promoCode: ''})

  }

  async componentDidMount() {
    const res = await apiCall(DONALD_THRUMP_API)
    res ? this.setState({randomQuote: res.value}) : this.setState({randomQuote: ''})
  }

  handleChange = ({target}: ChangeEvent<HTMLInputElement>) =>
    this.setState({isPromoUsed: false, promoCode: target.value})

  render() {
    const {
      promoCode,
      error,
      randomQuote,
      isPromoUsed,
      promoCodeCopy
    } = this.state

    const {gift, t} = this.props

    return (
      <>
        {randomQuote ? <Quote randomQuote={randomQuote}/> : <Spinner/>}
        {isPromoUsed ? (
          <h1 className='promo-used'>
            {t('promoCode.usedPromoCode', {promoCode: promoCodeCopy})}
          </h1>
        ) : null}
        <section className='promoCode'>
          <form className='promoCode-form' onSubmit={this.promoCodeSubmit}>
            <label className='promoCode-form__label'>
              {t('promoCode.label')}
            </label>

            <input
              value={promoCode}
              onChange={this.handleChange}
              className='promoCode-form__input'
              type='text'
              placeholder={
                error
                  ? t('promoCode.placeholderError')
                  : t('promoCode.placeholderDefault')
              }
            />

            <button
              disabled={!!gift }
              className='promoCode-form__submit'
            >
              {gift
                ? t('promoCode.buttonDisabled')
                : t('promoCode.buttonSubmit')}
            </button>
          </form>
          {gift  ? <PromoCodeGift present={gift}/> : <Spinner/>}
        </section>
      </>
    )
  }
}

interface IConnectedDispatch {
  getFreeMeal: (id: number, promo: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<TRootState, unknown, AnyAction>): IConnectedDispatch => ({
  getFreeMeal: (id: number, promo: string) => dispatch(getPresentPromo(id, promo))
})

const mapStateToProps = ({cart: {gift, restrictedPromoCodes}, auth: {user}}: TRootState) => ({
  gift,
  restrictedPromoCodes,
  user
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export default withTranslation()(
  connector(PromoCode)
)
