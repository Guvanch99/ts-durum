import {FC, useState} from "react";
import {useTranslation} from "react-i18next";

import {ArticleName, PizzaIngredients, VirtualPizza} from "../../../components";

import pepperoni from '../../../assets/pepperoni.png'
import chicken from '../../../assets/chicken.png'
import lamb from '../../../assets/lamb.png'
import bacon from '../../../assets/pork.png'
import mushroom from '../../../assets/Mushroom.png'
import olives from '../../../assets/Olive.png'
import pickles from '../../../assets/pickles.png'
import cheese from '../../../assets/BaseCheese.png'
import basil from '../../../assets/Basil.png'
import tomato from '../../../assets/Tomato.png'
import onions from '../../../assets/onions.png'

import {TImages, TIngredients, TSize} from "../../../models/types/pizza-ingredients";

import './index.scss'

const Pizza: FC = () => {
  const {t} = useTranslation('translation')

  const [ingredients, setIngredients] = useState<TIngredients>({
      chicken: false,
      bacon: false,
      lamb: false,
      pepperoni: false,
      tomato: false,
      pickles: false,
      mushroom: false,
      cheese: false,
      olives: false,
      onions: false,
      basil: false,
    }
  )

  const [pizzaSize, setPizzaSize] = useState<TSize>({
    small: true,
    medium: false,
    big: false
  })

  const imageArray: TImages = {
    cheese,
    pepperoni,
    chicken,
    lamb,
    bacon,
    mushroom,
    onions,
    olives,
    pickles,
    basil,
    tomato
  }

  return (
    <>
      <ArticleName name={t('pizzaConstructor.pizzaBuilder')}/>
      <div className='pizza'>
        <VirtualPizza ingredients={ingredients} imageArray={imageArray}/>
        <PizzaIngredients
          ingredients={ingredients}
          pizzaSize={pizzaSize}
          setIngredients={setIngredients}
          setPizzaSize={setPizzaSize}
        />
      </div>
    </>
  )
}

export default Pizza
