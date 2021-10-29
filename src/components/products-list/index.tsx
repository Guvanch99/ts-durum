import {FC} from "react";
import { ListView, GridView } from '..'

import {useAppSelector} from "../../hooks/useAppSelector";

import './index.scss'


const ProductsList:FC<{view:boolean}> = ({ view }) => {

  const {filteredProducts} = useAppSelector(state => state.menu)

  const ViewBar = view ? ListView : GridView

  return <ViewBar products={filteredProducts} />
}

export default ProductsList
