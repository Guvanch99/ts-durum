import {WithTranslation} from "react-i18next";
import {IGift} from "../redux/cart";

export interface IState {
  promoCode: string,
  error: boolean,
  isPromoUsed: boolean,
  randomQuote: string,
  promoCodeCopy: string
}

export interface IStateProps extends WithTranslation {
  restrictedPromoCodes: string[]
  getFreeMeal: (idProduct: number, promoCode: string) => void
  gift: IGift | null

}
