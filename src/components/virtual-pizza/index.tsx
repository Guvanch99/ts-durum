import {FC, memo} from "react";
import classNames from "classnames";

import {TImages, TIngredients} from "../../models/types/pizza-ingredients";

import BasePizza from '../../assets/PizzaBase.png'

import './index.scss'

interface VirtualPizzaProps {
    imageArray:TImages
    ingredients: TIngredients
}

const VirtualPizza: FC<VirtualPizzaProps> = ({imageArray, ingredients}) => {

    return <div className='images'>
        <img className='image-pizza' src={BasePizza}/>
        {
            Object.keys(imageArray).map((key, idx) => (
                <img className={classNames('image', {
                    'pepperoni': idx === 1,
                    'visible': ingredients[key]
                })} src={imageArray[key]} key={idx}/>
            ))
        }
    </div>
}

export default memo(VirtualPizza)