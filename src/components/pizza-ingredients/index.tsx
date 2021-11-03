import React, {ChangeEvent, FC, useState, useEffect, SyntheticEvent} from "react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

import {useHistory} from "react-router-dom";

import {addToCart} from "../../redux/cart/actionCreators";

import {TIngredients, TSize} from "../../models/types/pizza-ingredients";

import pizzaImg from '../../assets/pizza.png'

import {ROUTER_CART} from "../../constants/routers.constants";
import './index.scss'

interface IPizzaIngredientsProps {
  ingredients: TIngredients
  pizzaSize: TSize
  setIngredients: React.Dispatch<React.SetStateAction<TIngredients>>
  setPizzaSize: React.Dispatch<React.SetStateAction<any>>
}

const PizzaIngredients: FC<IPizzaIngredientsProps> = ({
                                                        ingredients,
                                                        pizzaSize,
                                                        setIngredients,
                                                        setPizzaSize
                                                      }) => {
  const SMALL_PIZZA = 5
  const MEDIUM_PIZZA = 7.5
  const BIG_PIZZA = 10
  const ONE = 1
  const PRICE_INGREDIENT = 2

  const {t} = useTranslation('translation')
  const [price, setPrice] = useState<number>(SMALL_PIZZA)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    let ingredientsCount = Object.keys(ingredients).filter(key => ingredients[key]).length
    if (pizzaSize.small) {
      setPrice(SMALL_PIZZA + ((ingredientsCount + ONE) * PRICE_INGREDIENT))
    } else if (pizzaSize.medium) {
      setPrice(MEDIUM_PIZZA + ((ingredientsCount + ONE) * PRICE_INGREDIENT))
    } else
      setPrice(BIG_PIZZA + ((ingredientsCount + ONE) * PRICE_INGREDIENT))
  }, [ingredients, pizzaSize])

  const handleChangeIngredients = ({target: {name}}: ChangeEvent<HTMLInputElement>) =>
    setIngredients({...ingredients, [name]: !ingredients[name]})


  const handleChangeSize = ({target: {id}}: ChangeEvent<HTMLInputElement>) => {
    setPizzaSize({
      small: false,
      medium: false,
      big: false,
      [id]: !pizzaSize[id]
    })
  }

  const pizzaToCart = (e: SyntheticEvent) => {
    e.preventDefault()
    const randomNumber = Math.floor(1000 + Math.random() * 9000)
    let pizza = {
      id: randomNumber,
      name: 'pizza' + randomNumber,
      src: pizzaImg,
      description: "It is your delicious Pizza",
      price,
      type: 'pizza'
    }

    let payload = {
      amount: 1,
      singleProduct: pizza

    }
    dispatch(addToCart(payload))
    history.push(ROUTER_CART)
  }
  return (
    <div className='ingredients'>
      <h1 className='pizza-price'>
        {t('productPrice', {price})}
        {t('productPriceCurrency')}</h1>
      <div className='ingredients-menu'>
        <div className='group'>
          {Object.keys(ingredients).map((key) => (
            <div key={key} className='group-input'>
              <input onChange={handleChangeIngredients} type="checkbox" id={key} name={key}/>
              <label className='ingredients__input-label'
                     htmlFor={key}>{t(`ingredientsMenu.${key}`)}</label>
            </div>
          ))}
        </div>
      </div>
      <div className='ingredients-size'>
        <h1 className='ingredients__label'>{t('size.label')}</h1>
        <div className='group'>
          {Object.keys(pizzaSize).map((key,) => (
            <div key={key} className='group-input'>
              <input onChange={handleChangeSize} defaultChecked={key === 'small'}
                     className='ingredients__size-radio' type='radio' value={key} name='sizes' id={key}/>
              <label className='ingredients__input-label' htmlFor={key}>{t(`size.${key}`)}</label>
            </div>
          ))}
        </div>
      </div>
      <button onClick={pizzaToCart} className='pizza-button'>{t('pageLink.addBasket')}</button>
    </div>
  )
}

export default PizzaIngredients
