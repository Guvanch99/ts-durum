import React, {FC, useState} from "react";
import {useTranslation} from "react-i18next";

import {TIngredients} from "../../models/types/pizza-ingredients";

import './index.scss'


const PizzaIngredients: FC = () => {
    const { t } = useTranslation('translation')

    const [ingredients, setIngredientsMeat] = useState<TIngredients>({
        meat: {
            chicken: false,
            bacon: false,
            lamb : false,
            pepperoni: false
        },
        vegetables: {
            tomato: false,
            pickles: false,
            mushroom: false,
            cheese: false,
            olives: false,
            onions: false
        },
        sausage: {
            bbq: false,
            ketchup: true,
            special: false
        },
        size: {
            small: true,
            medium: false,
            big: false
        }
    });

    return (
        <div className='ingredients'>
            <div className='ingredients-meat'>
                <h1 className='ingredients__label'>{t('ingredients.meat')}</h1>
                {Object.keys(ingredients.meat).map((key) => (
                        <button className='ingredients__button' value={key}>{key}</button>
                ))}

            </div>
            <div className='ingredients-vegetables'>
                <h1 className='ingredients__label'>{t('ingredients.vegetables')}</h1>
                {Object.keys(ingredients.vegetables).map((key) => (
                        <button  className='ingredients__button' value={key}>{key}</button>
                ))}

            </div>
            <div className='ingredients-sausage'>
                <h1 className='ingredients__label'>{t('ingredients.sausage')}</h1>
                {Object.keys(ingredients.sausage).map((key) => (
                        <button  className='ingredients__button' value={key}>{key}</button>
                ))}

            </div>
            <div className='ingredients-size'>
                <h1 className='ingredients__label'>{t('ingredients.size')}</h1>
                {Object.keys(ingredients.size).map((key) => (
                        <button className='ingredients__button' value={key}>{key}</button>
                ))}

            </div>
        </div>
    )
}

export default PizzaIngredients