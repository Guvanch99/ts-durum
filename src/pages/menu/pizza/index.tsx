import {FC} from "react";
import {ArticleName, PizzaIngredients, VirtualPizza} from "../../../components";

import './index.scss'

const Pizza: FC = () => {
    return (
        <>
            <ArticleName name='Pizza Builder'/>
            <div className='pizza'>
                <PizzaIngredients/>
                <VirtualPizza/>
            </div>
        </>
    )
}

export default Pizza